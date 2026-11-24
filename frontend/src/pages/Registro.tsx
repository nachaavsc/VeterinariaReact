import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FormularioMascotas } from '../components/organisms/FormularioMascotas';
import { Retroalimentacion } from '../components/molecules/Retroalimentacion';
import { Alerta } from '../components/atoms/Alerta';
import { mascotasApi } from '../services/repositorios';
import { useAccion } from '../hooks/useAccion';
import type { MascotaInput } from '../types';

export const Registro: React.FC = () => {
  const { enviando, exito, error, ejecutar, limpiarExito, limpiarError } = useAccion();
  const [versionFormulario, setVersionFormulario] = useState(0);
  const [parametros] = useSearchParams();
  const especialista = parametros.get('especialista') ?? '';
  const datosIniciales: MascotaInput | undefined = especialista
    ? { nombre: '', especie: 'Perro', raza: '', dueno: '', emailDueno: '', estado: 'Pendiente', descripcion: `Solicitud de hora con ${especialista}.` }
    : undefined;

  const manejarGuardar = async (datos: MascotaInput) => {
    const guardado = await ejecutar(
      () => mascotasApi.crear(datos),
      (mascota) => `¡Registro guardado con éxito! ${mascota.nombre} ya está registrada en el sistema.`
    );
    if (guardado) setVersionFormulario((v) => v + 1);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2 className="mb-4 text-center text-primary">Registro de Nueva Mascota / Cita</h2>
        {especialista && <Alerta tipo="info" mensaje={`Estás agendando una hora con ${especialista}.`} />}
        <Retroalimentacion exito={exito} error={error} alCerrarExito={limpiarExito} alCerrarError={limpiarError} />
        {exito && (
          <p className="text-center">
            <Link to="/mascotas-clientes">Ver el directorio de mascotas</Link>
          </p>
        )}
        <FormularioMascotas key={`${especialista}-${versionFormulario}`} datosIniciales={datosIniciales} alGuardar={manejarGuardar} enviando={enviando} />
      </div>
    </div>
  );
};
