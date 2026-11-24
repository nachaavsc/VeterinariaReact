import { describe, it, expect, afterEach, vi } from 'vitest';
import { filtrarMascotas, historialApi, mascotasApi, mensajesApi, serviciosApi } from './repositorios';
import type { Mascota, MascotaInput } from '../types';

const responderCon = (estado: number, cuerpo?: unknown) =>
  vi.mocked(fetch).mockResolvedValueOnce(new Response(cuerpo === undefined ? null : JSON.stringify(cuerpo), { status: estado }));

const ultimaLlamada = () => {
  const [url, opciones] = vi.mocked(fetch).mock.calls.at(-1) ?? [];
  return { url, metodo: opciones?.method ?? 'GET', cuerpo: opciones?.body ? JSON.parse(opciones.body as string) : undefined };
};

const nuevaMascota: MascotaInput = {
  nombre: 'Rocky',
  especie: 'Perro',
  raza: 'Pug',
  dueno: 'Ana López',
  emailDueno: 'ana@mail.com',
  estado: 'Pendiente',
  descripcion: ''
};

const mascotas: Mascota[] = [
  { id: 1, nombre: 'Max', especie: 'Perro', raza: 'Golden', dueno: 'Juan Pérez', emailDueno: 'juan@mail.com', estado: 'Atendido' },
  { id: 2, nombre: 'Luna', especie: 'Gato', raza: 'Siamés', dueno: 'María Silva', emailDueno: 'maria@mail.com', estado: 'Pendiente' }
];

describe('repositorios', () => {
  afterEach(() => {
    vi.mocked(fetch).mockClear();
  });

  it('mascotasApi.crear envía POST con los campos exactos del backend y devuelve la mascota persistida', async () => {
    responderCon(201, { id: 10, ...nuevaMascota });

    const creada = await mascotasApi.crear(nuevaMascota);

    expect(ultimaLlamada()).toEqual({ url: 'http://localhost:8082/api/mascotas', metodo: 'POST', cuerpo: nuevaMascota });
    expect(creada).toEqual({ id: 10, ...nuevaMascota });
  });

  it('mascotasApi.crear propaga el error de validación del backend', async () => {
    responderCon(400, { error: 'La raza es obligatoria' });

    await expect(mascotasApi.crear({ ...nuevaMascota, raza: '' })).rejects.toThrow('La raza es obligatoria');
  });

  it('mascotasApi.actualizar envía PUT al id indicado', async () => {
    responderCon(200, { id: 2, ...nuevaMascota });

    await mascotasApi.actualizar(2, nuevaMascota);

    expect(ultimaLlamada()).toMatchObject({ url: 'http://localhost:8082/api/mascotas/2', metodo: 'PUT' });
  });

  it('mascotasApi.eliminar envía DELETE y resuelve con 204', async () => {
    responderCon(204);

    await expect(mascotasApi.eliminar(3)).resolves.toBeUndefined();

    expect(ultimaLlamada()).toMatchObject({ url: 'http://localhost:8082/api/mascotas/3', metodo: 'DELETE' });
  });

  it('usa los endpoints específicos de servicios, historial y mensajes', async () => {
    responderCon(200, []);
    await serviciosApi.listarActivos();
    expect(ultimaLlamada().url).toBe('http://localhost:8083/api/servicios/activos');

    responderCon(200, []);
    await historialApi.listarPorMascota(5);
    expect(ultimaLlamada().url).toBe('http://localhost:8086/api/historial/mascota/5');

    responderCon(200, { id: 7, leido: true });
    await mensajesApi.marcarLeido(7);
    expect(ultimaLlamada()).toMatchObject({ url: 'http://localhost:8085/api/mensajes/7/leido', metodo: 'PUT' });
  });

  it('filtrarMascotas busca por nombre, dueño o especie sin distinguir mayúsculas', () => {
    expect(filtrarMascotas(mascotas, 'luna').map((m) => m.id)).toEqual([2]);
    expect(filtrarMascotas(mascotas, 'PÉREZ').map((m) => m.id)).toEqual([1]);
    expect(filtrarMascotas(mascotas, 'gato').map((m) => m.id)).toEqual([2]);
    expect(filtrarMascotas(mascotas, '  ')).toHaveLength(2);
  });
});
