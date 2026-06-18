export const buscadorConfig = {
  baseUrl: 'https://api.rawg.io/api',
  apiKey: import.meta.env.VITE_RAWG_KEY ?? '1a84ee9b8fc24394be90b2eedc815f09',
  sessionKey: 'gamexplorer_buscador_query',
} as const
