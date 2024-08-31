

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import OAuthCallback from './components/OAuthCallback';
import About from './components/About';
import Contact from './components/Contact';
import Layout from './components/Layout'; // Import the Layout component
import PrivacyPolicy from './components/PrivacyPolicy'; // Import the PrivacyPolicy component
import TermsOfService from './components/TermsOfService'; // Import the TermsOfService component

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the routes with the Layout component */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Signup />} />

          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* Add Privacy Policy and Terms of Service routes */}
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="terms-of-service" element={<TermsOfService />} />
               
        </Route>
        <Route path="homePage" element={<HomePage />} />
        <Route path="/auth/callback" element={<OAuthCallback />} /> {/* Handle OAuth callback */}
      </Routes>
    </Router>
  );
}

export default App;
