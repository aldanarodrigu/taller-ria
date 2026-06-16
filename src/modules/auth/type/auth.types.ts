export interface PerfilUsuario {
  nickname: string
  nombreVisible: string
  correo: string
  colorAvatar: string
}

export interface UsuarioLocal {
  id: string
  nickname: string
  contrasena: string
  perfil: PerfilUsuario
  fechaCreacion: string
}

export interface SesionAuth {
  usuarioId: string
}

export interface EstadoAuth {
  cargando: boolean
  error: string | null
  inicializado: boolean
  usuarioActual: UsuarioLocal | null
  usuarios: UsuarioLocal[]
}

export interface DatosRegistro {
  nickname: string
  contrasena: string
}

export interface CredencialesInicioSesion {
  nickname: string
  contrasena: string
}

export interface CampoFormularioAutenticacion {
  clave: string
  etiqueta: string
  tipo: 'email' | 'password' | 'text'
  autocomplete?: string
  placeholder: string
}

export type ValoresFormularioAutenticacion = Record<string, string>
