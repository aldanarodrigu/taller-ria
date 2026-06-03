export interface DetalleJuegoItem {
  id: string
  name: string
}

export interface DetalleJuegoState {
  error: string | null
  items: DetalleJuegoItem[]
  loading: boolean
}
