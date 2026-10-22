import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/organisms/Navbar';
import { PiePagina } from './components/organisms/PiePagina';
import { Inicio } from './pages/Inicio';
import { Registro } from './pages/Registro';
import { Admin } from './pages/Admin';
import { Detalle } from './pages/Detalle';
import { Contacto } from './pages/Contacto';

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
