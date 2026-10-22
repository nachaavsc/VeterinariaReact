import React from 'react';
import { EquipoCard } from '../components/molecules/EquipoCard';

interface Especialista {
  nombre: string;
  especialidad: string;
  foto: string;
}

// Las fotos reales van en public/equipo/ con estos mismos nombres de
// archivo. Si todavía no están, <EquipoCard/> muestra un placeholder
// con las iniciales en vez de romper la página.
const ESPECIALISTAS: Especialista[] = [
  { nombre: 'Dra. Ana Rodríguez', especialidad: 'Medicina Interna', foto: '/equipo/especialistaAna.jpg' },
  { nombre: 'Dr. Carlos Muñoz', especialidad: 'Cirugía General', foto: '/equipo/especialistaCarlos.jpg' },
  { nombre: 'Dr. Felipe Torres', especialidad: 'Traumatología', foto: '/equipo/especialistaFelipe.png' },
  { nombre: 'Dra. Lucía Fernández', especialidad: 'Dermatología Canina', foto: '/equipo/especialistaLucia.jpg' },
  { nombre: 'Dra. María Gómez', especialidad: 'Atención Felina', foto: '/equipo/especialistaMaria.webp' }
];

export const Equipo: React.FC = () => (
  <div>
    <h2 className="text-center mb-4">Nuestro Equipo Médico</h2>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {ESPECIALISTAS.map((especialista) => (
        <EquipoCard
          key={especialista.nombre}
          nombre={especialista.nombre}
          especialidad={especialista.especialidad}
          foto={especialista.foto}
        />
      ))}
    </div>
  </div>
);
