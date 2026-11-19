import { describe, it, expect, beforeEach } from 'vitest';
import { petsRepository } from './petsRepository';

describe('petsRepository', () => {
  beforeEach(() => {
    petsRepository.reiniciar();
  });

  it('obtenerTodas devuelve las mascotas iniciales', () => {
    const mascotas = petsRepository.obtenerTodas();
    expect(mascotas).toHaveLength(3);
    expect(mascotas.map((m) => m.nombre)).toEqual(['Max', 'Luna', 'Thor']);
  });

  it('buscar filtra mascotas por nombre', () => {
    const resultado = petsRepository.buscar('luna');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nombre).toBe('Luna');
  });

  it('buscar filtra mascotas por especie', () => {
    const resultado = petsRepository.buscar('gato');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].especie).toBe('Gato');
  });

  it('buscar sin criterio devuelve todas las mascotas', () => {
    const resultado = petsRepository.buscar('');
    expect(resultado).toHaveLength(3);
  });

  it('obtenerPorId devuelve la mascota correcta', () => {
    const mascota = petsRepository.obtenerPorId('1');
    expect(mascota).toBeDefined();
    expect(mascota?.nombre).toBe('Max');
  });

  it('obtenerPorId devuelve undefined si el id no existe', () => {
    const mascota = petsRepository.obtenerPorId('id-inexistente');
    expect(mascota).toBeUndefined();
  });

  it('crear agrega una nueva mascota a la lista', () => {
    const nueva = petsRepository.crear({
      nombre: 'Rocky',
      especie: 'Perro',
      raza: 'Pug',
      dueno: 'Ana López',
      emailDueno: 'ana@mail.com',
      estado: 'Pendiente'
    });

    expect(nueva.id).toBeTruthy();
    expect(petsRepository.obtenerTodas()).toHaveLength(4);
    expect(petsRepository.obtenerPorId(nueva.id)?.nombre).toBe('Rocky');
  });

  it('actualizar modifica los datos de una mascota existente', () => {
    const actualizada = petsRepository.actualizar('2', { estado: 'Atendido' });
    expect(actualizada?.estado).toBe('Atendido');
    expect(petsRepository.obtenerPorId('2')?.estado).toBe('Atendido');
  });

  it('actualizar devuelve null si el id no existe', () => {
    const resultado = petsRepository.actualizar('id-inexistente', { estado: 'Atendido' });
    expect(resultado).toBeNull();
  });

  it('eliminar quita una mascota por id', () => {
    const eliminado = petsRepository.eliminar('3');
    expect(eliminado).toBe(true);
    expect(petsRepository.obtenerPorId('3')).toBeUndefined();
    expect(petsRepository.obtenerTodas()).toHaveLength(2);
  });

  it('eliminar devuelve false si el id no existe', () => {
    const eliminado = petsRepository.eliminar('id-inexistente');
    expect(eliminado).toBe(false);
    expect(petsRepository.obtenerTodas()).toHaveLength(3);
  });
});
