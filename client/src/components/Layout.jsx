// src/components/Layout.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the import path based on your file structure

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-cyan-300 font-mono">
            <Navbar /> {/* Include Navbar here */}
            <main className="relative z-10 container mx-auto px-4 py-16">
                <Outlet /> {/* Render child routes here */}
            </main>
            <footer className="bg-gray-800 text-center py-4 sm:py-6">
                <p className="text-gray-500 text-sm sm:text-base">© 2024 VideoFilter. Coded with ❤️ by DiveshPandey.</p>
            </footer>
        </div>
    );
};

export default Layout;
