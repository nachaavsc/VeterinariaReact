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
  token: string | null;
  login: (correo: string, contrasena: string) => Promise<void>;
  register: (nombre: string, correo: string, contrasena: string) => Promise<void>;
  logout: () => void;
  modalAbierto: boolean;
  aviso: string;
  abrirModal: (aviso?: string) => void;
  cerrarModal: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return contexto;
};
