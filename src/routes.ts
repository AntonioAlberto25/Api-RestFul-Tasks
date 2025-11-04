import { CreateTask} from './controllers/create-tasks'
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
        description: 'Endpoint responsável por adicionar uma nota tarefa',
        body: {
          type: 'object',
          properties: {
            title: { 
              type: 'string', 
              description: 'O título principal da tarefa',
              example: 'Estudar Fastify' 
            },
            description: { 
              type: 'string', 
              description: 'Detalhes opcionais da tarefa',
              example: 'Verificar a documentação do Swagger'
            }
          },
        },
        required: ['title'],
        response: {
          201:{
            description: 'Tarefa criada com sucesso',
            type: 'object',
            properties: {
            id: { type: 'string', example: 'a1b2c3d4' },
            title: { type: 'string', example: 'Estudar Fastify' },
            description: { type: 'string', example: 'Ler a documentação do Swagger e criar exemplos práticos' },
          }
          }
        }
      },
    },
    CreateTask,
  )

  app.get(
    '/tasks',
    {
      schema: {
        summary: 'Listar todas as tarefas',
        tags: ['Tasks'],
        description: 'Busca e retorna todas as tarefas cadastradas',
        response: {
          200:{
            description: 'Lista de tarefas',
            type: 'array',
            items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'a1b2c3d4' },
            title: { type: 'string', example: 'Estudar Fastify' },
            description: { type: 'string', example: 'Ler a documentação do Swagger e criar exemplos práticos' },
            }
          }
          }
        }
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
      summary: 'Importa tarefas via arquivo CSV',
      description: 'Faz o upload de um arquivo .csv para criação de tarefas em lote.',
      tags: ['CSV'],
      },
    },
    ImportCsvTasks,
  )
}
