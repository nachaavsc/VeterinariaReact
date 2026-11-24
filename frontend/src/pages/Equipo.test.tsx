import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Equipo } from './Equipo';
import type { Veterinario } from '../types';

const veterinarios: Veterinario[] = [
  { id: 1, nombre: 'Dra. Ana Rodríguez', especialidad: 'Medicina Interna', email: 'ana@sanmarcos.cl', foto: '/equipo/especialistaAna.jpg', experiencia: '12 años de experiencia', descripcion: 'Acompaña a pacientes crónicos.', activo: true },
  { id: 2, nombre: 'Dra. Lucía Fernández', especialidad: 'Dermatología', email: 'lucia@sanmarcos.cl', foto: '/equipo/especialistaLucia.jpg', experiencia: '7 años de experiencia', descripcion: 'Trata alergias y piel.', activo: true },
  { id: 3, nombre: 'Dr. Inactivo Pérez', especialidad: 'Cardiología', email: 'inactivo@sanmarcos.cl', foto: '/equipo/x.jpg', activo: false }
];

const renderizarEquipo = async () => {
  vi.mocked(fetch).mockResolvedValueOnce(new Response(JSON.stringify(veterinarios), { status: 200 }));
  render(
    <MemoryRouter>
      <Equipo />
    </MemoryRouter>
  );
  await screen.findByText('Dra. Ana Rodríguez');
};

describe('Equipo', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(fetch).mockClear();
  });

  it('muestra solo los especialistas activos con experiencia, correo y botón para agendar', async () => {
    await renderizarEquipo();

    expect(fetch).toHaveBeenCalledWith('http://localhost:8084/api/equipo', expect.anything());
    expect(screen.queryByText('Dr. Inactivo Pérez')).not.toBeInTheDocument();
    expect(screen.getByText('12 años de experiencia')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ana@sanmarcos.cl' })).toHaveAttribute('href', 'mailto:ana@sanmarcos.cl');
    expect(screen.getAllByRole('link', { name: 'Agendar con especialista' })[0]).toHaveAttribute(
      'href',
      '/registro?especialista=Dra.%20Ana%20Rodr%C3%ADguez'
    );
  });

  it('filtra en tiempo real por especialidad y vuelve a mostrar todos', async () => {
    await renderizarEquipo();

    expect(screen.queryByRole('button', { name: 'Cardiología' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Dermatología' }));

    expect(screen.getByRole('button', { name: 'Dermatología' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Dra. Lucía Fernández')).toBeInTheDocument();
    expect(screen.queryByText('Dra. Ana Rodríguez')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Todos' }));

    expect(screen.getByText('Dra. Ana Rodríguez')).toBeInTheDocument();
    expect(screen.getByText('Dra. Lucía Fernández')).toBeInTheDocument();
  });

  it('muestra los pilares del compromiso clínico y el llamado a la acción', async () => {
    await renderizarEquipo();

    expect(screen.getByText('Nuestro Compromiso Clínico')).toBeInTheDocument();
    ['Atención Integral', 'Diagnóstico Moderno', 'Seguimiento Continuo'].forEach((pilar) => expect(screen.getByText(pilar)).toBeInTheDocument());
    expect(screen.getByRole('link', { name: 'Agendar hora' })).toHaveAttribute('href', '/registro');
    expect(screen.getByRole('link', { name: 'Contactar' })).toHaveAttribute('href', '/contacto');
  });
});
