import { prisma } from '../../lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function CreateTask(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkBodyUsers = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = checkBodyUsers.parse(request.body)

  await prisma.tasks.create({
    data: {
      title,
      description,
    },
  })

  return reply.status(201).send()
}
