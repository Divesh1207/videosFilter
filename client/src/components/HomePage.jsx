

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaBars, FaTimes, FaPlay } from 'react-icons/fa'; // Import FaPlay icon
import Sidebar from './Sidebar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { BounceLoader } from 'react-spinners';

// Progress Bar Component
const ProgressBar = ({ isLoading }) => {
    return (
        <div
            className={`fixed top-0 left-0 h-1 bg-pink-500 transition-all duration-500 ${isLoading ? 'w-full' : 'w-0'
                }`}
            style={{ zIndex: 100 }}
        />
    );
};

const HomePage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [videoResults, setVideoResults] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [expandedPrompts, setExpandedPrompts] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const handleSearch = async (prompt) => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token') || localStorage.getItem('token');

        if (!googleId || typeof googleId !== 'string' || googleId.trim() === '') {
            console.error('Invalid googleId:', googleId);
            setError('Invalid googleId');
            setIsLoading(false); // Ensure loader hides on error
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}videos/search-liked-videos`,
                {
                    googleId,
                    prompt,
                    page: pagination[prompt]?.page || 1,
                    pageSize: 10,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setVideoResults((prevResults) => ({
                    ...prevResults,
                    [prompt]: response.data.likedVideos,
                }));
                setPagination((prevPagination) => ({
                    ...prevPagination,
                    [prompt]: {
                        page: response.data.page,
                        totalPages: response.data.totalPages,
                    },
                }));
                setCurrentPrompt(prompt);
                setExpandedPrompts((prevState) => ({
                    ...prevState,
                    [prompt]: false,
                }));
                setMessages((prev) => [
                    ...prev,
                    { sender: 'results', content: response.data.likedVideos },
                ]);
                console.log(
                    `Search results for prompt "${prompt}":`,
                    response.data.likedVideos
                );
            } else {
                console.error('Error fetching search results:', response.data);
                setError('Error fetching results. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching search results:', error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.error === 'invalid_grant'
            ) {
                setError(
                    'Your session has expired or is invalid. Please sign up again.'
                );
                localStorage.removeItem('token'); // Clear token
                window.location.reload(); // Reload to clear state
            } else {
                setError(
                    ' Your session has expired or is invalid. Please sign up again.'
                );
            }
        } finally {
            setIsLoading(false); // Hide loader after data fetch is complete
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const renderMessage = (message) => {
        const { sender, content } = message;

        if (sender === 'user') {
            return (
                <div className="flex justify-end mb-4">
                    <div className="bg-indigo-500 text-white rounded-lg py-2 px-4 max-w-[70%] shadow-lg">
                        <p>{content}</p>
                    </div>
                </div>
            );
        } else if (sender === 'results') {
            return (
                <div className="relative flex justify-start mb-8">
                    <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg p-3 w-full max-w-xs relative">
                        {content.length > 0 ? (
                            <div className="relative mt-3 lg:mb-3">
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    navigation={{
                                        prevEl: `.prev-button-${sender}`,
                                        nextEl: `.next-button-${sender}`,
                                    }}
                                    modules={[Navigation]}
                                >
                                    {content.map((video, index) => (
                                        <SwiperSlide key={video.videoId}>
                                            <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-start space-y-4">
                                                <div className="w-full h-32 relative">
                                                    {video.thumbnails &&
                                                        video.thumbnails.medium && (
                                                            <img
                                                                src={
                                                                    video
                                                                        .thumbnails
                                                                        .medium
                                                                        .url
                                                                }
                                                                alt={video.title}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        )}
                                                </div>
                                                <h3 className="text-lg font-semibold truncate text-white font-mono">
                                                    {video.title || 'No Title'}
                                                </h3>
                                                <div className="flex space-x-4 lg:mt-7">
                                                    <a
                                                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center space-x-2 p-2 rounded-lg bg-indigo-500 text-white hover:bg-pink-500 transition duration-300 ease-in-out"
                                                    >
                                                        Watch Video
                                                    </a>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}

                                    {/* Remove blue arrow keys and add larger play icons for navigation */}
                                    <div className={`swiper-button-prev prev-button-${sender}`} role="button" aria-label="Previous Slide">
                                        <FaPlay size={30} className="rotate-180 text-white absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-[-50%] hover:scale-125 transition duration-300 ease-in-out cursor-pointer" />
                                    </div>
                                    <div className={`swiper-button-next next-button-${sender}`} role="button" aria-label="Next Slide">
                                        <FaPlay size={30} className="text-white absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-[50%] hover:scale-125 transition duration-300 ease-in-out cursor-pointer" />
                                    </div>
                                </Swiper>
                            </div>
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex justify-start mb-4">
                    <div className="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%] shadow-lg">
                        <p>{content}</p>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 relative">
            {/* Full-Screen Loader */}
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
                    <BounceLoader color="#ff007a" size={150} />
                </div>
            )}

            {/* Progress Bar */}
            <ProgressBar isLoading={isLoading} />

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-black shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static lg:w-1/4`}
            >
                <div className="absolute top-4 right-4 z-40">
                    {isSidebarOpen && (
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-gray-400 font-mono hover:text-gray-300"
                        >
                            <FaTimes size={24} />
                        </button>
                    )}
                </div>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:w-3/4">
                <header className="bg-gray-800 shadow-lg flex items-center p-4">
                    {!isSidebarOpen && (
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="text-white lg:hidden"
                        >
                            <FaBars size={24} />
                        </button>
                    )}
                    <h1 className="ml-4 text-pink-500 text-lg font-semibold font-mono">
                        Liked Videos Search
                    </h1>
                </header>

                {/* Chat Section */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div key={index}>{renderMessage(message)}</div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Section */}
                <div className="bg-gray-800 mb-4 p-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch(inputMessage);
                        }}
                        className="flex space-x-2"
                    >
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Enter your prompt here..."
                            className="flex-1 p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-pink-500"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                        >
                            Search
                        </button>
                    </form>
                    {error && (
                        <div className="mt-2 text-red-500">{error}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
