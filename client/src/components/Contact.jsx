import React from 'react';
import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-cyan-300 font-mono">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600">
                Contact Me
            </h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-cyan-700 w-4/5 max-w-md">
                <p className="text-lg text-center mb-6 text-gray-300">
                    Feel free to reach out via GitHub, Twitter, or email!
                </p>
                <div className="flex justify-center space-x-6">
                    <a
                        href="https://github.com/Divesh1207"
                        className="text-3xl text-cyan-400 hover:text-pink-500 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://x.com/divesh1207"
                        className="text-3xl text-cyan-400 hover:text-pink-500 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="mailto:diveshp904@gmail.com"
                        className="text-3xl text-cyan-400 hover:text-pink-500 transition-colors duration-300"
                    >
                        <FaEnvelope />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
