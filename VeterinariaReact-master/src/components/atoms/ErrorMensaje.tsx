import React from 'react';

export const ErrorMensajes: React.FC<{ mensaje?: string }> = ({ mensaje }) => {
  if (!mensaje) return null;
  return <div className="invalid-feedback d-block">{mensaje}</div>;
};
