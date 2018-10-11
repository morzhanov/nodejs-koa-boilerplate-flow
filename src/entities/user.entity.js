// @flow

import bcrypt from 'bcrypt-nodejs'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm'

@Entity()
class User {
  static create({
    email,
    password
  }: {
    email: string,
    password: string
  }): User {
    const user = new User()
    user.email = email
    user.password = password
    return user
  }

  @PrimaryGeneratedColumn()
  id

  @Column('text')
  email

  @Column({ type: 'text', readonly: true })
  password

  @BeforeInsert()
  @BeforeUpdate()
  async hashPwd(): void {
    this.password = await this.cryptPassword(this.password)
  }

  async cryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }
}

export default User
