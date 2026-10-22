import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Organismo/Navbar';
import { PiePagina } from './components/Organismo/PiePagina';
import { Inicio } from './Paginas/Inicio';
import { Registro } from './Paginas/Registro';
import { Admin } from './Paginas/Admin';
import { Detalle } from './Paginas/Detalle';
import { Contacto } from './Paginas/Contacto';

export const App: React.FC = () => (
  <BrowserRouter>
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <PiePagina />
    </div>
  </BrowserRouter>
);

export default App;