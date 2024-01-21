import React from 'react';
import './styles/global.css';
import { BrowserRouter, Routes, Route } from  'react-router-dom';

import { NavBar } from './components';
import { Home, About, Faq, Create, WishlistContributorsSignup, WishlistContributors, Wishlist, NotFound } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <div>

        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<Faq />} />
            <Route path="create" element={<Create />} />
            <Route path="wishlist/contributor/signup/:wishlistUuid" element={<WishlistContributorsSignup owner_name="${owner_name}"/>} />
            <Route path="wishlist/contributor/:wishlistUuid" element={<WishlistContributors />} />
            <Route path="wishlist/:wishlistUuid" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
};

export default App;
