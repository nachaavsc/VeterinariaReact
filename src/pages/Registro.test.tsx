import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Registro } from './Registro';
import { petsRepository } from '../services/petsRepository';
import { Boton } from '../components/atoms/Boton';
import { Input } from '../components/atoms/Input';
import { Estado } from '../components/atoms/Estado';
import { BarraBusqueda } from '../components/molecules/BarraBusqueda';

const renderizarRegistro = () =>
  render(
    <MemoryRouter>
      <Registro />
    </MemoryRouter>
  );

const completarCamposValidos = () => {
  fireEvent.change(screen.getByLabelText('Nombre de la Mascota'), { target: { value: 'Firulais' } });
  fireEvent.change(screen.getByLabelText('Raza'), { target: { value: 'Labrador' } });
  fireEvent.change(screen.getByLabelText('Nombre del Dueño'), { target: { value: 'Juan Pérez' } });
  fireEvent.change(screen.getByLabelText('Email del Dueño'), { target: { value: 'juan@test.com' } });
};

describe('Registro', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
    petsRepository.reiniciar();
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

  it('muestra mensajes de error al enviar el formulario vacío', () => {
    renderizarRegistro();

    fireEvent.click(screen.getByRole('button', { name: 'Guardar Registro' }));

    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('La raza es obligatoria')).toBeInTheDocument();
    expect(screen.getByText('El nombre del dueño es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El email es obligatorio')).toBeInTheDocument();
  });

  it('oculta los mensajes de error cuando los campos son válidos', () => {
    renderizarRegistro();

    fireEvent.click(screen.getByRole('button', { name: 'Guardar Registro' }));
    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();

    completarCamposValidos();
    fireEvent.click(screen.getByRole('button', { name: 'Guardar Registro' }));

    expect(screen.queryByText('El nombre es obligatorio')).not.toBeInTheDocument();
    expect(screen.queryByText('La raza es obligatoria')).not.toBeInTheDocument();
    expect(screen.queryByText('El nombre del dueño es obligatorio')).not.toBeInTheDocument();
    expect(screen.queryByText('El email es obligatorio')).not.toBeInTheDocument();
  });

  it('llama a petsRepository.crear y muestra el mensaje de éxito al enviar un formulario válido', () => {
    vi.useFakeTimers();
    const espiaCrear = vi.spyOn(petsRepository, 'crear');
    renderizarRegistro();

    completarCamposValidos();
    fireEvent.click(screen.getByRole('button', { name: 'Guardar Registro' }));

    expect(espiaCrear).toHaveBeenCalledTimes(1);
    expect(espiaCrear).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre: 'Firulais',
        raza: 'Labrador',
        dueno: 'Juan Pérez',
        emailDueno: 'juan@test.com'
      })
    );
    expect(screen.getByText('¡Registro guardado con éxito! Redirigiendo...')).toBeInTheDocument();
  });

  it('muestra mensaje de error si el formato del correo electrónico es inválido', async () => {
    renderizarRegistro();

    const inputEmail = screen.getByLabelText('Email del Dueño');
    fireEvent.change(inputEmail, { target: { value: 'correo-invalido' } });

    fireEvent.click(screen.getByRole('button', { name: 'Guardar Registro' }));

    expect(screen.getByText(/email|correo|válido/i)).toBeInTheDocument();
  });

  it('aplica las clases CSS de Bootstrap recibidas por props', () => {
    render(<Boton variante="danger" texto="Eliminar Mascota" />);
    
    const boton = screen.getByRole('button', { name: 'Eliminar Mascota' });
    expect(boton).toHaveClass('btn-danger');
  });

  it('renderiza el badge con el estilo correcto según la prop estado', () => {
    render(<Estado estado="Atendido" />);
    const badge = screen.getByText('Atendido');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-success');
  });

  it('ejecuta la función alCambiar al escribir', () => {
    const handleCambio = vi.fn();
    render(<BarraBusqueda valor="" alCambiar={handleCambio} />);
    
    const input = screen.getByPlaceholderText(/buscar/i);
    fireEvent.change(input, { target: { value: 'Golden' } });

    expect(handleCambio).toHaveBeenCalledTimes(1);
    expect(handleCambio).toHaveBeenCalledWith('Golden');
  });

  it('obtiene el listado completo de mascotas registradas', () => {
    const lista = petsRepository.obtenerTodas();
    expect(lista.length).toBeGreaterThan(0);
  });

  it('obtiene los detalles de una mascota específica por su ID', () => {
    const lista = petsRepository.obtenerTodas();
    const mascotaExistente = lista[0];
    
    const encontrada = petsRepository.obtenerPorId(mascotaExistente.id);
    expect(encontrada).toBeDefined();
    expect(encontrada?.nombre).toBe(mascotaExistente.nombre);
  });

  it('crea e inserta un nuevo registro de mascota correctamente', () => {
    const nueva = petsRepository.crear({
      nombre: 'Rocky',
      especie: 'Perro',
      raza: 'Boxer',
      dueno: 'Carlos',
      emailDueno: 'carlos@test.com',
      estado: 'Pendiente'
    });

    expect(nueva.id).toBeDefined();
    const verificacion = petsRepository.obtenerPorId(nueva.id);
    expect(verificacion?.nombre).toBe('Rocky');
  });

  it('actualiza los datos o el estado de una mascota existente', () => {
    const lista = petsRepository.obtenerTodas();
    const idAActualizar = lista[0].id;

    const actualizada = petsRepository.actualizar(idAActualizar, { estado: 'Atendido' });
    expect(actualizada?.estado).toBe('Atendido');
  });

  it(' elimina una mascota del registro por su ID', () => {
    const lista = petsRepository.obtenerTodas();
    const idAEliminar = lista[0].id;

    const resultado = petsRepository.eliminar(idAEliminar);
    expect(resultado).toBe(true);
    expect(petsRepository.obtenerPorId(idAEliminar)).toBeUndefined();
  });

  it('filtra la lista de mascotas según coincidencia de texto', () => {
    const resultados = petsRepository.buscar('Max');
    expect(resultados.length).toBeGreaterThan(0);
    expect(resultados[0].nombre).toContain('Max');
  });


});
