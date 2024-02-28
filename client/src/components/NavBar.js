import React from 'react';
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
          <nav style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 24px', height: '80px' }}>
            <h1 style={{ marginRight: 'auto' }}>wishlistify</h1>
            <ul style={{ listStyleType: 'none', display: 'flex', gap: '40px', margin: '0' }}>
              <li>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
              </li>
              <li>
                <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>
              </li>
              <li>
                <Link to="/faq" style={{ textDecoration: 'none', color: 'inherit' }}>FAQ</Link>
              </li>
            </ul>
          </nav>
    
          <Outlet />
        </>
      )
}

export default NavBar;
