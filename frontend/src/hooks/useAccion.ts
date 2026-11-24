import { useCallback, useState } from 'react';
import { mensajeDeError } from '../services/api';

export const useAccion = () => {
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState('');
  const [error, setError] = useState('');

  const ejecutar = useCallback(async <T,>(accion: () => Promise<T>, mensajeExito: string | ((resultado: T) => string)) => {
    setEnviando(true);
    setExito('');
    setError('');
    try {
      const resultado = await accion();
      setExito(typeof mensajeExito === 'function' ? mensajeExito(resultado) : mensajeExito);
      return true;
    } catch (err) {
      setError(mensajeDeError(err));
      return false;
    } finally {
      setEnviando(false);
    }
  }, []);

  const limpiarExito = useCallback(() => setExito(''), []);
  const limpiarError = useCallback(() => setError(''), []);

  return { enviando, exito, error, ejecutar, limpiarExito, limpiarError };
};
