import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const CardWithSwiper = ({ videos }) => {
    return (
        <div className="relative p-4 bg-white border border-gray-200 rounded-lg shadow-md mx-auto max-w-4xl">
            {/* Swiper for video slides */}
            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                className="video-carousel"
            >
                {videos.map((video, index) => (
                    <SwiperSlide key={index}>
                        <div className="p-4 flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2 text-center">{video.title}</h3>
                            {video.images.length > 0 && (
                                <img
                                    src={video.images[0].url}
                                    alt="Video Thumbnail"
                                    className="w-full h-auto rounded-lg mb-2 max-w-md"
                                />
                            )}
                            <a
                                href={video.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Watch Video
                            </a>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Swiper Navigation Arrows */}
            <div className="absolute inset-y-0 flex items-center justify-between w-full px-4">
                <button className="swiper-button-prev bg-white text-gray-600 hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    &lt;
                </button>
                <button className="swiper-button-next bg-white text-gray-600 hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default CardWithSwiper;
