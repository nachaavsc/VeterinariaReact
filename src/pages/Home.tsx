import React from 'react';
import { Link } from 'react-router-dom';
import { TarjetasMascotas } from '../components/organisms/TarjetasMascotas';
import { petsRepository } from '../services/petsRepository';
import hero1 from '../assets/hero1.png';
import hero2 from '../assets/hero2.png';
import hero3 from '../assets/hero3.png';

const SLIDES = [
  {
    titulo: 'Atención Veterinaria Integral',
    texto: 'Cuidamos a tu mascota con la mejor tecnología y dedicación profesional.',
    imagen: hero1
  },
  {
    titulo: 'Equipo Médico Especializado',
    texto: 'Profesionales certificados en cirugía, dermatología y medicina felina.',
    imagen: hero2
  },
  {
    titulo: 'Agenda tu Cita en Minutos',
    texto: 'Reserva tu hora online y lleva el control de la salud de tu mascota.',
    imagen: hero3
  }
];

export const Home: React.FC = () => {
  const mascotasRecientes = petsRepository.obtenerTodas().slice(-3);

  return (
    <div>
      <div
        id="carruselInicio"
        className="carousel slide mb-5 rounded-3 shadow-sm overflow-hidden"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-indicators">
          {SLIDES.map((_, indice) => (
            <button
              key={indice}
              type="button"
              data-bs-target="#carruselInicio"
              data-bs-slide-to={indice}
              className={indice === 0 ? 'active' : ''}
              aria-current={indice === 0 ? 'true' : undefined}
              aria-label={`Slide ${indice + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {SLIDES.map((slide, indice) => (
            <div key={slide.titulo} className={`carousel-item ${indice === 0 ? 'active' : ''}`}>
              <img src={slide.imagen} className="d-block w-100" style={{ height: 420, objectFit: 'cover' }} alt={slide.titulo} />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
                <h2>{slide.titulo}</h2>
                <p>{slide.texto}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carruselInicio" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carruselInicio" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Bienvenido a Veterinaria San Marcos</h1>
        <p className="lead">Tu mascota en las mejores manos, siempre.</p>
        <Link to="/registro" className="btn btn-primary btn-lg mt-2">Agendar Cita Ahora</Link>
      </div>

      <section className="my-5">
        <h2 className="text-center mb-4">Registros Recientes</h2>
        <TarjetasMascotas mascotas={mascotasRecientes} />
      </section>
    </div>
  );
};
