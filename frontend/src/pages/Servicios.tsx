import React from 'react';
import { Link } from 'react-router-dom';

interface Servicio {
  icono: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  modalidad: string;
  incluye: string;
  precio: string;
}

const SERVICIOS: Servicio[] = [
  {
    icono: 'bi-clipboard2-pulse',
    titulo: 'Consulta General',
    descripcion: 'Chequeo clínico completo, evaluación del estado de salud y orientación sobre cuidados preventivos para tu mascota.',
    duracion: '30 a 40 minutos',
    modalidad: 'Presencial con hora agendada',
    incluye: 'Examen físico y plan de cuidados',
    precio: '$15.000 - $20.000'
  },
  {
    icono: 'bi-shield-plus',
    titulo: 'Vacunación',
    descripcion: 'Plan de vacunación al día según especie, edad y factores de riesgo, con cartilla de control incluida.',
    duracion: '15 a 20 minutos',
    modalidad: 'Presencial, con o sin hora',
    incluye: 'Revisión previa y registro en cartilla',
    precio: '$12.000 - $18.000'
  },
  {
    icono: 'bi-bandaid',
    titulo: 'Cirugía',
    descripcion: 'Procedimientos quirúrgicos con equipo especializado, anestesia monitoreada y seguimiento post-operatorio.',
    duracion: 'Según procedimiento',
    modalidad: 'Programada tras evaluación previa',
    incluye: 'Exámenes pre-quirúrgicos y control post-operatorio',
    precio: 'Desde $80.000'
  },
  {
    icono: 'bi-stars',
    titulo: 'Odontología',
    descripcion: 'Limpieza dental, destartraje y tratamiento de enfermedades bucales para prevenir infecciones y dolor.',
    duracion: '1 a 2 horas',
    modalidad: 'Ambulatoria con sedación',
    incluye: 'Destartraje, pulido y evaluación bucal',
    precio: '$35.000 - $60.000'
  },
  {
    icono: 'bi-display',
    titulo: 'Imagenología / Rayos X',
    descripcion: 'Radiografías y ecografías para un diagnóstico preciso de fracturas, órganos internos y gestaciones.',
    duracion: '20 a 45 minutos',
    modalidad: 'Con orden médica o derivación',
    incluye: 'Informe del especialista',
    precio: '$25.000 - $45.000'
  },
  {
    icono: 'bi-hospital',
    titulo: 'Urgencias 24/7',
    descripcion: 'Atención inmediata ante accidentes, intoxicaciones o descompensaciones, todos los días del año.',
    duracion: 'Atención inmediata',
    modalidad: 'Sin hora previa, todos los días',
    incluye: 'Evaluación de triage y estabilización',
    precio: 'Desde $30.000'
  },
  {
    icono: 'bi-scissors',
    titulo: 'Peluquería',
    descripcion: 'Baño, corte y cuidado estético adaptado a cada raza, con productos hipoalergénicos.',
    duracion: '1 a 3 horas',
    modalidad: 'Con hora agendada',
    incluye: 'Baño, secado, corte y limpieza de oídos',
    precio: '$10.000 - $22.000'
  }
];

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

export const Servicios: React.FC = () => (
  <div>
    <div className="text-center mb-5">
      <h2 className="text-primary fw-bold mb-2">Nuestros Servicios</h2>
      <p className="text-muted mb-0">Valores referenciales para que sepas qué esperar antes de tu visita.</p>
    </div>
    <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
      {SERVICIOS.map((servicio) => (
        <div key={servicio.titulo} className="col">
          <div className="card h-100 shadow-sm border-0 card-servicio">
            <div className="card-body d-flex flex-column p-4">
              <div className="icono-servicio mb-3"><i className={`bi ${servicio.icono}`}></i></div>
              <h5 className="card-title fw-bold">{servicio.titulo}</h5>
              <p className="card-text text-muted">{servicio.descripcion}</p>
              <ul className="list-unstyled small mb-4 flex-grow-1">
                <li className="mb-2"><i className="bi bi-clock text-primary me-2"></i>{servicio.duracion}</li>
                <li className="mb-2"><i className="bi bi-geo-alt text-primary me-2"></i>{servicio.modalidad}</li>
                <li><i className="bi bi-check2-circle text-primary me-2"></i>{servicio.incluye}</li>
              </ul>
              <div className="border-top pt-3">
                <small className="text-muted text-uppercase d-block precio-etiqueta">Valor referencial</small>
                <span className="fs-4 fw-bold text-primary">{servicio.precio}</span>
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
