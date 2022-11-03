import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
  log: ['query'],
})

async function  bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  // prod origin: 'https://github.com/example' 
  await fastify.register(cors, {
    origin: true,
  })
  
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

    return { count }
  })

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()

    return { count }
  })

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()

    return { count }
  })

  fastify.post('/pools', async (request, replay) => {
    const createPoolBody = z.object({
      title: z.string(),
    })

    try {
      const { title } = createPoolBody.parse(request.body)
      const generate = new ShortUniqueId({ length: 6 })
      const code = String(generate()).toUpperCase()

      await prisma.pool.create({
        data: {
          title,
          code,
        }
      })
    
      return replay.status(201).send({ code })
    } catch (err) {      
      return replay.status(400).send({ message: 'Não foi possível criar o bolão, verifique se o nome do bolão está correto!' })
    }     
  })

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()