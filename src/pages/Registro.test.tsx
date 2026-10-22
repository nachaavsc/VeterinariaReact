import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Registro } from './Registro';
import { petsRepository } from '../services/petsRepository';

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
});
