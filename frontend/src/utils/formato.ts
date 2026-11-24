import type { Servicio } from '../types';

const pesos = (valor: number) => `$${valor.toLocaleString('es-CL')}`;

export const formatearPrecio = ({ precio, precioMaximo }: Pick<Servicio, 'precio' | 'precioMaximo'>) =>
  precioMaximo ? `${pesos(precio)} - ${pesos(precioMaximo)}` : `Desde ${pesos(precio)}`;
