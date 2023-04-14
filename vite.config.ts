import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      // all tests in src/http/controllers will run differents schemas PostgresSQL
      ['src/http/controllers/**', 'prisma'],
    ],
  },
})
