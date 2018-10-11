// @flow

import { Context } from 'koa'
import { logger } from '../utils/logger'

export const requestLogger = async (
  ctx: Context,
  next: KoaNextFunction
): void => {
  logger.info(`<--  ${ctx.method}  ${ctx.path}`)
  await next()
  logger.info(`-->  ${ctx.status}  ${ctx.path}   message: ${ctx.message}`)
}
