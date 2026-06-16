import { authConfig } from '../config/auth.config'
import type { DatosPerfilEditable } from '@/modules/perfil/type/perfil.types'
import type {
  CredencialesInicioSesion,
  DatosRegistro,
  PerfilUsuario,
  SesionAuth,
  UsuarioLocal,
} from '../type/auth.types'

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

export function generarAvatarSeedAleatorio(): string {
  return crypto.randomUUID()
}

function normalizarPerfilUsuario(perfil: Partial<PerfilUsuario> | undefined, nickname: string): PerfilUsuario {
  return {
    avatarSeed: perfil?.avatarSeed || generarAvatarSeedAleatorio(),
    correo: perfil?.correo ?? '',
    nickname: perfil?.nickname?.trim() || nickname,
    nombreVisible: perfil?.nombreVisible ?? '',
  }
}

function normalizarUsuarioLocal(usuario: Partial<UsuarioLocal>): UsuarioLocal {
  const nickname = usuario.nickname?.trim()

  if (!usuario.id || !nickname || !usuario.contrasena || !usuario.fechaCreacion) {
    throw new Error('Se encontraron datos de usuario invalidos')
  }

  return {
    contrasena: usuario.contrasena,
    fechaCreacion: usuario.fechaCreacion,
    id: usuario.id,
    nickname,
    perfil: normalizarPerfilUsuario(usuario.perfil, nickname),
  }
}

export function obtenerUsuariosGuardados(): UsuarioLocal[] {
  const usuariosRaw = leerJson<Partial<UsuarioLocal>[]>(authConfig.claveUsuarios, [])
  const usuariosNormalizados = usuariosRaw
    .map((usuario) => {
      try {
        return normalizarUsuarioLocal(usuario)
      } catch {
        return null
      }
    })
    .filter((usuario): usuario is UsuarioLocal => usuario !== null)

  if (JSON.stringify(usuariosRaw) !== JSON.stringify(usuariosNormalizados)) {
    guardarUsuarios(usuariosNormalizados)
  }

  return usuariosNormalizados
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
      avatarSeed: generarAvatarSeedAleatorio(),
      nickname: nicknameNormalizado,
      nombreVisible: '',
      correo: '',
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

export function actualizarPerfilUsuario(datos: DatosPerfilEditable): UsuarioLocal {
  const sesion = obtenerSesionGuardada()

  if (!sesion) {
    throw new Error('No hay una sesion activa')
  }

  const usuarios = obtenerUsuariosGuardados()
  const indiceUsuario = usuarios.findIndex((usuario) => usuario.id === sesion.usuarioId)

  if (indiceUsuario === -1) {
    limpiarSesion()
    throw new Error('No se encontro el usuario autenticado')
  }

  const usuarioActual = usuarios[indiceUsuario]

  if (!usuarioActual) {
    throw new Error('No se encontro el usuario autenticado')
  }

  const usuarioActualizado: UsuarioLocal = {
    ...usuarioActual,
    perfil: {
      ...usuarioActual.perfil,
      avatarSeed: datos.avatarSeed,
      correo: datos.correo.trim(),
      nombreVisible: datos.nombreVisible.trim(),
    },
  }

  const usuariosActualizados = [...usuarios]
  usuariosActualizados[indiceUsuario] = usuarioActualizado
  guardarUsuarios(usuariosActualizados)

  return usuarioActualizado
}
