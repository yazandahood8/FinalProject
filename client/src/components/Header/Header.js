import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const user = params.get('user'); // 'maria' or 'yazan' or null

  // Build a path, appending ?user=… if present
  const withUser = (path) => (user ? `${path}?user=${user}` : path);

  // Highlight active link
  const isActive = (path) =>
    pathname.startsWith(path) ? 'nav-link active' : 'nav-link';

  return (
    <header className="custom-header shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light bg-white container">
        <span
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(withUser('/'))}
        >
          <img
            src="/icon_web.png"
            alt="Logo"
            width="32"
            className="me-2"
            
          />
          Maria &amp; Yazan
          
        </span>

        <div className="collapse navbar-collapse show justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span
                className={isActive('/profile')}
                onClick={() => navigate(withUser('/profile'))}
              >
                Profile
              </span>
            </li>
            <li className="nav-item">
              <span
                className={isActive('/projects')}
                onClick={() => navigate(withUser('/projects'))}
              >
                Projects
              </span>
            </li>
            <li className="nav-item">
              <span
                className={isActive('/skills')}
                onClick={() => navigate(withUser('/skills'))}
              >
                Skills
              </span>
            </li>
            <li className="nav-item">
              <span
                className={isActive('/resume')}
                onClick={() => navigate(withUser('/resume'))}
              >
                Resume
              </span>
            </li>
               <li className="nav-item">
              <span
                className={isActive('/timeline')}
                onClick={() => navigate(withUser('/timeline'))}
              >
                Timeline
              </span>
            </li>
            
               <li className="nav-item">
              <span
                className={isActive('/casestudies')}
                onClick={() => navigate(withUser('/casestudies'))}
              >
                casestudies
              </span>
            </li>
            <li className="nav-item">
              <span
                className={isActive('/about')}
                onClick={() => navigate(withUser('/about'))}
              >
                About
              </span>
            </li>
            <li className="nav-item">
              <span
                className={isActive('/contact')}
                onClick={() => navigate(withUser('/contact'))}
              >
                Contact
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
