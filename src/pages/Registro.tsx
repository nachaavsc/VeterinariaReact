import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormularioMascotas } from '../components/organisms/FormularioMascotas';
import { petsRepository } from '../services/petsRepository';
import type { MascotaInput } from '../types';

export const Registro: React.FC = () => {
  const navigate = useNavigate();
  const [exito, setExito] = useState(false);

  const manejarGuardar = (datos: MascotaInput) => {
    petsRepository.create(datos);
    setExito(true);
    setTimeout(() => navigate('/admin'), 1200);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2 className="mb-4 text-center">Registro de Nueva Mascota / Cita</h2>
        {exito && <div className="alert alert-success">¡Registro guardado con éxito! Redirigiendo...</div>}
        <FormularioMascotas alGuardar={manejarGuardar} />
      </div>
    </div>
  );
};
