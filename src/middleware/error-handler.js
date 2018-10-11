// @flow

import { Context } from 'koa'
import { logger } from '../utils/logger'

export const errorHandler = async (
  ctx: Context,
  next: KoaNextFunction
): void => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || 500
    ctx.body = err.toJSON ? err.toJSON() : { message: err.message, ...err }
    logger.error(`Error:  ${ctx.status}  ${err.message}`)
  }
}
