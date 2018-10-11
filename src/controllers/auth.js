// @flow

import { createController } from 'awilix-koa'
import { Context } from 'koa'
import AuthService from '../services/auth.service'

const authController = (authService: AuthService): Constructor => ({
  login: async (ctx: Context): Promise => {
    const {
      request: {
        body: { email, password }
      }
    } = ctx

    const token = await authService.login(email, password)

    if (!token) {
      ctx.throw(403, 'Invalid credentials')
    }

    ctx.body = token
  },

  signup: async (ctx: Context): Constructor => {
    const {
      request: {
        body: { email, password }
      }
    } = ctx

    const user = await authService.getUserByEmail(email)

    if (user) {
      ctx.throw(403, 'User already exists')
    }

    ctx.body = await authService.signup(email, password)
  }
})

export default createController(authController)
  .prefix('/api')
  .post('/login', 'login')
  .post('/signup', 'signup')
