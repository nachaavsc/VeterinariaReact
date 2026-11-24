import React from 'react';

export const Cargando: React.FC<{ texto?: string }> = ({ texto = 'Cargando...' }) => (
  <div className="text-center text-muted my-4" role="status">
    <div className="spinner-border spinner-border-sm text-primary me-2" aria-hidden="true"></div>
    {texto}
  </div>
);
