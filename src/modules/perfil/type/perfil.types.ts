export interface DatosPerfilEditable {
  correo: string
  nombreVisible: string
}

export interface EstadoPerfil {
  borrador: DatosPerfilEditable
  cargando: boolean
  error: string | null
  exito: string | null
  guardando: boolean
  perfil: DatosPerfilEditable | null
}
