import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Boton } from './Boton';

describe('Boton', () => {
  afterEach(() => {
    cleanup();
  });

  it('renderiza el texto recibido', () => {
    render(<Boton texto="Guardar Registro" />);
    expect(screen.getByRole('button', { name: 'Guardar Registro' })).toBeInTheDocument();
  });

  it('ejecuta el evento onClick al hacer clic', () => {
    const alHacerClic = vi.fn();
    render(<Boton texto="Eliminar" onClick={alHacerClic} />);

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));

    expect(alHacerClic).toHaveBeenCalledTimes(1);
  });

  it('aplica la clase de Bootstrap según la variante', () => {
    render(<Boton texto="Cancelar" variante="danger" />);
    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveClass('btn-danger');
  });

  it('usa la variante primaria por defecto', () => {
    render(<Boton texto="Guardar" />);
    expect(screen.getByRole('button', { name: 'Guardar' })).toHaveClass('btn-primary');
  });

  it('respeta el estado deshabilitado', () => {
    render(<Boton texto="Enviar" disabled />);
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled();
  });
});
