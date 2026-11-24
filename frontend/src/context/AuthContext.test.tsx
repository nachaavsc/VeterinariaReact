import { describe, it, expect, afterEach, vi } from 'vitest';
import { renderHook, act, cleanup, waitFor } from '@testing-library/react';
import React from 'react';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';
import { peticion } from '../services/api';

const envoltorio = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;

const renderizarAuth = () => renderHook(() => useAuth(), { wrapper: envoltorio });

const responderCon = (estado: number, cuerpo: unknown) =>
  vi.mocked(fetch).mockResolvedValueOnce(new Response(JSON.stringify(cuerpo), { status: estado }));

const crearJwt = (exp: number) => `cabecera.${btoa(JSON.stringify({ sub: 'cliente@mail.com', exp }))}.firma`;

const guardarSesion = (token: string) => {
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('usuario', JSON.stringify({ nombre: 'Cliente', correo: 'tengosueno@gmail.com', rol: 'CLIENTE' }));
};

describe('AuthContext', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.mocked(fetch).mockClear();
  });

  it('inicia sin sesión', () => {
    const { result } = renderizarAuth();

    expect(result.current.usuario).toBeNull();
    expect(result.current.rol).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('inicia sesión contra el microservicio Usuarios y guarda el token JWT', async () => {
    responderCon(200, { token: 'jwt-admin', usuario: { id: 1, nombre: 'Administrador', correo: 'admin@sanmarcos.cl', rol: 'ADMIN' } });
    const { result } = renderizarAuth();

    await act(() => result.current.login('admin@sanmarcos.cl', '1234'));

    expect(fetch).toHaveBeenCalledWith('http://localhost:8081/api/auth/login', expect.objectContaining({ method: 'POST' }));
    expect(result.current.rol).toBe('ADMIN');
    expect(result.current.token).toBe('jwt-admin');
    expect(JSON.parse(localStorage.getItem('token') ?? 'null')).toBe('jwt-admin');
    expect(JSON.parse(localStorage.getItem('usuario') ?? 'null')).toEqual({ nombre: 'Administrador', correo: 'admin@sanmarcos.cl', rol: 'ADMIN' });
  });

  it('rechaza credenciales incorrectas con el mensaje del backend', async () => {
    responderCon(401, { error: 'Correo o contraseña incorrectos' });
    const { result } = renderizarAuth();

    await act(async () => {
      await expect(result.current.login('tengosueno@gmail.com', 'mala')).rejects.toThrow('Correo o contraseña incorrectos');
    });

    expect(result.current.usuario).toBeNull();
  });

  it('no crea sesiones locales sin token cuando el backend no está disponible', async () => {
    const { result } = renderizarAuth();

    await act(async () => {
      await expect(result.current.login('tengosueno@gmail.com', '1234')).rejects.toThrow('No se pudo conectar con el servidor');
    });

    expect(result.current.usuario).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('registra un usuario nuevo en el backend como CLIENTE y guarda su token', async () => {
    responderCon(201, { token: 'jwt-ana', usuario: { id: 3, nombre: 'Ana', correo: 'ana@test.com', rol: 'CLIENTE' } });
    const { result } = renderizarAuth();

    await act(() => result.current.register('Ana', 'ana@test.com', 'clave'));

    expect(fetch).toHaveBeenCalledWith('http://localhost:8081/api/auth/register', expect.objectContaining({ method: 'POST' }));
    expect(result.current.usuario).toEqual({ nombre: 'Ana', correo: 'ana@test.com', rol: 'CLIENTE' });
    expect(result.current.token).toBe('jwt-ana');
  });

  it('no permite registrar un correo existente', async () => {
    responderCon(409, { error: 'Ya existe una cuenta con ese correo' });
    const { result } = renderizarAuth();

    await act(async () => {
      await expect(result.current.register('Otro', 'admin@sanmarcos.cl', 'clave')).rejects.toThrow('Ya existe una cuenta con ese correo');
    });

    expect(result.current.usuario).toBeNull();
  });

  it('restaura una sesión guardada con token vigente', () => {
    guardarSesion(crearJwt(Math.floor(Date.now() / 1000) + 3600));

    const { result } = renderizarAuth();

    expect(result.current.rol).toBe('CLIENTE');
  });

  it('descarta al iniciar una sesión guardada con token expirado', () => {
    guardarSesion(crearJwt(Math.floor(Date.now() / 1000) - 60));

    const { result } = renderizarAuth();

    expect(result.current.usuario).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('mantiene la sesión ante errores de validación del backend', async () => {
    guardarSesion(crearJwt(Math.floor(Date.now() / 1000) + 3600));
    const { result } = renderizarAuth();
    responderCon(400, { error: 'La raza es obligatoria' });

    await act(async () => {
      await peticion('http://localhost:8082/api/mascotas', { method: 'POST' }).catch(() => undefined);
    });

    expect(result.current.rol).toBe('CLIENTE');
    expect(result.current.modalAbierto).toBe(false);
  });

  it('abre el login sin cerrar la sesión cuando el backend rechaza el token', async () => {
    guardarSesion(crearJwt(Math.floor(Date.now() / 1000) + 3600));
    const { result } = renderizarAuth();
    responderCon(401, { error: 'Token JWT inválido o expirado' });

    await act(async () => {
      await peticion('http://localhost:8082/api/mascotas', { method: 'POST' }).catch(() => undefined);
    });

    await waitFor(() => expect(result.current.modalAbierto).toBe(true));
    expect(result.current.aviso).toMatch(/sesión expiró/);
    expect(result.current.rol).toBe('CLIENTE');
  });

  it('cierra la sesión y elimina el token de localStorage', async () => {
    responderCon(200, { token: 'jwt-cliente', usuario: { id: 2, nombre: 'Cliente', correo: 'tengosueno@gmail.com', rol: 'CLIENTE' } });
    const { result } = renderizarAuth();

    await act(() => result.current.login('tengosueno@gmail.com', '1234'));
    act(() => {
      result.current.logout();
    });

    expect(result.current.rol).toBeNull();
    expect(result.current.token).toBeNull();
    expect(localStorage.getItem('usuario')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
