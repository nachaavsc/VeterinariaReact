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

const ESTADISTICAS = [
  { numero: '+5.000', etiqueta: 'Mascotas Atendidas' },
  { numero: '10+', etiqueta: 'Especialistas Certificados' },
  { numero: '5+', etiqueta: 'Años de Experiencia' },
  { numero: '24/7', etiqueta: 'Atención de Urgencias' }
];

const HORARIOS = [
  { dia: 'Lunes a Viernes', horario: '09:00 - 20:00 hrs' },
  { dia: 'Sábado', horario: '09:00 - 14:00 hrs' },
  { dia: 'Domingo y Festivos', horario: 'Solo urgencias' }
];

const TESTIMONIOS = [
  {
    nombre: 'Javiera Soto',
    mascota: 'Dueña de Thor',
    comentario: 'Excelente atención, el equipo fue muy claro con el tratamiento de mi perro y siempre estuvieron disponibles.',
    estrellas: '⭐⭐⭐⭐⭐'
  },
  {
    nombre: 'Matías Pérez',
    mascota: 'Dueño de Luna',
    comentario: 'Agendé la cita online en minutos y la atención de urgencia un domingo nos salvó. Muy recomendadoooos.',
    estrellas: '⭐⭐⭐⭐⭐'
  },
  {
    nombre: 'Camila Rojas',
    mascota: 'Dueña de Max',
    comentario: 'Profesionales, cercanos y con instalaciones muy limpias. Mi gato ya no les tiene miedo a las visitas.',
    estrellas: '⭐⭐⭐⭐'
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
        <h1 className="display-5 fw-bold text-primary">Bienvenido a Veterinaria San Marcos</h1>
        <p className="lead">Tu mascota en las mejores manos, siempre.</p>
        <Link to="/registro" className="btn btn-primary btn-lg mt-2">Agendar Cita Ahora</Link>
      </div>

      <section className="row align-items-center g-4 my-5">
        <div className="col-md-6">
          <h2 className="text-primary mb-3">Sobre Nosotros</h2>
          <p>
            Desde hace muchos años, Veterinaria San Marcos acompaña a las familias en
            cada etapa de la vida de sus mascotas. Combinamos tecnología de diagnóstico de punta con un
            trato humano y cercano, porque entendemos que cada paciente es parte de una familia.
          </p>
          <p>
            Nuestro compromiso es simple: tratar a cada animal con la misma dedicación y respeto con la
            que cuidaríamos a los nuestros.
          </p>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-4 panel-verde-claro border-0">
            <div className="icono-grande mb-2">🐾</div>
            <h5>Nuestra Misión</h5>
            <p className="mb-0">
              Brindar atención veterinaria integral, oportuna y empática, acompañando a cada dueño con
              información clara y cercana durante todo el proceso.
            </p>
          </div>
        </div>
      </section>

      <section className="my-5">
        <h2 className="text-center text-primary mb-4">Veterinaria San Marcos en Números</h2>
        <div className="row row-cols-2 row-cols-md-4 g-4 text-center">
          {ESTADISTICAS.map((estadistica) => (
            <div key={estadistica.etiqueta} className="col">
              <div className="card h-100 shadow-sm p-3">
                <h3 className="text-primary fw-bold mb-1">{estadistica.numero}</h3>
                <p className="text-muted mb-0">{estadistica.etiqueta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-5">
        <div className="card shadow-sm p-4">
          <h2 className="text-primary mb-3">Horarios de Atención y Ubicación</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <ul className="list-unstyled mb-0">
                {HORARIOS.map((item) => (
                  <li key={item.dia} className="d-flex justify-content-between border-bottom py-2">
                    <span className="fw-bold">{item.dia}</span>
                    <span>{item.horario}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-between">
              <p className="mb-3">📍 Av. San Marcos 1234, Rancagua</p>
              <Link to="/registro" className="btn btn-primary align-self-start">Agendar Cita</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="my-5">
        <h2 className="text-center text-primary mb-4">Testimonios de Clientes</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {TESTIMONIOS.map((testimonio) => (
            <div key={testimonio.nombre} className="col">
              <div className="card h-100 shadow-sm p-4">
                <div className="mb-2">{testimonio.estrellas}</div>
                <p className="flex-grow-1">"{testimonio.comentario}"</p>
                <p className="fw-bold mb-0">{testimonio.nombre}</p>
                <p className="text-muted mb-0">{testimonio.mascota}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-5">
        <h2 className="text-center text-primary mb-4">Registros Recientes</h2>
        <TarjetasMascotas mascotas={mascotasRecientes} />
      </section>
    </div>
  );
};
