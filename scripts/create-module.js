#!/usr/bin/env node

import { mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const args = process.argv.slice(2)
const moduleName = args.find((argument) => !argument.startsWith('--'))
const rootOptionIndex = args.indexOf('--root')
const customRoot = rootOptionIndex === -1 ? null : args[rootOptionIndex + 1]

if (args.includes('--help') || args.includes('-h')) {
  console.log('Uso: npm run create-module -- <nombre-modulo> [--root <ruta-salida>]')
  process.exit(0)
}

if (!moduleName) {
  console.error('Falta el nombre del módulo. Ejemplo: npm run create-module -- usuario')
  process.exit(1)
}

if (rootOptionIndex !== -1 && !customRoot) {
  console.error('Falta el valor de --root')
  process.exit(1)
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDir, '..')
const outputRoot = customRoot ? path.resolve(customRoot) : path.join(projectRoot, 'src', 'modules')
const moduleFolderName = toKebabCase(moduleName)
const pascalName = toPascalCase(moduleName)
const camelName = toCamelCase(moduleName)
const moduleRoot = path.join(outputRoot, moduleFolderName)

await assertNotExists(moduleRoot)

for (const folder of ['component', 'page', 'composable', 'store', 'config', 'service', 'type']) {
  await mkdir(path.join(moduleRoot, folder), { recursive: true })
}

const files = [
  {
    filePath: path.join(moduleRoot, 'component', `${pascalName}View.vue`),
    content: createComponentTemplate({ pascalName, moduleFolderName }),
  },
  {
    filePath: path.join(moduleRoot, 'page', `${pascalName}Page.vue`),
    content: createPageTemplate({ pascalName }),
  },
  {
    filePath: path.join(moduleRoot, 'composable', `use${pascalName}.ts`),
    content: createComposableTemplate({ pascalName }),
  },
  {
    filePath: path.join(moduleRoot, 'store', `use${pascalName}Store.ts`),
    content: createStoreTemplate({ camelName, pascalName, moduleFolderName }),
  },
  {
    filePath: path.join(moduleRoot, 'config', `${moduleFolderName}.config.ts`),
    content: createConfigTemplate({ camelName, moduleFolderName }),
  },
  {
    filePath: path.join(moduleRoot, 'service', `${moduleFolderName}.service.ts`),
    content: createServiceTemplate({ camelName, pascalName, moduleFolderName }),
  },
  {
    filePath: path.join(moduleRoot, 'type', `${moduleFolderName}.types.ts`),
    content: createTypeTemplate({ pascalName }),
  },
]

for (const file of files) {
  await writeFile(file.filePath, file.content, 'utf8')
}

console.log(`Módulo creado en ${path.relative(projectRoot, moduleRoot)}`)

async function assertNotExists(targetPath) {
  try {
    await stat(targetPath)
    throw new Error(`El destino ya existe: ${targetPath}`)
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return
    }

    throw error
  }
}

function createComponentTemplate({ pascalName, moduleFolderName }) {
  return `<script setup lang="ts">
import type { ${pascalName}Item } from '../type/${moduleFolderName}.types'

defineProps<{
  error: string | null
  items: ${pascalName}Item[]
  loading: boolean
}>()

const emit = defineEmits<{
  reload: []
}>()
</script>

<template>
  <section class="${moduleFolderName}-module">
    <header class="${moduleFolderName}-module__header">
      <h1>${pascalName}</h1>
      <button type="button" @click="emit('reload')">Recargar</button>
    </header>

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else class="${moduleFolderName}-module__list">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </section>
</template>
`
}

function createPageTemplate({ pascalName }) {
  return `<script setup lang="ts">
import ${pascalName}View from '../component/${pascalName}View.vue'
import { use${pascalName} } from '../composable/use${pascalName}'

const { error, items, loading, reload } = use${pascalName}()
</script>

<template>
  <${pascalName}View
    :error="error"
    :items="items"
    :loading="loading"
    @reload="reload"
  />
</template>
`
}

function createComposableTemplate({ pascalName }) {
  return `import { computed, onMounted } from 'vue'

import { use${pascalName}Store } from '../store/use${pascalName}Store'

export function use${pascalName}() {
  const store = use${pascalName}Store()

  const items = computed(() => store.items)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)

  async function reload() {
    await store.fetchItems()
  }

  onMounted(() => {
    void store.fetchItems()
  })

  return {
    error,
    items,
    loading,
    reload,
    store,
  }
}
`
}

function createStoreTemplate({ camelName, pascalName, moduleFolderName }) {
  return `import { defineStore } from 'pinia'

import { fetch${pascalName}Items } from '../service/${moduleFolderName}.service'
import type { ${pascalName}State } from '../type/${moduleFolderName}.types'

const createState = (): ${pascalName}State => ({
  error: null,
  items: [],
  loading: false,
})

export const use${pascalName}Store = defineStore('${camelName}', {
  actions: {
    async fetchItems() {
      this.loading = true
      this.error = null

      try {
        this.items = await fetch${pascalName}Items()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },
  },
  state: createState,
})
`
}

function createConfigTemplate({ camelName, moduleFolderName }) {
  return `export const ${camelName}Config = {
  baseUrl: '/api/${moduleFolderName}',
} as const
`
}

function createServiceTemplate({ camelName, pascalName, moduleFolderName }) {
  return `import { ${camelName}Config } from '../config/${moduleFolderName}.config'
import type { ${pascalName}Item } from '../type/${moduleFolderName}.types'

export async function fetch${pascalName}Items(): Promise<${pascalName}Item[]> {
  const response = await fetch(\`${'${'}${camelName}Config.baseUrl${'}'}/items\`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los datos de ${moduleFolderName}: ' + response.status + ' ' + response.statusText)
  }

  return (await response.json()) as ${pascalName}Item[]
}
`
}

function createTypeTemplate({ pascalName }) {
  return `export interface ${pascalName}Item {
  id: string
  name: string
}

export interface ${pascalName}State {
  error: string | null
  items: ${pascalName}Item[]
  loading: boolean
}
`
}

function toWords(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}

function toPascalCase(value) {
  return toWords(value)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

function toCamelCase(value) {
  const pascalCase = toPascalCase(value)

  return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1)
}

function toKebabCase(value) {
  return toWords(value)
    .map((word) => word.toLowerCase())
    .join('-')
}
