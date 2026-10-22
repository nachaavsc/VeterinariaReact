import React from 'react';

export const EquipoMedico: React.FC = () => {
  const equipo = [
    { nombre: 'Dr. Roberto Gómez', especialidad: 'Cirugía General' },
    { nombre: 'Dra. María Fernández', especialidad: 'Dermatología Canina' },
    { nombre: 'Dr. Esteban Quito', especialidad: 'Atención Felina' }
  ];

  return (
    <section className="my-5">
      <h2 className="text-center mb-4">Nuestro Equipo Médico</h2>
      <div className="row g-4">
        {equipo.map((doc, idx) => (
          <div key={idx} className="col-md-4">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{doc.nombre}</h5>
                <p className="card-text text-muted">{doc.especialidad}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};