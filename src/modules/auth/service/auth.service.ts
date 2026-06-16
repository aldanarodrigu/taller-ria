import { authConfig } from '../config/auth.config'
import type { AuthItem } from '../type/auth.types'

export async function fetchAuthItems(): Promise<AuthItem[]> {
  const response = await fetch(`${authConfig.baseUrl}/items`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los datos de auth: ' + response.status + ' ' + response.statusText)
  }

  return (await response.json()) as AuthItem[]
}
