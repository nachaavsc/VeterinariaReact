import React from 'react';

interface Servicio {
  icono: string;
  titulo: string;
  descripcion: string;
}

const SERVICIOS: Servicio[] = [
  { icono: '🩺', titulo: 'Consulta General', descripcion: 'Chequeos preventivos y diagnóstico clínico para mantener a tu mascota sana.' },
  { icono: '💉', titulo: 'Vacunación', descripcion: 'Plan de vacunas al día según especie, edad y factores de riesgo.' },
  { icono: '🔬', titulo: 'Exámenes de Laboratorio', descripcion: 'Análisis de sangre, orina y otros exámenes con resultados rápidos.' },
  { icono: '🦴', titulo: 'Cirugía', descripcion: 'Procedimientos quirúrgicos con equipo especializado y seguimiento post-operatorio.' },
  { icono: '🐾', titulo: 'Peluquería y Estética', descripcion: 'Baño, corte y cuidado estético adaptado a cada raza.' },
  { icono: '🏨', titulo: 'Hospitalización', descripcion: 'Internación y monitoreo las 24 horas para casos que requieren observación.' }
];

export const Servicios: React.FC = () => (
  <div>
    <h2 className="text-center mb-4">Nuestros Servicios</h2>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {SERVICIOS.map((servicio) => (
        <div key={servicio.titulo} className="col">
          <div className="card h-100 shadow-sm text-center p-3">
            <div className="fs-1 mb-2">{servicio.icono}</div>
            <div className="card-body">
              <h5 className="card-title">{servicio.titulo}</h5>
              <p className="card-text text-muted">{servicio.descripcion}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
