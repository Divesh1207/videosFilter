import React, { useState, useEffect } from 'react';

const Sidebar = () => {
    const [likedVideos, setLikedVideos] = useState([]);

    useEffect(() => {
        const fetchLikedVideos = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                const token = searchParams.get('token');
                //console.log('Received Token in sidebar fetched in frontend:', token);
                //const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}videos/liked-videos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setLikedVideos(data);
                } else {
                    console.error('Unexpected data format:', data);
                    setLikedVideos([]);
                }
            } catch (error) {
                console.error('Error fetching liked videos:', error);
            }
        };

        fetchLikedVideos();
    }, []);

    return (
        <div className="fixed top-0 left-0 w-64 md:w-80 lg:w-96 p-4 bg-black border-r border-gray-800 h-screen overflow-y-auto shadow-lg">
            <h2 className="mb-4 text-lg md:text-xl font-bold text-white font-mono">Liked Videos</h2>
            <div className="space-y-2">
                {likedVideos.length > 0 ? (
                    likedVideos.map((video, index) => (
                        <a
                            key={index}
                            href={`https://www.youtube.com/watch?v=${video.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                        >
                            <img
                                src={video.thumbnails.medium.url}
                                alt={video.title}
                                className="w-14 h-10 object-cover rounded-lg"
                            />
                            <h3 className="text-xs md:text-sm font-semibold text-white font-mono truncate">{video.title}</h3>
                        </a>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No liked videos found</p>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
