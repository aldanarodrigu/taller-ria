import { perfilConfig } from '../config/perfil.config'
import type { PerfilItem } from '../type/perfil.types'

export async function fetchPerfilItems(): Promise<PerfilItem[]> {
  const response = await fetch(`${perfilConfig.baseUrl}/items`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los datos de perfil: ' + response.status + ' ' + response.statusText)
  }

  return (await response.json()) as PerfilItem[]
}
