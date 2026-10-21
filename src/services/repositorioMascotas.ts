import { Mascota, MascotaEntrada } from './tipos';

const MASCOTAS_INICIALES: Mascota[] = [
  { id: '1', nombre: 'Max', especie: 'Perro', raza: 'Golden Retriever', dueno: 'Juan Pérez', emailDueno: 'juan@mail.com', estado: 'Atendido', descripcion: 'Control anual al día.' },
  { id: '2', nombre: 'Luna', especie: 'Gato', raza: 'Siamés', dueno: 'María Silva', emailDueno: 'maria@mail.com', estado: 'Pendiente', descripcion: 'Vacunación pendiente.' },
  { id: '3', nombre: 'Thor', especie: 'Perro', raza: 'Bulldog', dueno: 'Carlos Soto', emailDueno: 'carlos@mail.com', estado: 'En Tratamiento', descripcion: 'Tratamiento de otitis.' }
];

let listaMascotas: Mascota[] = [...MASCOTAS_INICIALES];

export const repositorioMascotas = {
  obtenerTodas: (): Mascota[] => [...listaMascotas],

  obtenerPorId: (id: string): Mascota | undefined => listaMascotas.find(m => m.id === id),

  crear: (nuevaMascota: MascotaEntrada): Mascota => {
    const creada: Mascota = { ...nuevaMascota, id: Date.now().toString() };
    listaMascotas.push(creada);
    return creada;
  },

  actualizar: (id: string, campos: Partial<MascotaEntrada>): Mascota | null => {
    const indice = listaMascotas.findIndex(m => m.id === id);
    if (indice === -1) return null;
    listaMascotas[indice] = { ...listaMascotas[indice], ...campos };
    return listaMascotas[indice];
  },

  eliminar: (id: string): boolean => {
    const largoInicial = listaMascotas.length;
    listaMascotas = listaMascotas.filter(m => m.id !== id);
    return listaMascotas.length < largoInicial;
  },

  buscar: (criterio: string): Mascota[] => {
    const q = criterio.toLowerCase().trim();
    if (!q) return [...listaMascotas];
    return listaMascotas.filter(m =>
      m.nombre.toLowerCase().includes(q) ||
      m.dueno.toLowerCase().includes(q) ||
      m.especie.toLowerCase().includes(q)
    );
  },

  reiniciar: (): void => {
    listaMascotas = [...MASCOTAS_INICIALES];
  }
};