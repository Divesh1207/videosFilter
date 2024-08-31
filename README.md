# Videos Filter

### Introducing Videos Filter
Imagine having the ultimate tool to manage and explore your YouTube liked videos like never before. Videos Filter is a cutting-edge web application designed to elevate your YouTube experience by offering a personalized, intuitive interface for managing your favorite content. By harnessing the power of the MERN stack and Google APIs, Videos Filter ensures that your interaction with YouTube is both seamless and secure.

### What Is Videos Filter?
Videos Filter is your go-to platform for unlocking a new level of control and organization over your YouTube liked videos. This application is built to provide an effortless way to authenticate with Google, access your treasured content, and utilize powerful filtering tools to find exactly what you need.


## Table of Contents

1. [Table of Contents](#table-of-contents)
2. [About](#about)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [License](#license)
6. [Screenshots](#screenshots)

## About

The Videos Filter project is designed to offer a personalized experience for YouTube users by enabling them to view and manage their liked videos. It leverages Google's authentication mechanism to ensure secure and reliable access to a user's YouTube data. Once authenticated, users can see a list of their liked videos and apply various filters to organize and find specific content more easily.

### Key Objectives:

- **Secure Authentication**: Utilize Google OAuth 2.0 for secure user authentication, ensuring that only authenticated users can access their YouTube data.
- **Access to Liked Videos**: Integrate with the YouTube Data API to fetch and display the user's liked videos.
- **Filtering Capabilities**: Provide users with the ability to filter videos based on various attributes such as title, description, date, and statistics, helping them manage their content effectively.
- **User Experience**: Build a user-friendly interface that is intuitive and responsive, providing a seamless experience across different devices.

### Project Workflow:

1. **User Authentication**: Users log in using their Google account, which initiates the OAuth flow. Upon successful authentication, an access token is obtained.
2. **Fetch Liked Videos**: Using the access token, the application fetches the user's liked videos from their YouTube account via the YouTube Data API.
3. **Display and Filter Videos**: The fetched videos are displayed on the frontend, where users can apply various filters to view specific videos.
4. **Token Management**: Access and refresh tokens are managed to ensure the user session remains active without frequent logins.

### Future Enhancements:

- **Advanced Filtering Options**: Introducing more sophisticated filtering options, such as by category or by popularity.
- **User Playlists**: Adding features that allow users to create and manage custom playlists from their liked videos.
- **Social Sharing**: Enabling users to share their favorite videos or playlists directly to social media platforms.
- **Offline Access**: Implementing functionalities for users to save and access their favorite videos offline.

### Challenges Addressed:

- **Handling CORS Issues**: Implementing appropriate CORS middleware settings to allow frontend and backend communication securely.
- **Token Expiry and Refresh Mechanism**: Ensuring seamless user experience by handling token refresh without manual re-authentication.
- **Scalability**: Building the backend and database schema to handle a large number of users and their data efficiently.

### Conclusion:

The Videos Filter project is a comprehensive solution for users who want to keep their YouTube experience organized and efficient. By integrating secure authentication, robust API interactions, and a user-friendly interface, this application aims to enhance the way users interact with their liked YouTube content.



## Features

- User Authentication with Google OAuth
Users can securely log in using their Google account. This method ensures that authentication is smooth and protects user data, making it easy and safe to access their YouTube content without needing to remember another password.

- Fetch and Display Liked YouTube Videos
Once logged in, the application retrieves a list of videos that users have liked on YouTube. This feature allows users to see all their favorite videos in one place, complete with detailed information like video titles, descriptions, and thumbnails.

- Filter Videos Based on Different Criteria
Users can organize their liked videos using various filters. Whether they want to sort by video title, description, or date, this feature makes it simple to find and manage specific content from their collection.

- JWT-Based Authentication with Access and Refresh Tokens
Videos Filter uses JSON Web Tokens (JWT) to manage user sessions securely. Access tokens are short-lived for safety, while refresh tokens help users stay logged in without frequent reauthentication. This combination ensures a secure and seamless user experience.

- Responsive and User-Friendly Interface
The application is designed to be intuitive and responsive, meaning it looks and works great on all devices, from desktops to smartphones. The user interface is straightforward and easy to navigate, making it simple for anyone to manage their YouTube liked videos effortlessly.



## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Google OAuth 2.0
- **API**: Google YouTube Data API v3
- **Styling**: CSS/Bootstrap/Tailwind (or specify any CSS framework used)

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Screenshots
Here are some screenshots of the Videos Filter application in action:

- Login Page
The login page where users authenticate using Google OAuth.

- Liked Videos List
The dashboard displaying the user's liked videos from YouTube.

- Filtering Options
The filter options interface allowing users to sort and find their favorite videos.

- Responsive Design
The application displayed on different devices, showing its responsive and user-friendly design.
