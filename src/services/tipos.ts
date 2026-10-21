export type EstadoMascota = 'Atendido' | 'Pendiente' | 'En Tratamiento';

export interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  dueno: string;
  emailDueno: string;
  estado: EstadoMascota;
  descripcion?: string;
}

export type MascotaEntrada = Omit<Mascota, 'id'>;