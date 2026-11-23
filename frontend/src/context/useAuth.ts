import { createContext, useContext } from 'react';

export type Rol = 'ADMIN' | 'CLIENTE';

export interface Usuario {
  nombre: string;
  correo: string;
  rol: Rol;
}

export interface AuthContextValue {
  usuario: Usuario | null;
  rol: Rol | null;
  login: (correo: string, contrasena: string) => boolean;
  register: (nombre: string, correo: string, contrasena: string) => boolean;
  logout: () => void;
  modalAbierto: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return contexto;
};
