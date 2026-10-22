/**
 * Tipos de dominio compartidos por toda la aplicación.
 * Centralizados aquí (en lugar de "services/tipos.ts") siguiendo la
 * convención estándar de un proyecto Vite + React + TypeScript.
 */

/** Estado de atención de una mascota dentro de la clínica. */
export type EstadoAtencion = 'Atendido' | 'Pendiente' | 'En Tratamiento';

/** Una mascota registrada en la veterinaria. */
export interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  dueno: string;
  emailDueno: string;
  estado: EstadoAtencion;
  descripcion?: string;
}

/** Datos necesarios para registrar una mascota (sin id autogenerado). */
export type MascotaInput = Omit<Mascota, 'id'>;

/**
 * Un registro de atención/consulta veterinaria asociado a una mascota.
 * Permite llevar el historial clínico de forma independiente de los
 * datos básicos de la mascota.
 */
export interface Atencion {
  id: string;
  mascotaId: string;
  fecha: string;
  motivo: string;
  veterinario: string;
  estado: EstadoAtencion;
  observaciones?: string;
}
