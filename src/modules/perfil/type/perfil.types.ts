export interface PerfilItem {
  id: string
  name: string
}

export interface PerfilState {
  error: string | null
  items: PerfilItem[]
  loading: boolean
}
