import React, { useState } from 'react';
import type { MascotaInput, EstadoAtencion } from '../../types';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Boton } from '../atoms/Boton';
import { PATRON_EMAIL } from '../../services/api';

interface FormularioMascotasProps {
  datosIniciales?: MascotaInput;
  alGuardar: (datos: MascotaInput) => void;
  alCancelar?: () => void;
  enviando?: boolean;
}

export const FormularioMascotas: React.FC<FormularioMascotasProps> = ({
  datosIniciales,
  alGuardar,
  alCancelar,
  enviando = false
}) => {
  const [nombre, setNombre] = useState(datosIniciales?.nombre || '');
  const [especie, setEspecie] = useState(datosIniciales?.especie || 'Perro');
  const [raza, setRaza] = useState(datosIniciales?.raza || '');
  const [dueno, setDueno] = useState(datosIniciales?.dueno || '');
  const [emailDueno, setEmailDueno] = useState(datosIniciales?.emailDueno || '');
  const [estado, setEstado] = useState<EstadoAtencion>(datosIniciales?.estado || 'Pendiente');
  const [descripcion, setDescripcion] = useState(datosIniciales?.descripcion || '');

  const [errores, setErrores] = useState<Record<string, string>>({});

  const validar = (): boolean => {
    const nuevosErrores: Record<string, string> = {};
    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!raza.trim()) nuevosErrores.raza = 'La raza es obligatoria';
    if (!dueno.trim()) nuevosErrores.dueno = 'El nombre del dueño es obligatorio';
    if (!emailDueno.trim()) {
      nuevosErrores.emailDueno = 'El email es obligatorio';
    } else if (!PATRON_EMAIL.test(emailDueno.trim())) {
      nuevosErrores.emailDueno = 'El formato del email no es válido';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validar()) {
      alGuardar({
        nombre: nombre.trim(),
        especie,
        raza: raza.trim(),
        dueno: dueno.trim(),
        emailDueno: emailDueno.trim(),
        estado,
        descripcion: descripcion.trim(),
        imagen: datosIniciales?.imagen
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm" noValidate>
      <CampoFormulario label="Nombre de la Mascota" htmlFor="nombre" error={errores.nombre}>
        <Input id="nombre" maxLength={100} value={nombre} onChange={(e) => setNombre(e.target.value)} tieneError={!!errores.nombre} />
      </CampoFormulario>

      <CampoFormulario label="Especie" htmlFor="especie">
        <Select
          id="especie"
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

      <CampoFormulario label="Raza" htmlFor="raza" error={errores.raza}>
        <Input id="raza" maxLength={100} value={raza} onChange={(e) => setRaza(e.target.value)} tieneError={!!errores.raza} />
      </CampoFormulario>

      <CampoFormulario label="Nombre del Dueño" htmlFor="dueno" error={errores.dueno}>
        <Input id="dueno" maxLength={100} value={dueno} onChange={(e) => setDueno(e.target.value)} tieneError={!!errores.dueno} />
      </CampoFormulario>

      <CampoFormulario label="Email del Dueño" htmlFor="emailDueno" error={errores.emailDueno}>
        <Input id="emailDueno" type="email" value={emailDueno} onChange={(e) => setEmailDueno(e.target.value)} tieneError={!!errores.emailDueno} />
      </CampoFormulario>

      <CampoFormulario label="Estado de Atención" htmlFor="estado">
        <Select
          id="estado"
          opciones={[
            { label: 'Pendiente', value: 'Pendiente' },
            { label: 'En Tratamiento', value: 'En Tratamiento' },
            { label: 'Atendido', value: 'Atendido' }
          ]}
          value={estado}
          onChange={(e) => setEstado(e.target.value as EstadoAtencion)}
        />
      </CampoFormulario>

      <CampoFormulario label="Observaciones / Descripción" htmlFor="descripcion">
        <textarea
          id="descripcion"
          className="form-control"
          rows={3}
          maxLength={500}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </CampoFormulario>

      <div className="d-flex gap-2 justify-content-end mt-3">
        {alCancelar && <Boton type="button" texto="Cancelar" variante="secondary" onClick={alCancelar} disabled={enviando} />}
        <Boton type="submit" texto={enviando ? 'Guardando...' : 'Guardar Registro'} variante="primary" disabled={enviando} />
      </div>
    </form>
  );
};
