// @flow

import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { SECRET } from '../constants'

export const jwtCheck = async (ctx: Context): void => {
  const token = ctx.headers['x-token']

  if (!token) {
    ctx.status = 403
    ctx.body = {
      success: false,
      error: 'No token provided.'
    }
    return
  }

  jwt.verify(token, SECRET, (err: Error, decoded: DecodedData) => {
    if (err) {
      ctx.status = 403
      ctx.body = {
        success: false,
        error: 'Failed to authenticate token.'
      }
      return
    }
    ctx.body.userId = decoded.id
  })
}
