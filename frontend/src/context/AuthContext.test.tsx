import { describe, it, expect, afterEach, vi } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';
import React from 'react';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';

const envoltorio = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;

const renderizarAuth = () => renderHook(() => useAuth(), { wrapper: envoltorio });

const responderCon = (estado: number, cuerpo: unknown) =>
  vi.mocked(fetch).mockResolvedValueOnce(new Response(JSON.stringify(cuerpo), { status: estado }));

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

    await act(async () => {
      expect(await result.current.login('admin@sanmarcos.cl', '1234')).toBe(true);
    });

    expect(fetch).toHaveBeenCalledWith('http://localhost:8081/api/auth/login', expect.objectContaining({ method: 'POST' }));
    expect(result.current.rol).toBe('ADMIN');
    expect(result.current.token).toBe('jwt-admin');
    expect(JSON.parse(localStorage.getItem('token') ?? 'null')).toBe('jwt-admin');
    expect(JSON.parse(localStorage.getItem('usuario') ?? 'null')).toEqual({ nombre: 'Administrador', correo: 'admin@sanmarcos.cl', rol: 'ADMIN' });
  });

  it('rechaza credenciales cuando el backend responde 401 sin usar el respaldo local', async () => {
    responderCon(401, { error: 'Correo o contraseña incorrectos' });
    const { result } = renderizarAuth();

    await act(async () => {
      expect(await result.current.login('tengosueno@gmail.com', '1234')).toBe(false);
    });

    expect(result.current.usuario).toBeNull();
  });

  it('usa las cuentas locales cuando el backend no está disponible', async () => {
    const { result } = renderizarAuth();

    await act(async () => {
      expect(await result.current.login('tengosueno@gmail.com', '1234')).toBe(true);
    });

    expect(result.current.rol).toBe('CLIENTE');
    expect(result.current.token).toBeNull();
  });

  it('rechaza credenciales incorrectas en el respaldo local', async () => {
    const { result } = renderizarAuth();

    await act(async () => {
      expect(await result.current.login('admin@sanmarcos.cl', 'mala')).toBe(false);
    });

    expect(result.current.usuario).toBeNull();
  });

  it('registra un usuario nuevo en el backend como CLIENTE y guarda su token', async () => {
    responderCon(201, { token: 'jwt-ana', usuario: { id: 3, nombre: 'Ana', correo: 'ana@test.com', rol: 'CLIENTE' } });
    const { result } = renderizarAuth();

    await act(async () => {
      expect(await result.current.register('Ana', 'ana@test.com', 'clave')).toBe(true);
    });

    expect(fetch).toHaveBeenCalledWith('http://localhost:8081/api/auth/register', expect.objectContaining({ method: 'POST' }));
    expect(result.current.usuario).toEqual({ nombre: 'Ana', correo: 'ana@test.com', rol: 'CLIENTE' });
    expect(result.current.token).toBe('jwt-ana');
  });

  it('registra como CLIENTE en el respaldo local cuando el backend no está disponible', async () => {
    const { result } = renderizarAuth();

    await act(async () => {
      expect(await result.current.register('Ana', 'ana@test.com', 'clave')).toBe(true);
    });

    expect(result.current.usuario).toEqual({ nombre: 'Ana', correo: 'ana@test.com', rol: 'CLIENTE' });
  });

  it('no permite registrar un correo existente', async () => {
    responderCon(409, { error: 'Ya existe una cuenta con ese correo' });
    const { result } = renderizarAuth();

    await act(async () => {
      expect(await result.current.register('Otro', 'admin@sanmarcos.cl', 'x')).toBe(false);
    });

    expect(result.current.usuario).toBeNull();
  });

  it('cierra la sesión y elimina el token de localStorage', async () => {
    responderCon(200, { token: 'jwt-cliente', usuario: { id: 2, nombre: 'Cliente', correo: 'tengosueno@gmail.com', rol: 'CLIENTE' } });
    const { result } = renderizarAuth();

    await act(async () => {
      await result.current.login('tengosueno@gmail.com', '1234');
    });
    act(() => {
      result.current.logout();
    });

    expect(result.current.rol).toBeNull();
    expect(result.current.token).toBeNull();
    expect(localStorage.getItem('usuario')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
