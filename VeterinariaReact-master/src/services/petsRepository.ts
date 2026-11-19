import type { Mascota, MascotaInput } from '../types';

const MASCOTAS_INICIALES: Mascota[] = [
  {
    id: '1',
    nombre: 'Max',
    especie: 'Perro',
    raza: 'Golden Retriever',
    dueno: 'Juan Pérez',
    emailDueno: 'juan@mail.com',
    estado: 'Atendido',
    descripcion: 'Control anual al día.',
    imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    nombre: 'Luna',
    especie: 'Gato',
    raza: 'Siamés',
    dueno: 'María Silva',
    emailDueno: 'maria@mail.com',
    estado: 'Pendiente',
    descripcion: 'Vacunación pendiente.',
    imagen: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '3',
    nombre: 'Thor',
    especie: 'Perro',
    raza: 'Bulldog',
    dueno: 'Carlos Soto',
    emailDueno: 'carlos@mail.com',
    estado: 'En Tratamiento',
    descripcion: 'Tratamiento de otitis.',
    imagen: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200'
  }
];

let listaMascotas: Mascota[] = [...MASCOTAS_INICIALES];

export const petsRepository = {
  obtenerTodas: (): Mascota[] => [...listaMascotas],

  obtenerPorId: (id: string): Mascota | undefined => listaMascotas.find((m) => m.id === id),

  crear: (nuevaMascota: MascotaInput): Mascota => {
    const creada: Mascota = { ...nuevaMascota, id: Date.now().toString() };
    listaMascotas.push(creada);
    return creada;
  },

  actualizar: (id: string, campos: Partial<MascotaInput>): Mascota | null => {
    const indice = listaMascotas.findIndex((m) => m.id === id);
    if (indice === -1) return null;
    listaMascotas[indice] = { ...listaMascotas[indice], ...campos };
    return listaMascotas[indice];
  },

  eliminar: (id: string): boolean => {
    const largoInicial = listaMascotas.length;
    listaMascotas = listaMascotas.filter((m) => m.id !== id);
    return listaMascotas.length < largoInicial;
  },

  buscar: (criterio: string): Mascota[] => {
    const q = criterio.toLowerCase().trim();
    if (!q) return [...listaMascotas];
    return listaMascotas.filter((m) =>
      m.nombre.toLowerCase().includes(q) ||
      m.dueno.toLowerCase().includes(q) ||
      m.especie.toLowerCase().includes(q)
    );
  },

  reiniciar: (): void => {
    listaMascotas = [...MASCOTAS_INICIALES];
  }
};