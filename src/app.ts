import { fastify } from 'fastify'
import { TasksRoutes } from './routes'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const app = fastify()

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API PUC',
      version: '1.0.0',
    },
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(TasksRoutes)
