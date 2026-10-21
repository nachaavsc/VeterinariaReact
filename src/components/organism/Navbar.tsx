import { Link, NavLink } from 'react-router-dom'; 

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
           VetControl
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        > 
            <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'}
                to="/"
              >

                Inicio 
              </NavLink>

            </li>
            <li className="nav-item">
                <NavLink 
                    className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'} 
                    to="/mascotas"
                >
                  Mascotas
                </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'}
                to="/atenciones"
              >
                Atenciones
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
