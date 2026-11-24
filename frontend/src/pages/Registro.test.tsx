import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Registro } from './Registro';
import { Boton } from '../components/atoms/Boton';
import { Estado } from '../components/atoms/Estado';
import { BarraBusqueda } from '../components/molecules/BarraBusqueda';

const renderizarRegistro = () =>
  render(
    <MemoryRouter initialEntries={['/registro']}>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<p>Pantalla de administración</p>} />
      </Routes>
    </MemoryRouter>
  );

const completarCamposValidos = () => {
  fireEvent.change(screen.getByLabelText('Nombre de la Mascota'), { target: { value: 'Firulais' } });
  fireEvent.change(screen.getByLabelText('Raza'), { target: { value: 'Labrador' } });
  fireEvent.change(screen.getByLabelText('Nombre del Dueño'), { target: { value: 'Juan Pérez' } });
  fireEvent.change(screen.getByLabelText('Email del Dueño'), { target: { value: 'juan@test.com' } });
};

const responderCon = (estado: number, cuerpo: unknown) =>
  vi.mocked(fetch).mockResolvedValueOnce(new Response(JSON.stringify(cuerpo), { status: estado }));

describe('Registro', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(fetch).mockClear();
  });

  it('renderiza el formulario con los campos vacíos', () => {
    renderizarRegistro();

    expect(screen.getByLabelText('Nombre de la Mascota')).toHaveValue('');
    expect(screen.getByLabelText('Raza')).toHaveValue('');
    expect(screen.getByLabelText('Nombre del Dueño')).toHaveValue('');
    expect(screen.getByLabelText('Email del Dueño')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Guardar Registro' })).toBeInTheDocument();
  });

  it('actualiza el valor de los inputs al escribir', () => {
    renderizarRegistro();

    const inputNombre = screen.getByLabelText('Nombre de la Mascota');
    fireEvent.change(inputNombre, { target: { value: 'Firulais' } });

    expect(inputNombre).toHaveValue('Firulais');
  });

  it('muestra mensajes de error al enviar el formulario vacío sin llamar al backend', () => {
    renderizarRegistro();

    fireEvent.click(screen.getByRole('button', { name: 'Guardar Registro' }));

    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('La raza es obligatoria')).toBeInTheDocument();
    expect(screen.getByText('El nombre del dueño es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El email es obligatorio')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('muestra mensaje de error si el formato del correo electrónico es inválido', () => {
    renderizarRegistro();

    fireEvent.change(screen.getByLabelText('Email del Dueño'), { target: { value: 'correo@invalido' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar Registro' }));

    expect(screen.getByText('El formato del email no es válido')).toBeInTheDocument();
  });

  it('guarda la mascota en el backend y permanece en la vista con mensaje de éxito', async () => {
    responderCon(201, { id: 15, nombre: 'Firulais', especie: 'Perro', raza: 'Labrador', dueno: 'Juan Pérez', emailDueno: 'juan@test.com', estado: 'Pendiente' });
    renderizarRegistro();

    completarCamposValidos();
    fireEvent.click(screen.getByRole('button', { name: 'Guardar Registro' }));

    expect(await screen.findByText('¡Registro guardado con éxito! Firulais ya está registrada en el sistema.')).toBeInTheDocument();
    const [url, opciones] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe('http://localhost:8082/api/mascotas');
    expect(opciones?.method).toBe('POST');
    expect(JSON.parse(opciones?.body as string)).toEqual({
      nombre: 'Firulais',
      especie: 'Perro',
      raza: 'Labrador',
      dueno: 'Juan Pérez',
      emailDueno: 'juan@test.com',
      estado: 'Pendiente',
      descripcion: ''
    });
    expect(screen.queryByText('Pantalla de administración')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Nombre de la Mascota')).toHaveValue('');
  });

  it('muestra el error del backend y conserva los datos ingresados', async () => {
    responderCon(400, { error: 'Ingrese un correo electrónico válido' });
    renderizarRegistro();

    completarCamposValidos();
    fireEvent.click(screen.getByRole('button', { name: 'Guardar Registro' }));

    expect(await screen.findByText('Ingrese un correo electrónico válido')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre de la Mascota')).toHaveValue('Firulais');
    expect(screen.queryByText('Pantalla de administración')).not.toBeInTheDocument();
  });

  it('muestra un aviso claro si el servidor no está disponible', async () => {
    renderizarRegistro();

    completarCamposValidos();
    fireEvent.click(screen.getByRole('button', { name: 'Guardar Registro' }));

    expect(await screen.findByText('No se pudo conectar con el servidor. Verifica que los servicios estén iniciados.')).toBeInTheDocument();
    expect(screen.getByLabelText('Raza')).toHaveValue('Labrador');
  });

  it('precarga la solicitud cuando se llega desde un especialista del equipo', () => {
    render(
      <MemoryRouter initialEntries={['/registro?especialista=Dra.%20Ana%20Rodr%C3%ADguez']}>
        <Routes>
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Estás agendando una hora con Dra. Ana Rodríguez.')).toBeInTheDocument();
    expect(screen.getByLabelText('Observaciones / Descripción')).toHaveValue('Solicitud de hora con Dra. Ana Rodríguez.');
  });

  it('aplica las clases CSS de Bootstrap recibidas por props', () => {
    render(<Boton variante="danger" texto="Eliminar Mascota" />);

    expect(screen.getByRole('button', { name: 'Eliminar Mascota' })).toHaveClass('btn-danger');
  });

  it('renderiza el badge con el estilo correcto según la prop estado', () => {
    render(<Estado estado="Atendido" />);

    expect(screen.getByText('Atendido')).toHaveClass('bg-success');
  });

  it('ejecuta la función alCambiar al escribir', () => {
    const handleCambio = vi.fn();
    render(<BarraBusqueda valor="" alCambiar={handleCambio} />);

    fireEvent.change(screen.getByPlaceholderText(/buscar/i), { target: { value: 'Golden' } });

    expect(handleCambio).toHaveBeenCalledTimes(1);
    expect(handleCambio).toHaveBeenCalledWith('Golden');
  });
});
