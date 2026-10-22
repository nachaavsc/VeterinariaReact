import type { Mascota, MascotaInput } from '../types';

const MASCOTAS_INICIALES: Mascota[] = [
  { id: '1', nombre: 'Max', especie: 'Perro', raza: 'Golden Retriever', dueno: 'Juan Pérez', emailDueno: 'juan@mail.com', estado: 'Atendido', descripcion: 'Control anual al día.' },
  { id: '2', nombre: 'Luna', especie: 'Gato', raza: 'Siamés', dueno: 'María Silva', emailDueno: 'maria@mail.com', estado: 'Pendiente', descripcion: 'Vacunación pendiente.' },
  { id: '3', nombre: 'Thor', especie: 'Perro', raza: 'Bulldog', dueno: 'Carlos Soto', emailDueno: 'carlos@mail.com', estado: 'En Tratamiento', descripcion: 'Tratamiento de otitis.' }
];

let listaMascotas: Mascota[] = [...MASCOTAS_INICIALES];

/** Acceso a los datos de mascotas. Hoy en memoria; pensado para poder
 *  reemplazarse por una API real sin tocar a los componentes que lo usan. */
export const petsRepository = {
  getAll: (): Mascota[] => [...listaMascotas],

  getById: (id: string): Mascota | undefined => listaMascotas.find((m) => m.id === id),

  create: (nuevaMascota: MascotaInput): Mascota => {
    const creada: Mascota = { ...nuevaMascota, id: Date.now().toString() };
    listaMascotas.push(creada);
    return creada;
  },

  update: (id: string, campos: Partial<MascotaInput>): Mascota | null => {
    const indice = listaMascotas.findIndex((m) => m.id === id);
    if (indice === -1) return null;
    listaMascotas[indice] = { ...listaMascotas[indice], ...campos };
    return listaMascotas[indice];
  },

  remove: (id: string): boolean => {
    const largoInicial = listaMascotas.length;
    listaMascotas = listaMascotas.filter((m) => m.id !== id);
    return listaMascotas.length < largoInicial;
  },

  search: (criterio: string): Mascota[] => {
    const q = criterio.toLowerCase().trim();
    if (!q) return [...listaMascotas];
    return listaMascotas.filter((m) =>
      m.nombre.toLowerCase().includes(q) ||
      m.dueno.toLowerCase().includes(q) ||
      m.especie.toLowerCase().includes(q)
    );
  },

  reset: (): void => {
    listaMascotas = [...MASCOTAS_INICIALES];
  }
};
