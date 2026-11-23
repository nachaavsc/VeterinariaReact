import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Contacto } from './Contacto';

const completarFormulario = () => {
  fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'María González' } });
  fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'maria@test.com' } });
  fireEvent.change(screen.getByLabelText('Teléfono de Contacto'), { target: { value: '9123abc4567' } });
  fireEvent.change(screen.getByLabelText('Asunto / Consulta'), { target: { value: 'Consulta por vacunas' } });
};

describe('Contacto', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(fetch).mockClear();
  });

  it('envía el mensaje al microservicio Mensajeria y muestra la confirmación', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(JSON.stringify({ id: 1 }), { status: 200 }));
    render(<Contacto />);

    completarFormulario();
    fireEvent.click(screen.getByRole('button', { name: 'Enviar Mensaje' }));

    expect(await screen.findByText('¡Gracias por contactarnos! Te responderemos a la brevedad.')).toBeInTheDocument();
    const [url, opciones] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe('http://localhost:8085/api/mensajes');
    expect(opciones?.method).toBe('POST');
    expect(JSON.parse(opciones?.body as string)).toEqual({
      nombreRemitente: 'María González',
      email: 'maria@test.com',
      telefono: '91234567',
      asunto: 'Consulta desde el sitio web',
      contenido: 'Consulta por vacunas'
    });
    expect(screen.getByLabelText('Nombre Completo')).toHaveValue('');
  });

  it('muestra un error si el microservicio no está disponible', async () => {
    render(<Contacto />);

    completarFormulario();
    fireEvent.click(screen.getByRole('button', { name: 'Enviar Mensaje' }));

    expect(await screen.findByText('No pudimos enviar tu mensaje. Intenta nuevamente más tarde.')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre Completo')).toHaveValue('María González');
  });
});
