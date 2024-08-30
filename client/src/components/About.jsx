import React from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaUser, FaProjectDiagram, FaGithub, FaTwitter } from 'react-icons/fa';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-cyan-300 font-mono">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10"></div>
            <main className="relative z-10 container mx-auto px-4 py-16">
                <header className="text-center mb-16">
                    <motion.h1
                        className="text-4xl mt-9 sm:text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        About Us
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Discover what makes us tick and our mission to revolutionize video content with AI.
                    </motion.p>
                </header>

                <section className="mb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">Our Mission</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: FaInfoCircle, title: "Innovative AI", description: "Harnessing the power of AI to enhance video experiences by providing smart filtering and content analysis tools." },
                            { icon: FaUser, title: "User-Centric Design", description: "Focusing on delivering intuitive interfaces and tools that make video content management straightforward and enjoyable." },
                            { icon: FaProjectDiagram, title: "Continuous Improvement", description: "Regularly updating our technology to integrate the latest advancements in AI and video processing." }
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
                    <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">V1d30F1lt3r: Empowering Content Creators</h2>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-cyan-700">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Streamline Your Video Workflow</h3>
                        <p className="text-gray-400 mb-4">
                            V1d30F1lt3r is an AI-powered video filtering tool that helps content creators optimize their workflow. With V1d30F1lt3r, users can easily import their YouTube videos and apply advanced filters to extract the most relevant content based on specific prompts or random selections.
                        </p>
                        <p className="text-gray-400 mb-4">
                            Our goal is to make video editing and content curation more efficient. Whether you're a YouTuber, a marketer, or a social media manager, V1d30F1lt3r offers tools that cater to your needs, from quick content previews to detailed analyses.
                        </p>
                        <p className="text-gray-400">
                            By leveraging cutting-edge AI, V1d30F1lt3r can automatically identify key moments in videos, making it easier for users to highlight important content and streamline their editing process.
                        </p>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">Features of V1d30F1lt3r</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "AI-Powered Filtering", description: "Our AI algorithms can quickly filter through hours of video content to find the most relevant clips." },
                            { title: "Customizable Prompts", description: "Input exact or broad prompts to guide the filtering process, ensuring the content meets your specific needs." },
                            { title: "Seamless YouTube Integration", description: "Easily connect your YouTube account to import videos and start filtering with just a few clicks." },
                            { title: "Content Highlighting", description: "Automatically highlight key moments in your videos for quick and efficient content review." },
                            { title: "Enhanced Search Capabilities", description: "Search for specific topics, keywords, or themes within your video library using our advanced search tool." },
                            { title: "User-Friendly Interface", description: "An intuitive design that makes video filtering and management accessible to all users, regardless of technical expertise." }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg border border-cyan-700 hover:border-pink-500 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-20">
                    <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg border border-cyan-700">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Connect with Us</h2>
                        <p className="text-lg sm:text-xl mb-8 text-center text-gray-400">
                            Stay updated and follow our journey on social media.
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
        </div>
    );
};

export default About;
