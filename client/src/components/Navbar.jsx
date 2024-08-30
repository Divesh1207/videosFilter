import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-50 flex items-center justify-between p-4">
            <div className="text-cyan-300 pl-10 text-2xl font-bold">
                <NavLink to="/" className="hover:text-pink-500 transition-colors duration-300">
                    VideoFilter
                </NavLink>
            </div>

            {/* Hamburger Menu Icon */}
            <div className="md:hidden flex items-center">
                <motion.button
                    onClick={toggleMenu}
                    className="text-cyan-300 text-2xl hover:text-pink-500 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </motion.button>
            </div>

            {/* Menu Items  */}
            <div className={`md:flex ${isMenuOpen ? 'flex-col absolute top-full right-0 w-full bg-gray-900 mt-5 bg-opacity-90 md:relative md:top-0 md:bg-transparent md:flex-row md:space-x-4' : 'hidden md:flex'}`}>
                <div className={`flex flex-col md:flex-row items-center ${isMenuOpen ? 'space-y-4 md:hidden' : 'hidden md:flex space-x-4'}`}>
                    <NavLink
                        to="/"
                        className="text-cyan-300 text-lg font-semibold hover:text-pink-500 transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="text-cyan-300 text-lg font-semibold hover:text-pink-500 transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="text-cyan-300 text-lg font-semibold hover:text-pink-500 transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </NavLink>
                </div>


            </div>



        </nav>
    );
};

export default Navbar;


