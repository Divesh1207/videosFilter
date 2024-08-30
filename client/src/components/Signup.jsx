import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaRocket, FaFilter, FaCode, FaGoogle, FaGithub, FaTwitter, FaAndroid, FaPaintBrush, FaAdjust } from 'react-icons/fa';
import Navbar from './Navbar'; // Adjust the import path based on your file structure

const Signup = () => {
    const navigate = useNavigate();
    const [glitchText, setGlitchText] = useState('VideoFilter');

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchText(prevText =>
                prevText === 'VideoFilter' ? 'V1d30F1lt3r' : 'VideoFilter'
            );
        }, 3000);

        return () => clearInterval(glitchInterval);
    }, []);
 const backendUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '');
    const handleOAuthResponse = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const googleId = urlParams.get('googleId');
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        if (googleId && email && token) {
            localStorage.setItem('googleId', googleId);
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            navigate('/homePage');
        } else {
            console.error('Google OAuth response is missing googleId or token');
        }
    };

    useEffect(() => {
        handleOAuthResponse();
    }, []);

    const handleSignup = () => {
        window.location.href = `${backendUrl}/auth/google`;
    };


    return (
        <div className="min-h-screen bg-gray-900 text-cyan-300 font-mono">
            <Navbar /> {/* Include Navbar here */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10"></div>
            <main className="relative z-10 container mx-auto px-4 py-16">
                <header className="text-center mb-16">
                    <motion.h1
                        className="text-4xl mt-9 sm:text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {glitchText}
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Hack your video workflow with AI-powered filtering
                    </motion.p>
                    <motion.button
                        onClick={handleSignup}
                        className="px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold text-gray-900 bg-cyan-400 rounded-md shadow-lg hover:bg-pink-500 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaGoogle className="mr-2 text-lg sm:text-xl" />
                        Sign in with Google
                    </motion.button>
                </header>

                <section className="mb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">Core Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: FaRocket, title: "Rapid Upload", description: "Quickly bring your YouTube videos into the platform, minimizing downtime and maximizing productivity." },
                            { icon: FaFilter, title: "Smart AI Filters", description: "Utilize intelligent filters powered by AI to automatically identify and highlight key moments in videos." },
                            { icon: FaAdjust, title: "Custom Video Editing", description: "Fine-tune your video content effortlessly with intuitive, AI-assisted editing tools tailored to your needs." }

                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg border border-cyan-700 hover:border-pink-500 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <feature.icon className="text-3xl sm:text-4xl mb-4 text-cyan-400" />
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-20">
                    <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg border border-cyan-700">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Stay Ahead with VideoFilter</h2>
                        <p className="text-lg sm:text-xl mb-8 text-center text-gray-400">
                            Explore the VideoFilter project and unleash the power of AI-driven video transformation. Be a part of the innovation.
                        </p>
                        <div className="flex justify-center space-x-4 sm:space-x-6">
                            <a href="https://github.com/Divesh1207" className="text-2xl sm:text-3xl text-cyan-400 hover:text-pink-500 transition-colors duration-300">
                                <FaGithub />
                            </a>
                            <a href="https://x.com/divesh1207" className="text-2xl sm:text-3xl text-cyan-400 hover:text-pink-500 transition-colors duration-300">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </section>

            </main>


            <ToastContainer />
        </div>
    );
};

export default Signup;
