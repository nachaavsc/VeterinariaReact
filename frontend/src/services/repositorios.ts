import type {
  Atencion,
  AtencionInput,
  Mascota,
  MascotaInput,
  Mensaje,
  MensajeInput,
  Servicio,
  ServicioInput,
  Veterinario,
  VeterinarioInput
} from '../types';
import { API, peticion } from './api';

const crearRecurso = <T, E>(url: string) => ({
  listar: () => peticion<T[]>(url),
  obtener: (id: number) => peticion<T>(`${url}/${id}`),
  crear: (datos: E) => peticion<T>(url, { method: 'POST', body: JSON.stringify(datos) }),
  actualizar: (id: number, datos: E) => peticion<T>(`${url}/${id}`, { method: 'PUT', body: JSON.stringify(datos) }),
  eliminar: (id: number) => peticion<void>(`${url}/${id}`, { method: 'DELETE' })
});

export const mascotasApi = crearRecurso<Mascota, MascotaInput>(API.mascotas);

export const serviciosApi = {
  ...crearRecurso<Servicio, ServicioInput>(API.servicios),
  listarActivos: () => peticion<Servicio[]>(`${API.servicios}/activos`)
};

export const equipoApi = crearRecurso<Veterinario, VeterinarioInput>(API.equipo);

export const historialApi = {
  ...crearRecurso<Atencion, AtencionInput>(API.historial),
  listarPorMascota: (mascotaId: number) => peticion<Atencion[]>(`${API.historial}/mascota/${mascotaId}`)
};

export const mensajesApi = {
  ...crearRecurso<Mensaje, MensajeInput>(API.mensajes),
  marcarLeido: (id: number) => peticion<Mensaje>(`${API.mensajes}/${id}/leido`, { method: 'PUT' })
};

export const filtrarMascotas = (mascotas: Mascota[], criterio: string): Mascota[] => {
  const q = criterio.toLowerCase().trim();
  if (!q) return mascotas;
  return mascotas.filter((m) =>
    m.nombre.toLowerCase().includes(q) ||
    m.dueno.toLowerCase().includes(q) ||
    m.especie.toLowerCase().includes(q)
  );
};
