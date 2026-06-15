export const detalleJuegoConfig = {
  apiKey: import.meta.env.VITE_RAWG_KEY,
  baseUrl: '/rawg',
  fallbackGameId: 3498, // GTA V, juego de prueba base para hacer test
} as const
