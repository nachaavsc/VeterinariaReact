import React, { useState } from 'react';
import { API, ErrorApi, peticion } from '../services/api';

export const Contacto: React.FC = () => {
  const [enviado, setEnviado] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contenido, setContenido] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefono(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    try {
      await peticion(API.mensajes, {
        method: 'POST',
        body: JSON.stringify({ nombreRemitente: nombre, email, telefono, asunto: 'Consulta desde el sitio web', contenido })
      });
      setNombre('');
      setEmail('');
      setTelefono('');
      setContenido('');
      setEnviado(true);
      setTimeout(() => setEnviado(false), 4000);
    } catch (err) {
      setError(err instanceof ErrorApi ? err.message : 'No pudimos enviar tu mensaje. Intenta nuevamente más tarde.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container py-2">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100 p-4">
            <h3 className="fw-bold text-success mb-3"> Ubicación e Información</h3>

            <div className="mb-2">
              <h6 className="fw-bold text-dark mb-0"> Dirección:</h6>
              <p className="text-muted mb-0">Av. San Marcos 1234, Rancagua</p>
            </div>

            <div className="mb-2">
              <h6 className="fw-bold text-dark mb-0"> Teléfono Urgencias 24/7:</h6>
              <p className="text-muted mb-0">+56 9 1234 5678 / +56 2 6514 7288</p>
            </div>

            <div className="mb-2">
              <h6 className="fw-bold text-dark mb-0"> Correo Electrónico:</h6>
              <p className="text-muted mb-0">contacto@veterinariasanmarcos.cl</p>
            </div>

            <div className="mb-3">
              <h6 className="fw-bold text-dark mb-0"> Horarios de Atención:</h6>
              <p className="text-muted mb-0">Lunes a Sábado de 09:00 a 20:00 hrs.</p>
            </div>

            <div className="mt-auto pt-2">
              <h6 className="fw-bold text-dark mb-2"> Encuéntranos en el mapa:</h6>
              <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.180292534571!2d-70.7410!3d-34.1701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDEwJzEyLjQiUyA3MMKwNDQnMjcuNiJX!5e0!3m2!1ses!2scl!4v1680000000000!5m2!1ses!2scl"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación Veterinaria San Marcos"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4">
            <h3 className="fw-bold text-success mb-3"> Envíanos un mensaje</h3>

            {enviado && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                ¡Gracias por contactarnos! Te responderemos a la brevedad.
              </div>
            )}

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="contactoNombre" className="form-label fw-bold mb-1">Nombre Completo</label>
                <input
                  id="contactoNombre"
                  type="text"
                  className="form-control"
                  placeholder="Ej: María González"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="contactoEmail" className="form-label fw-bold mb-1">Correo Electrónico</label>
                <input
                  id="contactoEmail"
                  type="email"
                  className="form-control"
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="contactoTelefono" className="form-label fw-bold mb-1">Teléfono de Contacto</label>
                <input
                  id="contactoTelefono"
                  type="text"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="912345678"
                  value={telefono}
                  onChange={handleTelefonoChange}
                  maxLength={12}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contactoMensaje" className="form-label fw-bold mb-1">Asunto / Consulta</label>
                <textarea
                  id="contactoMensaje"
                  className="form-control"
                  rows={3}
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  placeholder="Escribe aquí tus dudas sobre vacunas, consultas médicas o servicios..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100 fw-bold" disabled={enviando}>
                {enviando ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};