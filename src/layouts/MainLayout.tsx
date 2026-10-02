import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ToastContainer } from '../components/ToastContainer';

export const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};
