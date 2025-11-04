import { fastify } from 'fastify'
import { TasksRoutes } from './routes'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const app = fastify()

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API PUC',
      description: 'Documentando API para projeto final API e WebServices',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://localhost:3333',
        description: 'Servidor de Desenvolvimento'
      },
    ]
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(TasksRoutes)
