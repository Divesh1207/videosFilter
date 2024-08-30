// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import HomePage from './components/HomePage';
// import Signup from './components/Signup';
// import OAuthCallback from './components/OAuthCallback';
// import { useEffect } from 'react';
// import About from './components/About';
// import Contact from './components/Contact';

// function App() {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/homePage" element={<HomePage />} />
//         <Route path="/auth/callback" element={<OAuthCallback />} /> {/* Handle OAuth callback */}
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import OAuthCallback from './components/OAuthCallback';
import About from './components/About';
import Contact from './components/Contact';
import Layout from './components/Layout'; // Import the Layout component

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the routes with the Layout component */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Signup />} />

          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="homePage" element={<HomePage />} />
        <Route path="/auth/callback" element={<OAuthCallback />} /> {/* Handle OAuth callback */}
      </Routes>
    </Router>
  );
}

export default App;
