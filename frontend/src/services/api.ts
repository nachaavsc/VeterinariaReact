export const API = {
  auth: 'http://localhost:8081/api/auth',
  mascotas: 'http://localhost:8082/api/mascotas',
  servicios: 'http://localhost:8083/api/servicios',
  equipo: 'http://localhost:8084/api/equipo',
  mensajes: 'http://localhost:8085/api/mensajes',
  historial: 'http://localhost:8086/api/historial'
};

export const CLAVE_TOKEN = 'token';

export const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MENSAJES_POR_ESTADO: Record<number, string> = {
  0: 'No se pudo conectar con el servidor. Verifica que los servicios estén iniciados.',
  401: 'Tu sesión expiró. Inicia sesión nuevamente para continuar.',
  403: 'No tienes permisos para realizar esta operación',
  404: 'El registro solicitado no existe'
};

export class ErrorApi extends Error {
  estado: number;
  campos: Record<string, string>;

  constructor(estado: number, mensaje: string, campos: Record<string, string> = {}) {
    super(mensaje);
    this.estado = estado;
    this.campos = campos;
  }
}

export const mensajeDeError = (error: unknown): string =>
  error instanceof Error && error.message ? error.message : 'Ocurrió un error inesperado. Intenta nuevamente.';

let alNoAutorizado: (() => void) | null = null;

export const registrarAlNoAutorizado = (manejador: () => void) => {
  alNoAutorizado = manejador;
  return () => {
    if (alNoAutorizado === manejador) alNoAutorizado = null;
  };
};

const obtenerToken = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_TOKEN) ?? 'null') as string | null;
  } catch {
    return null;
  }
};

export const peticion = async <T>(url: string, opciones: RequestInit = {}): Promise<T> => {
  const token = obtenerToken();
  let respuesta: Response;
  try {
    respuesta = await fetch(url, {
      ...opciones,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...opciones.headers
      }
    });
  } catch {
    throw new ErrorApi(0, MENSAJES_POR_ESTADO[0]);
  }

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => null);
    if (respuesta.status === 401 && token) alNoAutorizado?.();
    throw new ErrorApi(
      respuesta.status,
      cuerpo?.error ?? MENSAJES_POR_ESTADO[respuesta.status] ?? `Error ${respuesta.status}`,
      cuerpo?.campos ?? {}
    );
  }

  return respuesta.status === 204 ? (undefined as T) : ((await respuesta.json()) as T);
};
