import { describe, it, expect, afterEach, vi } from 'vitest';
import { ErrorApi, peticion } from './api';
import { petsRepository } from './petsRepository';

const responderCon = (estado: number, cuerpo?: unknown) =>
  vi.mocked(fetch).mockResolvedValueOnce(new Response(cuerpo === undefined ? null : JSON.stringify(cuerpo), { status: estado }));

describe('api', () => {
  afterEach(() => {
    localStorage.clear();
    vi.mocked(fetch).mockClear();
    petsRepository.reiniciar();
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

  it('lanza ErrorApi con el mensaje del backend cuando la respuesta no es exitosa', async () => {
    responderCon(403, { error: 'No tienes permisos para realizar esta operación' });

    await expect(peticion('http://localhost:8082/api/mascotas/1', { method: 'DELETE' })).rejects.toEqual(
      new ErrorApi(403, 'No tienes permisos para realizar esta operación')
    );
  });

  it('sincronizar reemplaza el caché local con las mascotas del microservicio', async () => {
    responderCon(200, [{ id: 10, nombre: 'Rocky', especie: 'Perro', raza: 'Boxer', dueno: 'Carlos', emailDueno: 'carlos@test.com', estado: 'Pendiente' }]);

    expect(await petsRepository.sincronizar()).toBe(true);

    expect(petsRepository.obtenerTodas()).toEqual([
      expect.objectContaining({ id: '10', nombre: 'Rocky' })
    ]);
  });

  it('sincronizar conserva los datos locales si el backend no responde', async () => {
    expect(await petsRepository.sincronizar()).toBe(false);

    expect(petsRepository.obtenerTodas()).toHaveLength(3);
  });

  it('eliminar quita la mascota localmente y envía DELETE al microservicio', () => {
    responderCon(204);

    expect(petsRepository.eliminar('1')).toBe(true);

    expect(petsRepository.obtenerPorId('1')).toBeUndefined();
    expect(fetch).toHaveBeenCalledWith('http://localhost:8082/api/mascotas/1', expect.objectContaining({ method: 'DELETE' }));
  });
});
