import React from 'react';
import { Boton } from '../atoms/Boton';

interface ConfirmacionProps {
  mostrar: boolean;
  mensaje: string;
  alConfirmar: () => void;
  alCancelar: () => void;
}

export const Confirmacion: React.FC<ConfirmacionProps> = ({ mostrar, mensaje, alConfirmar, alCancelar }) => {
  if (!mostrar) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Acción</h5>
            <button type="button" className="btn-close" onClick={alCancelar}></button>
          </div>
          <div className="modal-body">
            <p className="mb-0">{mensaje}</p>
          </div>
          <div className="modal-footer">
            <Boton texto="Cancelar" variante="secondary" onClick={alCancelar} />
            <Boton texto="Eliminar" variante="danger" onClick={alConfirmar} />
          </div>
        </div>
      </div>
    </div>
  );
};
