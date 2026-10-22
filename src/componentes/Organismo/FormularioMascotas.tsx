import React, { useState } from 'react';
import { MascotaEntrada, EstadoMascota } from '../../services/tipos';
import { CampoFormulario } from '../Moleculas/CampoFormulario';
import { Input } from '../Atomos/Input';
import { Select } from '../Atomos/Select';
import { Boton } from '../Atomos/Boton';

interface FormularioMascotasProps {
  datosIniciales?: MascotaEntrada;
  alGuardar: (datos: MascotaEntrada) => void;
  alCancelar?: () => void;
}

export const FormularioMascotas: React.FC<FormularioMascotasProps> = ({
  datosIniciales,
  alGuardar,
  alCancelar
}) => {
  const [nombre, setNombre] = useState(datosIniciales?.nombre || '');
  const [especie, setEspecie] = useState(datosIniciales?.especie || 'Perro');
  const [raza, setRaza] = useState(datosIniciales?.raza || '');
  const [dueno, setDueno] = useState(datosIniciales?.dueno || '');
  const [emailDueno, setEmailDueno] = useState(datosIniciales?.emailDueno || '');
  const [estado, setEstado] = useState<EstadoMascota>(datosIniciales?.estado || 'Pendiente');
  const [descripcion, setDescripcion] = useState(datosIniciales?.descripcion || '');

  const [errores, setErrores] = useState<Record<string, string>>({});

  const validar = (): boolean => {
    const nuevosErrores: Record<string, string> = {};
    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!raza.trim()) nuevosErrores.raza = 'La raza es obligatoria';
    if (!dueno.trim()) nuevosErrores.dueno = 'El nombre del dueño es obligatorio';
    if (!emailDueno.trim()) {
      nuevosErrores.emailDueno = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(emailDueno)) {
      nuevosErrores.emailDueno = 'El formato del email no es válido';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validar()) {
      alGuardar({ nombre, especie, raza, dueno, emailDueno, estado, descripcion });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <CampoFormulario label="Nombre de la Mascota" error={errores.nombre}>
        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} tieneError={!!errores.nombre} />
      </CampoFormulario>

      <CampoFormulario label="Especie">
        <Select
          opciones={[
            { label: 'Perro', value: 'Perro' },
            { label: 'Gato', value: 'Gato' },
            { label: 'Conejo', value: 'Conejo' },
            { label: 'Ave', value: 'Ave' }
          ]}
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
        />
      </CampoFormulario>

      <CampoFormulario label="Raza" error={errores.raza}>
        <Input value={raza} onChange={(e) => setRaza(e.target.value)} tieneError={!!errores.raza} />
      </CampoFormulario>

      <CampoFormulario label="Nombre del Dueño" error={errores.dueno}>
        <Input value={dueno} onChange={(e) => setDueno(e.target.value)} tieneError={!!errores.dueno} />
      </CampoFormulario>

      <CampoFormulario label="Email del Dueño" error={errores.emailDueno}>
        <Input type="email" value={emailDueno} onChange={(e) => setEmailDueno(e.target.value)} tieneError={!!errores.emailDueno} />
      </CampoFormulario>

      <CampoFormulario label="Estado de Atención">
        <Select
          opciones={[
            { label: 'Pendiente', value: 'Pendiente' },
            { label: 'En Tratamiento', value: 'En Tratamiento' },
            { label: 'Atendido', value: 'Atendido' }
          ]}
          value={estado}
          onChange={(e) => setEstado(e.target.value as EstadoMascota)}
        />
      </CampoFormulario>

      <CampoFormulario label="Observaciones / Descripción">
        <textarea
          className="form-control"
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </CampoFormulario>

      <div className="d-flex gap-2 justify-content-end mt-3">
        {alCancelar && <Boton type="button" texto="Cancelar" variante="secondary" onClick={alCancelar} />}
        <Boton type="submit" texto="Guardar Registro" variante="primary" />
      </div>
    </form>
  );
};