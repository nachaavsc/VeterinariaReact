import React, { useState } from 'react';

interface Noticia {
  id: number;
  titulo: string;
  fecha: string;
  categoria: string;
  descripcion: string;
  contenidoCompleto: string;
  imagen: string;
}

const listaNovedades: Noticia[] = [
  {
    id: 1,
    titulo: 'Jornada de Vacunación Antirrábica Gratuita',
    fecha: '25 de Octubre, 2026',
    categoria: 'Campaña',
    descripcion: 'Acompáñanos este fin de semana en nuestra sede principal.',
    contenidoCompleto: 'Estaremos aplicando dosis de refuerzo para perros y gatos mayores de 3 meses. La atención será por orden de llegada desde las 09:00 hasta las 17:00 hrs. ¡Te esperamos!',
    imagen: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 2,
    titulo: 'Nuevo Servicio de Grooming y Estética Felina',
    fecha: '18 de Octubre, 2026',
    categoria: 'Servicios',
    descripcion: 'Contamos con nuevas instalaciones adaptadas para gatos.',
    contenidoCompleto: 'Diseñamos una zona libre de ruidos de perros y con aromaterapia relajante para que tu felino disfrute de su sesión de baño, cepillado y corte de uñas sin estrés. Reserva tu cita.',
    imagen: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 3,
    titulo: 'Consejos para Proteger a tu Mascota del Calor',
    fecha: '10 de Octubre, 2026',
    categoria: 'Salud',
    descripcion: 'Conoce los síntomas del golpe de calor e indicaciones médicas.',
    contenidoCompleto: 'Evita pasear a tu perro en las horas de mayor radiación solar 12:00 a 16:00 hrs. Mantén siempre agua fresca a su disposición y nunca lo dejes dentro del auto, ni siquiera con las ventanas entreabiertas.',
    imagen: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500'
  }
];

const CAMPANAS = [
  {
    dia: '06',
    mes: 'Dic',
    titulo: 'Jornada de Vacunación Óctuple y Antirrábica',
    detalle: 'Sede principal, de 09:00 a 14:00 hrs. Trae la cartilla de tu mascota.',
    icono: 'bi-shield-check'
  },
  {
    dia: '13',
    mes: 'Dic',
    titulo: 'Operativo de Desparasitación',
    detalle: 'Interna y externa para perros y gatos, con valor preferencial.',
    icono: 'bi-bug'
  },
  {
    dia: '20',
    mes: 'Dic',
    titulo: 'Control Dental Preventivo',
    detalle: 'Evaluación bucal sin costo con reserva previa.',
    icono: 'bi-stars'
  }
];

const PREGUNTAS = [
  {
    pregunta: '¿Qué debo llevar a la primera consulta?',
    respuesta: 'Trae la cartilla de vacunas, exámenes o recetas anteriores y una lista de los alimentos y medicamentos que recibe. Los perros deben venir con correa y los gatos en su transportadora.'
  },
  {
    pregunta: '¿Mi mascota debe estar en ayuno antes de exámenes o cirugía?',
    respuesta: 'Para exámenes de sangre se recomiendan 8 horas de ayuno de comida. Antes de una cirugía, el ayuno es de 8 a 12 horas de comida y 2 horas de agua, salvo indicación distinta del veterinario.'
  },
  {
    pregunta: '¿Cómo funciona la atención de urgencias?',
    respuesta: 'Atendemos urgencias las 24 horas sin hora previa. Al llegar se realiza una evaluación inicial y se prioriza según la gravedad del caso. Si puedes, llámanos en camino para preparar la atención.'
  }
];

export const Novedades: React.FC = () => {
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Novedades y Noticias</h1>
        <p className="lead text-muted">
          Mantente al día con las últimas novedades y eventos de Veterinaria San Marcos.
        </p>
      </div>

      <div className="row g-4">
        {listaNovedades.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card h-100 shadow-sm border-0 card-noticia">
              <img
                src={item.imagen}
                className="card-img-top"
                alt={item.titulo}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge rounded-pill badge-especialidad">
                    <i className="bi bi-tag me-1"></i>{item.categoria}
                  </span>
                  <small className="text-muted"><i className="bi bi-calendar3 me-1"></i>{item.fecha}</small>
                </div>
                <h5 className="card-title fw-bold">{item.titulo}</h5>
                <p className="card-text text-secondary flex-grow-1">
                  {item.descripcion}
                </p>
                <button
                  className="btn btn-outline-veterinaria btn-sm mt-3 w-100"
                  onClick={() => setNoticiaSeleccionada(item)}
                >
                  Leer más<i className="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-5 pt-3">
        <h2 className="h3 fw-bold text-primary mb-1">Campañas y Operativos del Mes</h2>
        <p className="text-muted mb-4">Fechas próximas en nuestra sede principal. Cupos limitados por jornada.</p>
        <div className="row row-cols-1 row-cols-md-3 g-3">
          {CAMPANAS.map((campana) => (
            <div key={campana.titulo} className="col">
              <div className="card h-100 border-0 shadow-sm card-campana">
                <div className="card-body d-flex gap-3 align-items-start">
                  <div className="fecha-campana text-center flex-shrink-0">
                    <span className="d-block fs-4 fw-bold lh-1">{campana.dia}</span>
                    <small className="text-uppercase">{campana.mes}</small>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1">
                      <i className={`bi ${campana.icono} text-primary me-2`}></i>{campana.titulo}
                    </h3>
                    <p className="small text-muted mb-0">{campana.detalle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 pt-3">
        <h2 className="h3 fw-bold text-primary mb-4">Preguntas Frecuentes</h2>
        <div className="accordion shadow-sm" id="accordionNovedades">
          {PREGUNTAS.map((item, indice) => (
            <div className="accordion-item" key={item.pregunta}>
              <h3 className="accordion-header">
                <button
                  className={`accordion-button fw-semibold ${indice === 0 ? '' : 'collapsed'}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#novedad-faq-${indice}`}
                  aria-expanded={indice === 0 ? 'true' : 'false'}
                  aria-controls={`novedad-faq-${indice}`}
                >
                  {item.pregunta}
                </button>
              </h3>
              <div
                id={`novedad-faq-${indice}`}
                className={`accordion-collapse collapse ${indice === 0 ? 'show' : ''}`}
                data-bs-parent="#accordionNovedades"
              >
                <div className="accordion-body text-muted">{item.respuesta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {noticiaSeleccionada && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-header-title fw-bold">{noticiaSeleccionada.titulo}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setNoticiaSeleccionada(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={noticiaSeleccionada.imagen}
                  alt={noticiaSeleccionada.titulo}
                  className="img-fluid rounded mb-3"
                />
                <p className="text-muted small">{noticiaSeleccionada.fecha} | {noticiaSeleccionada.categoria}</p>
                <p>{noticiaSeleccionada.contenidoCompleto}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setNoticiaSeleccionada(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};