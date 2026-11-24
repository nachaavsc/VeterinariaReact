import React, { useCallback, useEffect, useState } from 'react';
import { AuthContext, type Usuario } from './useAuth';
import { API, CLAVE_TOKEN, peticion, registrarAlNoAutorizado } from '../services/api';

interface RespuestaAuth {
  token: string;
  usuario: Usuario;
}

const CLAVE_SESION = 'usuario';
const AVISO_SESION_EXPIRADA = 'Tu sesión expiró. Inicia sesión nuevamente para continuar donde estabas.';

const leer = <T,>(clave: string, porDefecto: T): T => {
  try {
    const valor = localStorage.getItem(clave);
    return valor ? (JSON.parse(valor) as T) : porDefecto;
  } catch {
    return porDefecto;
  }
};

const guardar = (clave: string, valor: unknown) => {
  try {
    if (valor === null) localStorage.removeItem(clave);
    else localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    return;
  }
};

const tokenVigente = (token: string | null): token is string => {
  if (!token) return false;
  try {
    const carga = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(carga)) as { exp?: number };
    return typeof exp !== 'number' || exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const leerSesionInicial = () => {
  const token = leer<string | null>(CLAVE_TOKEN, null);
  const usuario = leer<Usuario | null>(CLAVE_SESION, null);
  if (tokenVigente(token) && usuario) return { token, usuario };
  guardar(CLAVE_TOKEN, null);
  guardar(CLAVE_SESION, null);
  return { token: null, usuario: null };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sesion, setSesion] = useState<{ token: string | null; usuario: Usuario | null }>(leerSesionInicial);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [aviso, setAviso] = useState('');

  const abrirModal = useCallback((mensaje = '') => {
    setAviso(mensaje);
    setModalAbierto(true);
  }, []);

  const cerrarModal = useCallback(() => {
    setAviso('');
    setModalAbierto(false);
  }, []);

  useEffect(() => registrarAlNoAutorizado(() => abrirModal(AVISO_SESION_EXPIRADA)), [abrirModal]);

  const autenticar = async (ruta: string, datos: object) => {
    const respuesta = await peticion<RespuestaAuth>(`${API.auth}/${ruta}`, { method: 'POST', body: JSON.stringify(datos) });
    const { nombre, correo, rol } = respuesta.usuario;
    const usuario = { nombre, correo, rol };
    guardar(CLAVE_SESION, usuario);
    guardar(CLAVE_TOKEN, respuesta.token);
    setSesion({ token: respuesta.token, usuario });
    cerrarModal();
  };

  const login = (correo: string, contrasena: string) =>
    autenticar('login', { correo: correo.trim(), contrasena });

  const register = (nombre: string, correo: string, contrasena: string) =>
    autenticar('register', { nombre: nombre.trim(), correo: correo.trim(), contrasena });

  const logout = () => {
    guardar(CLAVE_SESION, null);
    guardar(CLAVE_TOKEN, null);
    setSesion({ token: null, usuario: null });
  };

  return (
    <AuthContext.Provider
      value={{
        usuario: sesion.usuario,
        rol: sesion.usuario?.rol ?? null,
        token: sesion.token,
        login,
        register,
        logout,
        modalAbierto,
        aviso,
        abrirModal,
        cerrarModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
