import React from 'react';
import { EquipoCard } from '../components/molecules/EquipoCard';

interface Especialista {
  nombre: string;
  especialidad: string;
  foto: string;
  resena: string;
  experiencia: string;
}

const ESPECIALISTAS: Especialista[] = [
  {
    nombre: 'Dra. Ana Rodríguez',
    especialidad: 'Medicina Interna',
    foto: '/equipo/especialistaAna.jpg',
    resena: 'Se toma el tiempo de explicar cada diagnóstico con calma. Acompaña a pacientes con enfermedades crónicas y a sus familias en cada control.',
    experiencia: '12 años de experiencia'
  },
  {
    nombre: 'Dr. Carlos Muñoz',
    especialidad: 'Cirugía y Tejidos Blandos',
    foto: '/equipo/especialistaCarlos.jpg',
    resena: 'Planifica cada intervención junto al tutor y hace seguimiento personal del post-operatorio hasta el alta definitiva.',
    experiencia: '10 años de experiencia'
  },
  {
    nombre: 'Dr. Felipe Torres',
    especialidad: 'Diagnóstico por Imagen',
    foto: '/equipo/especialistaFelipe.png',
    resena: 'Realiza radiografías y ecografías con un manejo tranquilo y respetuoso, para que cada examen sea lo menos estresante posible.',
    experiencia: '8 años de experiencia'
  },
  {
    nombre: 'Dra. Lucía Fernández',
    especialidad: 'Dermatología',
    foto: '/equipo/especialistaLucia.jpg',
    resena: 'Busca la causa de alergias y problemas de piel con tratamientos simples de seguir en casa y controles cercanos.',
    experiencia: '7 años de experiencia'
  },
  {
    nombre: 'Dra. María Gómez',
    especialidad: 'Medicina Felina',
    foto: '/equipo/especialistaMaria.webp',
    resena: 'Atiende gatos en un ambiente silencioso y sin prisas, adaptando cada consulta a su ritmo y temperamento.',
    experiencia: '9 años de experiencia'
  }
];

export const Equipo: React.FC = () => (
  <div>
    <div className="text-center mb-5">
      <h2 className="text-primary fw-bold mb-2">Nuestro Equipo Médico</h2>
      <p className="text-muted mb-0">Profesionales que conocen a cada paciente por su nombre.</p>
    </div>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {ESPECIALISTAS.map((especialista) => (
        <EquipoCard
          key={especialista.nombre}
          nombre={especialista.nombre}
          especialidad={especialista.especialidad}
          foto={especialista.foto}
          resena={especialista.resena}
          experiencia={especialista.experiencia}
        />
      ))}
    </div>
  </div>
);
