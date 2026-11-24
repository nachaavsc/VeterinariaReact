import React, { useState } from 'react';
import type { VeterinarioInput } from '../../types';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { Input } from '../atoms/Input';
import { Boton } from '../atoms/Boton';
import { PATRON_EMAIL } from '../../services/api';

interface FormularioVeterinarioProps {
  datosIniciales?: VeterinarioInput;
  alGuardar: (datos: VeterinarioInput) => void;
  alCancelar: () => void;
  enviando?: boolean;
}

export const FormularioVeterinario: React.FC<FormularioVeterinarioProps> = ({ datosIniciales, alGuardar, alCancelar, enviando = false }) => {
  const [campos, setCampos] = useState({
    nombre: datosIniciales?.nombre ?? '',
    especialidad: datosIniciales?.especialidad ?? '',
    email: datosIniciales?.email ?? '',
    experiencia: datosIniciales?.experiencia ?? '',
    foto: datosIniciales?.foto ?? '',
    descripcion: datosIniciales?.descripcion ?? ''
  });
  const [activo, setActivo] = useState(datosIniciales?.activo ?? true);
  const [errores, setErrores] = useState<Record<string, string>>({});

  const cambiar = (campo: keyof typeof campos) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCampos({ ...campos, [campo]: e.target.value });

  const validar = () => {
    const nuevos: Record<string, string> = {};
    if (!campos.nombre.trim()) nuevos.nombre = 'El nombre es obligatorio';
    if (!campos.especialidad.trim()) nuevos.especialidad = 'La especialidad es obligatoria';
    if (!campos.email.trim()) nuevos.email = 'El email es obligatorio';
    else if (!PATRON_EMAIL.test(campos.email.trim())) nuevos.email = 'Ingrese un correo electrónico válido';
    if (!campos.foto.trim()) nuevos.foto = 'La foto es obligatoria';
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;
    alGuardar({
      nombre: campos.nombre.trim(),
      especialidad: campos.especialidad.trim(),
      email: campos.email.trim(),
      experiencia: campos.experiencia.trim(),
      foto: campos.foto.trim(),
      descripcion: campos.descripcion.trim(),
      activo
    });
  };

  return (
    <form onSubmit={enviar} className="card p-4 shadow-sm mb-4" noValidate>
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario label="Nombre" htmlFor="vetNombre" error={errores.nombre}>
            <Input id="vetNombre" maxLength={100} value={campos.nombre} onChange={cambiar('nombre')} tieneError={!!errores.nombre} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Especialidad" htmlFor="vetEspecialidad" error={errores.especialidad}>
            <Input id="vetEspecialidad" maxLength={100} value={campos.especialidad} onChange={cambiar('especialidad')} tieneError={!!errores.especialidad} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Email" htmlFor="vetEmail" error={errores.email}>
            <Input id="vetEmail" type="email" value={campos.email} onChange={cambiar('email')} tieneError={!!errores.email} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Experiencia" htmlFor="vetExperiencia">
            <Input id="vetExperiencia" maxLength={100} placeholder="Ej: 5 años de experiencia" value={campos.experiencia} onChange={cambiar('experiencia')} />
          </CampoFormulario>
        </div>
      </div>
      <CampoFormulario label="Ruta o URL de la foto" htmlFor="vetFoto" error={errores.foto}>
        <Input id="vetFoto" maxLength={255} placeholder="/equipo/foto.jpg" value={campos.foto} onChange={cambiar('foto')} tieneError={!!errores.foto} />
      </CampoFormulario>
      <CampoFormulario label="Reseña" htmlFor="vetDescripcion">
        <textarea id="vetDescripcion" className="form-control" rows={2} maxLength={500} value={campos.descripcion} onChange={cambiar('descripcion')} />
      </CampoFormulario>
      <div className="form-check mb-3">
        <input id="vetActivo" type="checkbox" className="form-check-input" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
        <label htmlFor="vetActivo" className="form-check-label">Visible en la página del equipo</label>
      </div>
      <div className="d-flex gap-2 justify-content-end">
        <Boton type="button" texto="Cancelar" variante="secondary" onClick={alCancelar} disabled={enviando} />
        <Boton type="submit" texto={enviando ? 'Guardando...' : 'Guardar Veterinario'} disabled={enviando} />
      </div>
    </form>
  );
};
