import React from 'react';
import { Link } from 'react-router-dom';
import { serviciosApi } from '../services/repositorios';
import { useRecurso } from '../hooks/useRecurso';
import { formatearPrecio } from '../utils/formato';
import { Alerta } from '../components/atoms/Alerta';
import { Cargando } from '../components/atoms/Cargando';
import type { Servicio } from '../types';

const SIN_SERVICIOS: Servicio[] = [];

const PREGUNTAS_FRECUENTES = [
  {
    pregunta: '¿Necesito reservar hora o puedo llegar directamente?',
    respuesta: 'Para consultas generales recomendamos agendar hora desde la página de Registro. Las urgencias se atienden sin cita previa, en el horario que corresponda.'
  },
  {
    pregunta: '¿Atienden urgencias fuera de horario de atención?',
    respuesta: 'Sí, contamos con servicio de urgencias 24/7 todos los días del año, incluyendo domingos y festivos.'
  },
  {
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta: 'Aceptamos efectivo, tarjetas de débito y crédito, y transferencia bancaria.'
  },
  {
    pregunta: '¿Atienden otras especies además de perros y gatos?',
    respuesta: 'Sí, también atendemos conejos, aves y otras mascotas pequeñas. Te recomendamos indicarlo al momento de agendar.'
  },
  {
    pregunta: '¿Los precios incluyen exámenes adicionales?',
    respuesta: 'Los precios mostrados son estimados para el servicio base. Exámenes de laboratorio, imagenología o medicamentos adicionales se cotizan por separado.'
  }
];

export const Servicios: React.FC = () => {
  const { datos: servicios, cargando, error } = useRecurso(serviciosApi.listarActivos, SIN_SERVICIOS);

  return (
    <div>
      <div className="text-center mb-5">
        <h2 className="text-primary fw-bold mb-2">Nuestros Servicios</h2>
        <p className="text-muted mb-0">Valores referenciales para que sepas qué esperar antes de tu visita.</p>
      </div>
      <Alerta tipo="danger" mensaje={error} />
      {cargando && <Cargando texto="Cargando servicios..." />}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5 justify-content-center">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="col">
            <div className="card h-100 shadow-sm border-0 card-servicio">
              <div className="card-body d-flex flex-column p-4">
                <div className="icono-servicio mb-3"><i className={`bi ${servicio.icono || 'bi-heart-pulse'}`}></i></div>
                <h5 className="card-title fw-bold">{servicio.nombre}</h5>
                <p className="card-text text-muted">{servicio.descripcion}</p>
                <ul className="list-unstyled small mb-4 flex-grow-1">
                  {servicio.duracion && <li className="mb-2"><i className="bi bi-clock text-primary me-2"></i>{servicio.duracion}</li>}
                  {servicio.modalidad && <li className="mb-2"><i className="bi bi-geo-alt text-primary me-2"></i>{servicio.modalidad}</li>}
                  {servicio.incluye && <li><i className="bi bi-check2-circle text-primary me-2"></i>{servicio.incluye}</li>}
                </ul>
                <div className="border-top pt-3">
                  <small className="text-muted text-uppercase d-block precio-etiqueta">Valor referencial</small>
                  <span className="fs-4 fw-bold text-primary">{formatearPrecio(servicio)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="cta-agenda rounded-4 p-4 p-md-5 mb-5 text-white shadow-sm">
        <div className="row align-items-center g-4">
          <div className="col-md-8">
            <h3 className="fw-bold mb-2">Agenda tu hora veterinaria hoy</h3>
            <p className="mb-0 cta-agenda-texto">
              Cuéntanos qué necesita tu mascota y te orientamos sobre el servicio más adecuado, los horarios
              disponibles y la preparación previa a la atención.
            </p>
          </div>
          <div className="col-md-4 text-md-end">
            <Link to="/contacto" className="btn btn-light btn-lg fw-semibold text-primary btn-principal">
              <i className="bi bi-calendar-check me-2"></i>Agendar ahora
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-center text-primary mb-4">Preguntas Frecuentes</h2>
        <div className="accordion" id="accordionFaq">
          {PREGUNTAS_FRECUENTES.map((item, indice) => (
            <div className="accordion-item" key={item.pregunta}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${indice === 0 ? '' : 'collapsed'}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq-${indice}`}
                  aria-expanded={indice === 0 ? 'true' : 'false'}
                  aria-controls={`faq-${indice}`}
                >
                  {item.pregunta}
                </button>
              </h2>
              <div
                id={`faq-${indice}`}
                className={`accordion-collapse collapse ${indice === 0 ? 'show' : ''}`}
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">{item.respuesta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
