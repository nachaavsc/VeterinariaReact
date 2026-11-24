import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EquipoCard } from '../components/molecules/EquipoCard';
import { Alerta } from '../components/atoms/Alerta';
import { Cargando } from '../components/atoms/Cargando';
import { equipoApi } from '../services/repositorios';
import { useRecurso } from '../hooks/useRecurso';
import type { Veterinario } from '../types';

const SIN_VETERINARIOS: Veterinario[] = [];
const TODOS = 'Todos';

const PILARES = [
  {
    icono: 'bi-heart-pulse',
    titulo: 'Atención Integral',
    texto: 'Evaluamos a cada paciente de forma completa y coordinamos a los especialistas que necesita, en un solo lugar.'
  },
  {
    icono: 'bi-display',
    titulo: 'Diagnóstico Moderno',
    texto: 'Contamos con imagenología, laboratorio y equipamiento actualizado para decisiones clínicas rápidas y precisas.'
  },
  {
    icono: 'bi-clipboard2-check',
    titulo: 'Seguimiento Continuo',
    texto: 'Registramos cada atención en el historial clínico y acompañamos a la familia hasta el alta y los controles.'
  }
];

export const Equipo: React.FC = () => {
  const { datos: veterinarios, cargando, error } = useRecurso(equipoApi.listar, SIN_VETERINARIOS);
  const [filtro, setFiltro] = useState(TODOS);

  const activos = veterinarios.filter((v) => v.activo);
  const especialidades = [TODOS, ...new Set(activos.map((v) => v.especialidad))];
  const visibles = filtro === TODOS ? activos : activos.filter((v) => v.especialidad === filtro);

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-primary fw-bold mb-2">Nuestro Equipo Médico</h2>
        <p className="text-muted mb-0">Profesionales que conocen a cada paciente por su nombre.</p>
      </div>

      <Alerta tipo="danger" mensaje={error} />
      {cargando && <Cargando texto="Cargando equipo..." />}

      {activos.length > 0 && (
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4" role="group" aria-label="Filtrar por especialidad">
          {especialidades.map((especialidad) => (
            <button
              key={especialidad}
              type="button"
              className={`btn btn-sm px-3 filtro-especialidad ${filtro === especialidad ? 'active' : ''}`}
              aria-pressed={filtro === especialidad}
              onClick={() => setFiltro(especialidad)}
            >
              {especialidad}
            </button>
          ))}
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5 justify-content-center">
        {visibles.map((especialista) => (
          <EquipoCard
            key={especialista.id}
            nombre={especialista.nombre}
            especialidad={especialista.especialidad}
            foto={especialista.foto ?? ''}
            resena={especialista.descripcion ?? ''}
            experiencia={especialista.experiencia ?? ''}
            email={especialista.email}
            enlaceAgenda={`/registro?especialista=${encodeURIComponent(especialista.nombre)}`}
          />
        ))}
      </div>

      <section className="mb-5">
        <h3 className="text-center text-primary fw-bold mb-4">Nuestro Compromiso Clínico</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {PILARES.map((pilar) => (
            <div key={pilar.titulo} className="col">
              <div className="card h-100 shadow-sm border-0 card-servicio">
                <div className="card-body p-4">
                  <div className="icono-servicio mb-3"><i className={`bi ${pilar.icono}`}></i></div>
                  <h5 className="fw-bold">{pilar.titulo}</h5>
                  <p className="text-muted mb-0">{pilar.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-agenda rounded-4 p-4 p-md-5 mb-4 text-white shadow-sm">
        <div className="row align-items-center g-4">
          <div className="col-md-7">
            <h3 className="fw-bold mb-2">¿Necesitas una hora con nuestro equipo?</h3>
            <p className="mb-0 cta-agenda-texto">
              Agenda una cita con el especialista que tu mascota necesita o escríbenos y te orientamos sobre la mejor atención.
            </p>
          </div>
          <div className="col-md-5 d-flex flex-wrap gap-2 justify-content-md-end">
            <Link to="/registro" className="btn btn-light fw-semibold text-primary btn-principal">
              <i className="bi bi-calendar-check me-2"></i>Agendar hora
            </Link>
            <Link to="/contacto" className="btn btn-outline-light fw-semibold btn-principal">
              <i className="bi bi-chat-dots me-2"></i>Contactar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
