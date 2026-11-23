import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';

type Pestana = 'login' | 'registro';

export const AuthModal: React.FC = () => {
  const { modalAbierto, cerrarModal, login, register } = useAuth();
  const [pestana, setPestana] = useState<Pestana>('login');
  const [correo, setCorreo] = useState('tengosueno@gmail.com');
  const [contrasena, setContrasena] = useState('1234');
  const [nuevo, setNuevo] = useState({ nombre: '', correo: '', contrasena: '' });
  const [error, setError] = useState('');

  if (!modalAbierto) return null;

  const cambiarPestana = (destino: Pestana) => {
    setPestana(destino);
    setError('');
  };

  const enviarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await login(correo, contrasena))) setError('Correo o contraseña incorrectos');
  };

  const enviarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevo.nombre.trim() || !nuevo.correo.trim() || !nuevo.contrasena) {
      setError('Completa todos los campos');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevo.correo.trim())) {
      setError('Ingresa un correo válido');
      return;
    }
    if (!(await register(nuevo.nombre, nuevo.correo, nuevo.contrasena))) {
      setError('Ya existe una cuenta con ese correo');
      return;
    }
    setNuevo({ nombre: '', correo: '', contrasena: '' });
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="authModalTitulo">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header navbar-veterinaria text-white">
              <h5 className="modal-title" id="authModalTitulo">
                <i className="bi bi-person-circle me-2"></i>Acceso Veterinaria San Marcos
              </h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={cerrarModal}></button>
            </div>
            <div className="modal-body">
              <ul className="nav nav-pills nav-fill mb-3">
                <li className="nav-item">
                  <button type="button" className={`nav-link ${pestana === 'login' ? 'active' : ''}`} onClick={() => cambiarPestana('login')}>
                    Iniciar Sesión
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className={`nav-link ${pestana === 'registro' ? 'active' : ''}`} onClick={() => cambiarPestana('registro')}>
                    Registrarse
                  </button>
                </li>
              </ul>

              {error && <div className="alert alert-danger py-2">{error}</div>}

              {pestana === 'login' ? (
                <form onSubmit={enviarLogin} noValidate>
                  <div className="mb-3">
                    <label htmlFor="loginCorreo" className="form-label">Correo</label>
                    <input id="loginCorreo" type="email" className="form-control" value={correo} onChange={e => setCorreo(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginContrasena" className="form-label">Contraseña</label>
                    <input id="loginContrasena" type="password" className="form-control" value={contrasena} onChange={e => setContrasena(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                  <button
                    type="button"
                    className="btn btn-link btn-sm w-100 mt-2 text-muted"
                    onClick={() => {
                      setCorreo('admin@sanmarcos.cl');
                      setContrasena('1234');
                    }}
                  >
                    Usar credenciales de administrador
                  </button>
                </form>
              ) : (
                <form onSubmit={enviarRegistro} noValidate>
                  <div className="mb-3">
                    <label htmlFor="registroNombre" className="form-label">Nombre</label>
                    <input id="registroNombre" className="form-control" value={nuevo.nombre} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registroCorreo" className="form-label">Correo</label>
                    <input id="registroCorreo" type="email" className="form-control" value={nuevo.correo} onChange={e => setNuevo({ ...nuevo, correo: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registroContrasena" className="form-label">Contraseña</label>
                    <input id="registroContrasena" type="password" className="form-control" value={nuevo.contrasena} onChange={e => setNuevo({ ...nuevo, contrasena: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Crear cuenta</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={cerrarModal}></div>
    </>
  );
};
