// @flow

import {
  createContainer,
  Lifetime,
  InjectionMode,
  asValue,
  Container
} from 'awilix'
import { Connection } from 'typeorm'
import { logger } from '../utils/logger'

const modulesToLoad = ['services/*.ts', Lifetime.SCOPED]

export const configureContainer = (dbConnection: Connection): Container => {
  const opts = {
    injectionMode: InjectionMode.CLASSIC
  }
  return createContainer(opts)
    .loadModules(modulesToLoad, {
      cwd: `${__dirname}/..`,
      formatName: 'camelCase'
    })
    .register({
      logger: asValue(logger),
      dbConnection: asValue(dbConnection)
    })
}
