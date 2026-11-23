export const API = {
  auth: 'http://localhost:8081/api/auth',
  mascotas: 'http://localhost:8082/api/mascotas',
  mensajes: 'http://localhost:8085/api/mensajes',
  historial: 'http://localhost:8086/api/historial'
};

export const CLAVE_TOKEN = 'token';

export class ErrorApi extends Error {
  estado: number;

  constructor(estado: number, mensaje: string) {
    super(mensaje);
    this.estado = estado;
  }
}

const obtenerToken = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_TOKEN) ?? 'null') as string | null;
  } catch {
    return null;
  }
};

export const peticion = async <T>(url: string, opciones: RequestInit = {}): Promise<T> => {
  const token = obtenerToken();
  const respuesta = await fetch(url, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers
    }
  });

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => null);
    throw new ErrorApi(respuesta.status, cuerpo?.error ?? `Error ${respuesta.status}`);
  }

  return respuesta.status === 204 ? (undefined as T) : ((await respuesta.json()) as T);
};
