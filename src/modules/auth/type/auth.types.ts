export interface AuthItem {
  id: string
  name: string
}

export interface AuthState {
  error: string | null
  items: AuthItem[]
  loading: boolean
}
