// @flow

import { createController } from 'awilix-koa'
import { Context } from 'koa'
import UserService from '../services/user.service'

const userController = (userService: UserService): Constructor => ({
  getUser: async (ctx: Context): Promise => {
    const {
      request: {
        body: { userId }
      }
    } = ctx

    const user = await userService.getUser(userId)

    if (!user) {
      ctx.throw(404, 'Data not found')
    }

    user.password = undefined

    ctx.body = user
  },

  updateUser: async (ctx: Context): Promise => {
    const {
      request: {
        body: { userData, userId }
      }
    } = ctx

    if (!userData) {
      ctx.throw(403, 'Data not provided')
    }

    await userService.updateUser(userId, userData)
  },

  deleteUser: async (ctx: Context): Promise => {
    const {
      request: {
        body: { userId }
      }
    } = ctx

    await userService.deleteUser(userId)
  }
})

export default createController(userController)
  .prefix('/api/user')
  .get('', 'getUser')
  .put('', 'updateUser')
  .delete('', 'deleteUser')
