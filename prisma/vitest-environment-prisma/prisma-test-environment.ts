import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { URL } from 'node:url'
import { execSync } from 'node:child_process'

import type { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }
  const url = new URL(process.env.DATABASE_URL)

  // modifica o schema=public para schema={value trago pelo paramentro schema}
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  // nome do ambiente(Environment) que será usado no arquivo de config do vite
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')
    return {
      // função que é executada após o final de cada switch de teste e2e
      // ele será responsável por deleter os schemas gerados para os testes e2e
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
