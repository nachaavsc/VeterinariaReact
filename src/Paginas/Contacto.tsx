import React from 'react';

export const Contacto: React.FC = () => {
  return (
    <div className="row g-4">
      <div className="col-md-6">
        <div className="card shadow-sm p-4 h-100">
          <h3 className="mb-3 text-primary">📍 Ubicación e Información</h3>
          <p><strong>Dirección:</strong> Av. San Marcos 1234, Rancagua</p>
          <p><strong>Teléfono Urgencias:</strong> +56 9 1234 5678</p>
          <p><strong>Correo Electrónico:</strong> contacto@veterinariasanmarcos.cl</p>
          <p><strong>Horarios de Atención:</strong> Lunes a Sábado de 09:00 a 20:00 hrs.</p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card shadow-sm p-4 h-100">
          <h3 className="mb-3 text-primary">📩 Envíanos un Mensaje</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre</label>
              <input type="text" className="form-control" placeholder="Tu nombre completo" />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input type="email" className="form-control" placeholder="nombre@correo.com" />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Mensaje</label>
              <textarea className="form-control" rows={3} placeholder="Escribe tu consulta..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Enviar Consulta</button>
          </form>
        </div>
      </div>
    </div>
  );
};