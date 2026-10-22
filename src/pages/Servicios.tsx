import React from 'react';
import { Link } from 'react-router-dom';

interface Servicio {
  icono: string;
  titulo: string;
  descripcion: string;
  precio: string;
}

const SERVICIOS: Servicio[] = [
  {
    icono: '🩺',
    titulo: 'Consulta General',
    descripcion: 'Chequeo clínico completo, evaluación del estado de salud y orientación sobre cuidados preventivos para tu mascota.',
    precio: '$15.000 - $20.000'
  },
  {
    icono: '💉',
    titulo: 'Vacunación',
    descripcion: 'Plan de vacunación al día según especie, edad y factores de riesgo, con cartilla de control incluida.',
    precio: '$12.000 - $18.000'
  },
  {
    icono: '🦴',
    titulo: 'Cirugía',
    descripcion: 'Procedimientos quirúrgicos con equipo especializado, anestesia monitoreada y seguimiento post-operatorio.',
    precio: 'Desde $80.000'
  },
  {
    icono: '🦷',
    titulo: 'Odontología',
    descripcion: 'Limpieza dental, destartraje y tratamiento de enfermedades bucales para prevenir infecciones y dolor.',
    precio: '$35.000 - $60.000'
  },
  {
    icono: '📷',
    titulo: 'Imagenología / Rayos X',
    descripcion: 'Radiografías y ecografías para un diagnóstico preciso de fracturas, órganos internos y gestaciones.',
    precio: '$25.000 - $45.000'
  },
  {
    icono: '🚨',
    titulo: 'Urgencias 24/7',
    descripcion: 'Atención inmediata ante accidentes, intoxicaciones o descompensaciones, todos los días del año.',
    precio: 'Desde $30.000'
  },
  {
    icono: '✂️',
    titulo: 'Peluquería',
    descripcion: 'Baño, corte y cuidado estético adaptado a cada raza, con productos hipoalergénicos.',
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
    <h2 className="text-center text-primary mb-4">Nuestros Servicios</h2>
    <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
      {SERVICIOS.map((servicio) => (
        <div key={servicio.titulo} className="col">
          <div className="card h-100 shadow-sm text-center p-3">
            <div className="icono-grande mb-2">{servicio.icono}</div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{servicio.titulo}</h5>
              <p className="card-text text-muted flex-grow-1">{servicio.descripcion}</p>
              <p className="fw-bold mb-3">{servicio.precio}</p>
              <Link to="/registro" className="btn btn-primary">Agendar este servicio</Link>
            </div>
          </div>
        </div>
      ))}
    </div>

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
