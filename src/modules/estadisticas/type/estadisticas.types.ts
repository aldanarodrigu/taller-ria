export interface EstadisticasItem {
  id: string
  name: string
}

export interface EstadisticasState {
  error: string | null
  items: EstadisticasItem[]
  loading: boolean
  generos: EstadisticasGeneroResponse | null
}

export interface EstadisticasGeneroResponse  {
  count: number;
  next: string;
  previous: string;
  results: Resultados[]
}

export interface Resultados {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
