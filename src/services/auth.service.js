// @flow

import bcrypt from 'bcrypt-nodejs'
import { Connection } from 'typeorm'
import jwt from 'jsonwebtoken'
import { SECRET, ACCESS_TOKEN_EXPIRES } from '../constants'
import User from '../entities/user.entity'

export default class AuthService {
  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection
  }

  async login(email: string, password: string): string {
    const user: User = await this.getUserByEmail(email)

    if (!user) {
      return null
    }

    if (!this.comparePassword(password, user)) {
      return null
    }

    return this.issueToken(user)
  }

  async signup(email: string, password: string): string {
    const user = User.create({ email, password })
    await this.dbConnection.manager.getRepository(User).insert(user)
    return this.issueToken(user)
  }

  async getUserByEmail(email: string): User {
    return this.dbConnection.manager.getRepository(User).findOne({ email })
  }

  comparePassword(plainPass: string, user: User): boolean {
    return new Promise((resolve: Resolve, reject: Reject) => {
      bcrypt.compare(
        plainPass,
        user.password,
        (err: Error, isPasswordMatch: boolean): boolean =>
          err == null ? resolve(isPasswordMatch) : reject(err)
      )
    })
  }

  issueToken(user: User): string {
    return jwt.sign({ id: user.id }, SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES
    })
  }
}
