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

export const Novedades: React.FC = () => {
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-success">📰 Novedades y Noticias</h1>
        <p className="lead text-muted">
          Mantente al día con las últimas novedades y eventos de Veterinaria San Marcos.
        </p>
      </div>

      <div className="row g-4">
        {listaNovedades.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={item.imagen}
                className="card-img-top"
                alt={item.titulo}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-success">{item.categoria}</span>
                  <small className="text-muted">{item.fecha}</small>
                </div>
                <h5 className="card-title fw-bold">{item.titulo}</h5>
                <p className="card-text text-secondary flex-grow-1">
                  {item.descripcion}
                </p>
                <button
                  className="btn btn-outline-success btn-sm mt-3 w-100"
                  onClick={() => setNoticiaSeleccionada(item)}
                >
                  Leer más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Informativo */}
      {noticiaSeleccionada && (
        <div className="modal show d-block tab-index='-1'" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
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