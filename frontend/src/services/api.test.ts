import { describe, it, expect, afterEach, vi } from 'vitest';
import { ErrorApi, peticion, registrarAlNoAutorizado } from './api';

const responderCon = (estado: number, cuerpo?: unknown) =>
  vi.mocked(fetch).mockResolvedValueOnce(new Response(cuerpo === undefined ? null : JSON.stringify(cuerpo), { status: estado }));

describe('api', () => {
  afterEach(() => {
    localStorage.clear();
    vi.mocked(fetch).mockClear();
  });

  it('envía el header Authorization con el token JWT guardado', async () => {
    localStorage.setItem('token', JSON.stringify('jwt-123'));
    responderCon(200, []);

    await peticion('http://localhost:8082/api/mascotas');

    const [, opciones] = vi.mocked(fetch).mock.calls[0];
    expect(opciones?.headers).toMatchObject({ Authorization: 'Bearer jwt-123' });
  });

  it('no envía Authorization cuando no hay sesión', async () => {
    responderCon(200, []);

    await peticion('http://localhost:8082/api/mascotas');

    const [, opciones] = vi.mocked(fetch).mock.calls[0];
    expect(opciones?.headers).not.toHaveProperty('Authorization');
  });

  it('lanza ErrorApi con el mensaje y los campos del backend cuando la respuesta no es exitosa', async () => {
    responderCon(400, { error: 'Ingrese un correo electrónico válido', campos: { emailDueno: 'Ingrese un correo electrónico válido' } });

    const error = await peticion('http://localhost:8082/api/mascotas', { method: 'POST' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ErrorApi);
    expect(error).toMatchObject({ estado: 400, message: 'Ingrese un correo electrónico válido', campos: { emailDueno: 'Ingrese un correo electrónico válido' } });
  });

  it('convierte un fallo de red en ErrorApi con un mensaje legible', async () => {
    await expect(peticion('http://localhost:8082/api/mascotas')).rejects.toEqual(
      new ErrorApi(0, 'No se pudo conectar con el servidor. Verifica que los servicios estén iniciados.')
    );
  });

  it('usa un mensaje por defecto cuando el backend responde sin cuerpo', async () => {
    responderCon(404);

    await expect(peticion('http://localhost:8082/api/mascotas/99')).rejects.toEqual(new ErrorApi(404, 'El registro solicitado no existe'));
  });

  it('notifica la sesión expirada solo cuando un request con token recibe 401', async () => {
    const manejador = vi.fn();
    const desregistrar = registrarAlNoAutorizado(manejador);

    responderCon(401, { error: 'Token JWT inválido o expirado' });
    await peticion('http://localhost:8082/api/mascotas').catch(() => undefined);
    expect(manejador).not.toHaveBeenCalled();

    localStorage.setItem('token', JSON.stringify('jwt-vencido'));
    responderCon(401, { error: 'Token JWT inválido o expirado' });
    await peticion('http://localhost:8082/api/mascotas').catch(() => undefined);
    expect(manejador).toHaveBeenCalledTimes(1);

    desregistrar();
  });

  it('no notifica sesión expirada ante errores de validación', async () => {
    const manejador = vi.fn();
    const desregistrar = registrarAlNoAutorizado(manejador);
    localStorage.setItem('token', JSON.stringify('jwt-123'));
    responderCon(400, { error: 'La raza es obligatoria' });

    await peticion('http://localhost:8082/api/mascotas', { method: 'POST' }).catch(() => undefined);

    expect(manejador).not.toHaveBeenCalled();
    desregistrar();
  });
});
