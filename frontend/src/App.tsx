import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';
import { AuthModal } from './components/organisms/AuthModal';
import { BotonSesion } from './components/molecules/BotonSesion';
import { AuthProvider } from './context/AuthContext';
import { useAuth, type Rol } from './context/useAuth';
import { Home } from './pages/Home';
import { Servicios } from './pages/Servicios';
import { Equipo } from './pages/Equipo';
import { MascotasClientes } from './pages/MascotasClientes';
import { Registro } from './pages/Registro';
import { Admin } from './pages/Admin';
import { Detalle } from './pages/Detalle';
import { Contacto } from './pages/Contacto';
import { Novedades } from './pages/Novedades';
import { NotFound } from './pages/NotFound';

const RutaProtegida: React.FC<{ rol?: Rol; children: React.ReactElement }> = ({ rol, children }) => {
  const { rol: rolActual, abrirModal } = useAuth();
  const permitido = rol ? rolActual === rol : rolActual !== null;

  useEffect(() => {
    if (!permitido) abrirModal();
  }, [permitido, abrirModal]);

  return permitido ? children : <Navigate to="/" replace />;
};

export const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <BotonSesion />
        <AuthModal />
        <main className="container my-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/novedades" element={<Novedades />} />
            <Route path="/equipo" element={<Equipo />} />
            <Route path="/mascotas-clientes" element={<RutaProtegida><MascotasClientes /></RutaProtegida>} />
            <Route path="/registro" element={<RutaProtegida><Registro /></RutaProtegida>} />
            <Route path="/admin" element={<RutaProtegida rol="ADMIN"><Admin /></RutaProtegida>} />
            <Route path="/detalle/:id" element={<RutaProtegida><Detalle /></RutaProtegida>} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
