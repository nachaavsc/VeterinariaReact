import React, { useState } from 'react';
import { AuthContext, type Usuario } from './useAuth';

interface Cuenta extends Usuario {
  contrasena: string;
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
  const [modalAbierto, setModalAbierto] = useState(false);

  const iniciarSesion = ({ nombre, correo, rol }: Cuenta) => {
    const sesion = { nombre, correo, rol };
    setUsuario(sesion);
    guardar(CLAVE_SESION, sesion);
    setModalAbierto(false);
  };

  const login = (correo: string, contrasena: string) => {
    const cuenta = cuentas.find(c => c.correo === correo.trim().toLowerCase() && c.contrasena === contrasena);
    if (!cuenta) return false;
    iniciarSesion(cuenta);
    return true;
  };

  const register = (nombre: string, correo: string, contrasena: string) => {
    const correoNormalizado = correo.trim().toLowerCase();
    if (cuentas.some(c => c.correo === correoNormalizado)) return false;
    const nueva: Cuenta = { nombre: nombre.trim(), correo: correoNormalizado, contrasena, rol: 'CLIENTE' };
    const actualizadas = [...cuentas, nueva];
    setCuentas(actualizadas);
    guardar(CLAVE_CUENTAS, actualizadas);
    iniciarSesion(nueva);
    return true;
  };

  const logout = () => {
    setUsuario(null);
    guardar(CLAVE_SESION, null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        rol: usuario?.rol ?? null,
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
