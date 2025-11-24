import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      {/* The Navbar is now part of the layout frame */}
      <Navbar />

      {/* This 'Outlet' is where your pages (Hero, TopWear, etc.) will load */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;