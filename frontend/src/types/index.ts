export type EstadoAtencion = 'Atendido' | 'Pendiente' | 'En Tratamiento';

export interface Mascota {
  id: number;
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
  id: number;
  mascotaId: number;
  fecha: string;
  motivo: string;
  veterinario: string;
  estado: EstadoAtencion;
  observaciones?: string;
}

export type AtencionInput = Omit<Atencion, 'id'>;

export interface Servicio {
  id: number;
  nombre: string;
  categoria?: string;
  descripcion?: string;
  precio: number;
  precioMaximo?: number | null;
  icono?: string;
  duracion?: string;
  modalidad?: string;
  incluye?: string;
  activo: boolean;
}

export type ServicioInput = Omit<Servicio, 'id'>;

export interface Veterinario {
  id: number;
  nombre: string;
  especialidad: string;
  descripcion?: string;
  email: string;
  foto?: string;
  experiencia?: string;
  activo: boolean;
}

export type VeterinarioInput = Omit<Veterinario, 'id'>;

export interface Mensaje {
  id: number;
  nombreRemitente: string;
  email: string;
  telefono?: string;
  asunto?: string;
  contenido: string;
  fechaEnvio: string;
  leido: boolean;
}

export type MensajeInput = Pick<Mensaje, 'nombreRemitente' | 'email' | 'telefono' | 'asunto' | 'contenido'>;
