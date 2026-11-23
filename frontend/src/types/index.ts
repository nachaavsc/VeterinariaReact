export type EstadoAtencion = 'Atendido' | 'Pendiente' | 'En Tratamiento';

export interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  dueno: string;
  emailDueno: string;
  estado: EstadoAtencion;
  descripcion?: string;
  imagen?: string;
}

export type MascotaInput = Omit<Mascota, 'id'>;

export interface Atencion {
  id: string;
  mascotaId: string;
  fecha: string;
  motivo: string;
  veterinario: string;
  estado: EstadoAtencion;
  observaciones?: string;
}
