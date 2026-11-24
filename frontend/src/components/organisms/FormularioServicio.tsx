import React, { useState } from 'react';
import type { ServicioInput } from '../../types';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { Input } from '../atoms/Input';
import { Boton } from '../atoms/Boton';

interface FormularioServicioProps {
  datosIniciales?: ServicioInput;
  alGuardar: (datos: ServicioInput) => void;
  alCancelar: () => void;
  enviando?: boolean;
}

const aTexto = (valor?: number | null) => (valor ? String(valor) : '');

export const FormularioServicio: React.FC<FormularioServicioProps> = ({ datosIniciales, alGuardar, alCancelar, enviando = false }) => {
  const [campos, setCampos] = useState({
    nombre: datosIniciales?.nombre ?? '',
    categoria: datosIniciales?.categoria ?? '',
    descripcion: datosIniciales?.descripcion ?? '',
    precio: aTexto(datosIniciales?.precio),
    precioMaximo: aTexto(datosIniciales?.precioMaximo),
    icono: datosIniciales?.icono ?? 'bi-heart-pulse',
    duracion: datosIniciales?.duracion ?? '',
    modalidad: datosIniciales?.modalidad ?? '',
    incluye: datosIniciales?.incluye ?? ''
  });
  const [activo, setActivo] = useState(datosIniciales?.activo ?? true);
  const [errores, setErrores] = useState<Record<string, string>>({});

  const cambiar = (campo: keyof typeof campos) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCampos({ ...campos, [campo]: e.target.value });

  const validar = () => {
    const nuevos: Record<string, string> = {};
    const precio = Number(campos.precio);
    const precioMaximo = Number(campos.precioMaximo);
    if (!campos.nombre.trim()) nuevos.nombre = 'El nombre del servicio es obligatorio';
    if (!Number.isInteger(precio) || precio <= 0) nuevos.precio = 'El precio del servicio debe ser mayor a 0';
    if (campos.precioMaximo && (!Number.isInteger(precioMaximo) || precioMaximo <= 0)) {
      nuevos.precioMaximo = 'El precio máximo debe ser mayor a 0';
    } else if (campos.precioMaximo && precioMaximo < precio) {
      nuevos.precioMaximo = 'El precio máximo no puede ser menor al precio base';
    }
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;
    alGuardar({
      nombre: campos.nombre.trim(),
      categoria: campos.categoria.trim(),
      descripcion: campos.descripcion.trim(),
      precio: Number(campos.precio),
      precioMaximo: campos.precioMaximo ? Number(campos.precioMaximo) : null,
      icono: campos.icono.trim(),
      duracion: campos.duracion.trim(),
      modalidad: campos.modalidad.trim(),
      incluye: campos.incluye.trim(),
      activo
    });
  };

  return (
    <form onSubmit={enviar} className="card p-4 shadow-sm mb-4" noValidate>
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario label="Nombre del servicio" htmlFor="servicioNombre" error={errores.nombre}>
            <Input id="servicioNombre" maxLength={100} value={campos.nombre} onChange={cambiar('nombre')} tieneError={!!errores.nombre} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Categoría" htmlFor="servicioCategoria">
            <Input id="servicioCategoria" maxLength={100} value={campos.categoria} onChange={cambiar('categoria')} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Precio base (CLP)" htmlFor="servicioPrecio" error={errores.precio}>
            <Input id="servicioPrecio" type="number" min={1} value={campos.precio} onChange={cambiar('precio')} tieneError={!!errores.precio} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Precio máximo (opcional)" htmlFor="servicioPrecioMaximo" error={errores.precioMaximo}>
            <Input id="servicioPrecioMaximo" type="number" min={1} value={campos.precioMaximo} onChange={cambiar('precioMaximo')} tieneError={!!errores.precioMaximo} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Duración" htmlFor="servicioDuracion">
            <Input id="servicioDuracion" maxLength={100} value={campos.duracion} onChange={cambiar('duracion')} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Modalidad" htmlFor="servicioModalidad">
            <Input id="servicioModalidad" maxLength={100} value={campos.modalidad} onChange={cambiar('modalidad')} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Incluye" htmlFor="servicioIncluye">
            <Input id="servicioIncluye" maxLength={255} value={campos.incluye} onChange={cambiar('incluye')} />
          </CampoFormulario>
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Icono (Bootstrap Icons)" htmlFor="servicioIcono">
            <Input id="servicioIcono" maxLength={50} value={campos.icono} onChange={cambiar('icono')} />
          </CampoFormulario>
        </div>
      </div>
      <CampoFormulario label="Descripción" htmlFor="servicioDescripcion">
        <textarea id="servicioDescripcion" className="form-control" rows={2} maxLength={255} value={campos.descripcion} onChange={cambiar('descripcion')} />
      </CampoFormulario>
      <div className="form-check mb-3">
        <input id="servicioActivo" type="checkbox" className="form-check-input" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
        <label htmlFor="servicioActivo" className="form-check-label">Visible en la página de servicios</label>
      </div>
      <div className="d-flex gap-2 justify-content-end">
        <Boton type="button" texto="Cancelar" variante="secondary" onClick={alCancelar} disabled={enviando} />
        <Boton type="submit" texto={enviando ? 'Guardando...' : 'Guardar Servicio'} disabled={enviando} />
      </div>
    </form>
  );
};
