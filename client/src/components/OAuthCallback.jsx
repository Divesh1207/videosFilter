import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        console.log('Received Token in oauthcall back frontend component:', token);


        if (token) {
            localStorage.setItem('jwt', token);
            navigate('/homePage'); // Navigate to home page after login
        } else {
            console.error('No token found in the URL');
        }
    }, [location, navigate]);

    return <div>Loading...</div>;
};

export default OAuthCallback;
