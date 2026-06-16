import { authConfig } from '../config/auth.config'
import type {
  CredencialesInicioSesion,
  DatosRegistro,
  SesionAuth,
  UsuarioLocal,
} from '../type/auth.types'

const COLOR_AVATAR_POR_DEFECTO = '#7c3aed'

function leerJson<T>(clave: string, valorPorDefecto: T): T {
  const valorGuardado = localStorage.getItem(clave)

  if (!valorGuardado) {
    return valorPorDefecto
  }

  try {
    return JSON.parse(valorGuardado) as T
  } catch {
    return valorPorDefecto
  }
}

function generarIdUsuario(): string {
  return `usuario-${crypto.randomUUID()}`
}

export function obtenerUsuariosGuardados(): UsuarioLocal[] {
  return leerJson<UsuarioLocal[]>(authConfig.claveUsuarios, [])
}

export function guardarUsuarios(usuarios: UsuarioLocal[]): void {
  localStorage.setItem(authConfig.claveUsuarios, JSON.stringify(usuarios))
}

export function obtenerSesionGuardada(): SesionAuth | null {
  return leerJson<SesionAuth | null>(authConfig.claveSesion, null)
}

export function guardarSesion(sesion: SesionAuth): void {
  localStorage.setItem(authConfig.claveSesion, JSON.stringify(sesion))
}

export function limpiarSesion(): void {
  localStorage.removeItem(authConfig.claveSesion)
}

export function buscarUsuarioPorId(usuarioId: string, usuarios = obtenerUsuariosGuardados()): UsuarioLocal | null {
  return usuarios.find((usuario) => usuario.id === usuarioId) ?? null
}

export function registrarUsuario(datos: DatosRegistro): UsuarioLocal {
  const nicknameNormalizado = datos.nickname.trim()
  const contrasenaIngresada = datos.contrasena
  const usuarios = obtenerUsuariosGuardados()

  if (!nicknameNormalizado || !contrasenaIngresada) {
    throw new Error('El nickname y la contrasena son obligatorios')
  }

  const usuarioExistente = usuarios.find(
    (usuario) => usuario.nickname.toLowerCase() === nicknameNormalizado.toLowerCase(),
  )

  if (usuarioExistente) {
    throw new Error('Ya existe un usuario con ese nickname')
  }

  const nuevoUsuario: UsuarioLocal = {
    id: generarIdUsuario(),
    nickname: nicknameNormalizado,
    contrasena: contrasenaIngresada,
    fechaCreacion: new Date().toISOString(),
    perfil: {
      nickname: nicknameNormalizado,
      nombreVisible: '',
      correo: '',
      colorAvatar: COLOR_AVATAR_POR_DEFECTO,
    },
  }

  const usuariosActualizados = [...usuarios, nuevoUsuario]
  guardarUsuarios(usuariosActualizados)
  guardarSesion({ usuarioId: nuevoUsuario.id })

  return nuevoUsuario
}

export function iniciarSesion(credenciales: CredencialesInicioSesion): UsuarioLocal {
  const nicknameNormalizado = credenciales.nickname.trim()
  const contrasenaIngresada = credenciales.contrasena
  const usuarios = obtenerUsuariosGuardados()

  const usuario = usuarios.find(
    (item) => item.nickname.toLowerCase() === nicknameNormalizado.toLowerCase(),
  )

  if (!usuario || usuario.contrasena !== contrasenaIngresada) {
    throw new Error('Las credenciales ingresadas no son validas')
  }

  guardarSesion({ usuarioId: usuario.id })

  return usuario
}

export function cerrarSesion(): void {
  limpiarSesion()
}
