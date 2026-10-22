import React from 'react';
import { Link } from 'react-router-dom';
import { EquipoMedico } from '../components/organisms/EquipoMedico';
import { TarjetasMascotas } from '../components/organisms/TarjetasMascotas';
import { petsRepository } from '../services/petsRepository';
import heroImage from '../assets/hero.png';

export const Inicio: React.FC = () => {
  const mascotasRecientes = petsRepository.getAll().slice(-3);

  return (
    <div>
      <div className="bg-light p-5 rounded-3 mb-4 text-center border">
        <img src={heroImage} alt="Veterinaria San Marcos" className="mb-4" style={{ maxHeight: 180 }} />
        <h1 className="display-4 fw-bold">Atención Veterinaria Integral</h1>
        <p className="lead">Cuidamos a tu mascota con la mejor tecnología y dedicación profesional.</p>
        <Link to="/registro" className="btn btn-primary btn-lg mt-3">Agendar Cita Ahora</Link>
      </div>

      <section className="my-5">
        <h2 className="text-center mb-4">Registros Recientes</h2>
        <TarjetasMascotas mascotas={mascotasRecientes} />
      </section>

      <EquipoMedico />
    </div>
  );
};
