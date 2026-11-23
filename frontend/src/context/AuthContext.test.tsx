import { describe, it, expect, afterEach } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';
import React from 'react';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';

const envoltorio = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;

const renderizarAuth = () => renderHook(() => useAuth(), { wrapper: envoltorio });

describe('AuthContext', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('inicia sin sesión', () => {
    const { result } = renderizarAuth();

    expect(result.current.usuario).toBeNull();
    expect(result.current.rol).toBeNull();
  });

  it('inicia sesión con el cliente predeterminado y la guarda en localStorage', () => {
    const { result } = renderizarAuth();

    act(() => {
      expect(result.current.login('tengosueno@gmail.com', '1234')).toBe(true);
    });

    expect(result.current.rol).toBe('CLIENTE');
    expect(JSON.parse(localStorage.getItem('usuario') ?? 'null')).toMatchObject({ correo: 'tengosueno@gmail.com', rol: 'CLIENTE' });
  });

  it('inicia sesión con el administrador predeterminado', () => {
    const { result } = renderizarAuth();

    act(() => {
      result.current.login('admin@sanmarcos.cl', '1234');
    });

    expect(result.current.rol).toBe('ADMIN');
  });

  it('rechaza credenciales incorrectas', () => {
    const { result } = renderizarAuth();

    act(() => {
      expect(result.current.login('admin@sanmarcos.cl', 'mala')).toBe(false);
    });

    expect(result.current.usuario).toBeNull();
  });

  it('registra un usuario nuevo como CLIENTE e inicia su sesión', () => {
    const { result } = renderizarAuth();

    act(() => {
      expect(result.current.register('Ana', 'ana@test.com', 'clave')).toBe(true);
    });

    expect(result.current.usuario).toEqual({ nombre: 'Ana', correo: 'ana@test.com', rol: 'CLIENTE' });
  });

  it('no permite registrar un correo existente', () => {
    const { result } = renderizarAuth();

    act(() => {
      expect(result.current.register('Otro', 'admin@sanmarcos.cl', 'x')).toBe(false);
    });

    expect(result.current.usuario).toBeNull();
  });

  it('cierra la sesión y la elimina de localStorage', () => {
    const { result } = renderizarAuth();

    act(() => {
      result.current.login('tengosueno@gmail.com', '1234');
    });
    act(() => {
      result.current.logout();
    });

    expect(result.current.rol).toBeNull();
    expect(localStorage.getItem('usuario')).toBeNull();
  });
});
