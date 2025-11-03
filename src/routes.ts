import { CreateUsers } from './controllers/create-tasks'
import { FastifyInstance } from 'fastify'
import { GetTasks } from './controllers/show-tasks'
import { ShowOneTask } from './controllers/show-one-task'
import { DeleteTask } from './controllers/delete-task'
import { UpdateTask } from './controllers/update-task'
import { CompletedTask } from './controllers/completed-task'
import { ImportCsvTasks } from '../middlewares/import-csv'

export async function TasksRoutes(app: FastifyInstance) {
  app.post(
    '/tasks',
    {
      schema: {
        tags: ['Tasks'],
        description: 'Criando uma tarefa',
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
          },
        },
        response: 201,
      },
    },
    CreateUsers,
  )

  app.get(
    '/tasks',
    {
      schema: {
        tags: ['Tasks'],
        description: 'Buscando tarefas',
        response: 200,
      },
    },
    GetTasks,
  )

  app.get(
    '/tasks/:id',
    {
      schema: {
        tags: ['Tasks'],
        description: 'Buscando uma tarefa',
        response: 200,
      },
    },
    ShowOneTask,
  )

  app.delete(
    '/tasks/:id',
    {
      schema: {
        tags: ['Tasks'],
        description: 'Deletando uma tarefa',
        response: 204,
      },
    },
    DeleteTask,
  )

  app.put(
    '/tasks/:id',
    {
      schema: {
        tags: ['Tasks'],
        description: 'Alterando uma tarefa',
        response: 204,
      },
    },
    UpdateTask,
  )

  app.patch(
    '/tasks/:id/completed',
    {
      schema: {
        tags: ['Tasks'],
        description: 'Completando uma tarefa',
        response: 204,
      },
    },
    CompletedTask,
  )

  app.post(
    '/tasks/csv',
    {
      schema: {
        tags: ['CSV'],
        description: 'Criando tarefas apartir de um arquivo CSV',
        response: 201,
      },
    },
    ImportCsvTasks,
  )
}
