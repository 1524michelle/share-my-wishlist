import React from 'react';
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
          <nav>
            <h1>wishlistify</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </nav>
    
          <Outlet />
        </>
      )
}

export default NavBar;