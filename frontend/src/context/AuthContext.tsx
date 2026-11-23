import React, { useState } from 'react';
import { AuthContext, type Usuario } from './useAuth';
import { API, CLAVE_TOKEN, ErrorApi, peticion } from '../services/api';

interface Cuenta extends Usuario {
  contrasena: string;
}

interface RespuestaAuth {
  token: string;
  usuario: Usuario;
}

const CLAVE_CUENTAS = 'cuentas';
const CLAVE_SESION = 'usuario';

const cuentasIniciales: Cuenta[] = [
  { nombre: 'Cliente San Marcos', correo: 'tengosueno@gmail.com', contrasena: '1234', rol: 'CLIENTE' },
  { nombre: 'Administrador', correo: 'admin@sanmarcos.cl', contrasena: '1234', rol: 'ADMIN' }
];

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cuentas, setCuentas] = useState<Cuenta[]>(() => leer(CLAVE_CUENTAS, cuentasIniciales));
  const [usuario, setUsuario] = useState<Usuario | null>(() => leer<Usuario | null>(CLAVE_SESION, null));
  const [token, setToken] = useState<string | null>(() => leer<string | null>(CLAVE_TOKEN, null));
  const [modalAbierto, setModalAbierto] = useState(false);

  const iniciarSesion = ({ nombre, correo, rol }: Usuario, nuevoToken: string | null) => {
    const sesion = { nombre, correo, rol };
    setUsuario(sesion);
    setToken(nuevoToken);
    guardar(CLAVE_SESION, sesion);
    guardar(CLAVE_TOKEN, nuevoToken);
    setModalAbierto(false);
  };

  const autenticar = async (ruta: string, datos: object) => {
    const respuesta = await peticion<RespuestaAuth>(`${API.auth}/${ruta}`, { method: 'POST', body: JSON.stringify(datos) });
    iniciarSesion(respuesta.usuario, respuesta.token);
  };

  const login = async (correo: string, contrasena: string) => {
    try {
      await autenticar('login', { correo, contrasena });
      return true;
    } catch (error) {
      if (error instanceof ErrorApi) return false;
      const cuenta = cuentas.find(c => c.correo === correo.trim().toLowerCase() && c.contrasena === contrasena);
      if (!cuenta) return false;
      iniciarSesion(cuenta, null);
      return true;
    }
  };

  const register = async (nombre: string, correo: string, contrasena: string) => {
    try {
      await autenticar('register', { nombre, correo, contrasena });
      return true;
    } catch (error) {
      if (error instanceof ErrorApi) return false;
      const correoNormalizado = correo.trim().toLowerCase();
      if (cuentas.some(c => c.correo === correoNormalizado)) return false;
      const nueva: Cuenta = { nombre: nombre.trim(), correo: correoNormalizado, contrasena, rol: 'CLIENTE' };
      const actualizadas = [...cuentas, nueva];
      setCuentas(actualizadas);
      guardar(CLAVE_CUENTAS, actualizadas);
      iniciarSesion(nueva, null);
      return true;
    }
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    guardar(CLAVE_SESION, null);
    guardar(CLAVE_TOKEN, null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        rol: usuario?.rol ?? null,
        token,
        login,
        register,
        logout,
        modalAbierto,
        abrirModal: () => setModalAbierto(true),
        cerrarModal: () => setModalAbierto(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
