import React from 'react';
import { Link } from 'react-router-dom';
import { EquipoMedico } from '../components/Organismo/EquipoMedico';

export const Inicio: React.FC = () => (
  <div>
    <div className="bg-light p-5 rounded-3 mb-4 text-center border">
      <h1 className="display-4 fw-bold">Atención Veterinaria Integral</h1>
      <p className="lead">Cuidamos a tu mascota con la mejor tecnología y dedicación profesional.</p>
      <Link to="/registro" className="btn btn-primary btn-lg mt-3">Agendar Cita Ahora</Link>
    </div>
    <EquipoMedico />
  </div>
);