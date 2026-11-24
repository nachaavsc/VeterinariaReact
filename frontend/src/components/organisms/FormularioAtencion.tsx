import React, { useState } from 'react';
import type { AtencionInput, EstadoAtencion, Veterinario } from '../../types';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Boton } from '../atoms/Boton';

interface FormularioAtencionProps {
  mascotaId: number;
  veterinarios: Veterinario[];
  alGuardar: (datos: AtencionInput) => void;
  enviando?: boolean;
}

const hoy = () => new Date().toISOString().slice(0, 10);

export const FormularioAtencion: React.FC<FormularioAtencionProps> = ({ mascotaId, veterinarios, alGuardar, enviando = false }) => {
  const [fecha, setFecha] = useState(hoy);
  const [motivo, setMotivo] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const [estado, setEstado] = useState<EstadoAtencion>('Pendiente');
  const [observaciones, setObservaciones] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevos: Record<string, string> = {};
    if (!fecha) nuevos.fecha = 'La fecha es obligatoria';
    if (!motivo.trim()) nuevos.motivo = 'El motivo de la atención es obligatorio';
    if (!veterinario) nuevos.veterinario = 'El veterinario es obligatorio';
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;
    alGuardar({ mascotaId, fecha, motivo: motivo.trim(), veterinario, estado, observaciones: observaciones.trim() });
  };

  return (
    <form onSubmit={enviar} className="border rounded p-3 mb-4 bg-light" noValidate>
      <h5 className="mb-3">Registrar nueva atención</h5>
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario label="Fecha" htmlFor="atencionFecha" error={errores.fecha}>
            <Input id="atencionFecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} tieneError={!!errores.fecha} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Estado" htmlFor="atencionEstado">
            <Select
              id="atencionEstado"
              opciones={[
                { label: 'Pendiente', value: 'Pendiente' },
                { label: 'En Tratamiento', value: 'En Tratamiento' },
                { label: 'Atendido', value: 'Atendido' }
              ]}
              value={estado}
              onChange={(e) => setEstado(e.target.value as EstadoAtencion)}
            />
          </CampoFormulario>
        </div>
      </div>
      <CampoFormulario label="Motivo" htmlFor="atencionMotivo" error={errores.motivo}>
        <Input id="atencionMotivo" maxLength={255} value={motivo} onChange={(e) => setMotivo(e.target.value)} tieneError={!!errores.motivo} />
      </CampoFormulario>
      <CampoFormulario label="Veterinario" htmlFor="atencionVeterinario" error={errores.veterinario}>
        <Select
          id="atencionVeterinario"
          opciones={[{ label: 'Selecciona un veterinario', value: '' }, ...veterinarios.map((v) => ({ label: `${v.nombre} · ${v.especialidad}`, value: v.nombre }))]}
          value={veterinario}
          onChange={(e) => setVeterinario(e.target.value)}
          tieneError={!!errores.veterinario}
        />
      </CampoFormulario>
      <CampoFormulario label="Observaciones" htmlFor="atencionObservaciones">
        <textarea id="atencionObservaciones" className="form-control" rows={2} maxLength={1000} value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
      </CampoFormulario>
      <div className="text-end">
        <Boton type="submit" texto={enviando ? 'Guardando...' : 'Guardar Atención'} disabled={enviando} />
      </div>
    </form>
  );
};
