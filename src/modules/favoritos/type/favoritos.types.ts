export interface FavoritosItem {
  id: string
  name: string
}

export interface FavoritosState {
  error: string | null
  items: FavoritosItem[]
  loading: boolean
}
