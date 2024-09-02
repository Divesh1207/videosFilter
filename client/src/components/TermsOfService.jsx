import React from 'react';

const TermsOfService = () => {
    return (
        <div className="container mx-auto px-4 py-16 text-gray-300">
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>

            <section className="mb-6">
                <h2 className="text-xl font-bold mb-2">Terms and Conditions</h2>
                <p>Last updated: August 31, 2024</p>
                <p>Please read these terms and conditions carefully before using Our Service.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-bold mb-2">Interpretation and Definitions</h2>
                <h3 className="text-lg font-semibold mb-1">Interpretation</h3>
                <p>
                    The words of which the initial letter is capitalized have meanings defined under the following conditions.
                    The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
                <h3 className="text-lg font-semibold mb-1">Definitions</h3>
                <p>For the purposes of these Terms and Conditions:</p>
                <ul className="list-disc list-inside">
                    <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority.</li>
                    <li><strong>Country</strong> refers to: Uttar Pradesh, India</li>
                    <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Videos-Filter.</li>
                    <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone, or a digital tablet.</li>
                    <li><strong>Service</strong> refers to the Website.</li>
                    <li><strong>Terms and Conditions</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
                    <li><strong>Third-party Social Media Service</strong> means any services or content provided by a third-party that may be displayed, included or made available by the Service.</li>
                    <li><strong>Website</strong> refers to Videos-Filter, accessible from <a href="https://videos-filter.vercel.app/" className="text-blue-500">https://videos-filter.vercel.app/</a></li>
                    <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-bold mb-2">Acknowledgment</h2>
                <p>
                    These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company.
                    These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                </p>
                <p>
                    Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions.
                    These Terms and Conditions apply to all visitors, users, and others who access or use the Service.
                </p>
                <p>
                    By accessing or using the Service, You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions, then You may not access the Service.
                </p>
                <p>
                    You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                </p>
                <p>
                    Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company.
                    Our Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You.
                    Please read Our Privacy Policy carefully before using Our Service.
                </p>
            </section>

            {/* Add more sections for each heading/topic as needed */}
            
            <section className="mb-6">
                <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
                <ul className="list-disc list-inside">
                    <li>By email: <a href="mailto:diveshp904@gmail.com" className="text-blue-500">diveshp904@gmail.com</a></li>
                </ul>
            </section>
        </div>
    );
};

export default TermsOfService;
