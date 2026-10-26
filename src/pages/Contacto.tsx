import React, { useState } from 'react';

export const Contacto: React.FC = () => {
  const [enviado, setEnviado] = useState(false);
  const [telefono, setTelefono] = useState('');

  // Función para permitir solo números (y opcionalmente el +)
  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorIngresado = e.target.value;
    // Remueve todo lo que NO sea un número
    const soloNumeros = valorIngresado.replace(/[^0-9]/g, '');
    setTelefono(soloNumeros);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <div className="container py-2">
      <div className="row g-4">
        {/* Columna Izquierda: Información de Contacto y Ubicación */}
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

            {/* Mapa Interactivo */}
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

        {/* Columna Derecha: Formulario de Contacto */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4">
            <h3 className="fw-bold text-success mb-3"> Envíanos un mensaje</h3>

            {enviado && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                ¡Gracias por contactarnos! Te responderemos a la brevedad.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label fw-bold mb-1">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: María González"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label fw-bold mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="nombre@ejemplo.com"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label fw-bold mb-1">Teléfono de Contacto</label>
                <input
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
                <label className="form-label fw-bold mb-1">Asunto / Consulta</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Escribe aquí tus dudas sobre vacunas, consultas médicas o servicios..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100 fw-bold">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};