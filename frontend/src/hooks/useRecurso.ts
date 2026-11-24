import { useCallback, useEffect, useState } from 'react';
import { mensajeDeError } from '../services/api';

export const useRecurso = <T,>(cargar: () => Promise<T>, inicial: T) => {
  const [datos, setDatos] = useState<T>(inicial);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const recargar = useCallback(
    () =>
      cargar()
        .then((resultado) => {
          setDatos(resultado);
          setError('');
        })
        .catch((err: unknown) => setError(mensajeDeError(err)))
        .finally(() => setCargando(false)),
    [cargar]
  );

  useEffect(() => {
    recargar();
  }, [recargar]);

  return { datos, cargando, error, recargar };
};
