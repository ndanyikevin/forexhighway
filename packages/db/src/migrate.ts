
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { db } from './client.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const migrationsDir = path.join(__dirname, '../migrations')

async function createMigrationsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations(
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL UNIQUE,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
)
    `)
}

async function getMigrationFiles() {
  const files = await fs.readdir(migrationsDir)

  return files
    .filter((file) => file.endsWith('.sql'))
    .sort()
}

async function hasMigrationRun(filename: string) {
    const result = await db.query(
        `
      SELECT 1
      FROM schema_migrations
      WHERE filename = $1
      LIMIT 1
    `,
        [filename],
    )

    return result.rows.length > 0
}

async function applyMigration(filename: string) {
  const migrationPath = path.join(migrationsDir, filename)
  const migrationSql = await fs.readFile(migrationPath, 'utf8')

  console.log(`Applying ${ filename } `)

  await db.query('BEGIN')

  try {
    await db.query(migrationSql)

    await db.query(
      `
        INSERT INTO schema_migrations(filename)
VALUES($1)
      `,
      [filename],
    )

    await db.query('COMMIT')

    console.log(`Applied ${ filename } `)
  } catch (error) {
    await db.query('ROLLBACK')
    throw error
  }
}

async function migrate() {
  console.log('Starting database migration...')

  await db.connect()

  try {
    await createMigrationsTable()

    const migrationFiles = await getMigrationFiles()

    if (migrationFiles.length === 0) {
      console.log('No migrations found.')
      return
    }

    for (const filename of migrationFiles) {
      const alreadyApplied = await hasMigrationRun(filename)

      if (alreadyApplied) {
        console.log(`Skipping ${ filename } `)
        continue
      }

      await applyMigration(filename)
    }

    console.log('Database migration complete.')
  } finally {
    await db.end()
  }
}

migrate().catch((error) => {
  console.error('Migration failed:')
  console.error(error)

  process.exit(1)
})

