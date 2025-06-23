import React from 'react';
import banner from '../assets/banner.png'; // Adjust the path as necessary
import figures from '../assets/figures.png'; // Adjust the path as necessary
import printer from '../assets/printer.png'; // Adjust the path as necessary
import order from '../assets/order.png';


const Home: React.FC = () => {
    return (
        <main className="min-h-screen flex flex-col bg-[#F7E9E9]">

            {/* Hero */}
            <section
                className="relative flex-grow py-16 px-4 bg-size-[auto_1100px] bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${banner})` }}
            >

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#F7E9E9]/20 backdrop-blur-xs" />

                <div className="relative z-10 text-center max-w-3xl mx-auto bg-white/80 backdrop-blur rounded-xl p-8 shadow-lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#561412] text-shadow-sm mb-4">
                        Transform Your MiniForge Journey
                    </h2>
                    <p className="text-[#561412] text-lg md:text-xl mb-8">
                        Experience custom design, quick printing, and personal service for your collectible miniatures.
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4 max-w-6xl mx-auto">
                    <div className="bg-white/80  backdrop-blur rounded-xl p-6 shadow-md shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
                        {/* figures image */}
                        <img src={figures} alt="Miniatures" className="w-full h-auto rounded-lg mb-4" />
                        <h3 className="text-xl font-semibold text-[#AB2724] mb-2">
                            Design Flexibility
                        </h3>
                        <p className="text-[#561412]">
                            Choose from a variety of presets or upload your own models with ease.
                        </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
                        {/* printer image */}
                        <img src={printer} alt="3D Printer" className="w-full h-auto rounded-lg mb-4" />
                        <h3 className="text-xl font-semibold text-[#AB2724] mb-2">
                            Fast Turnaround
                        </h3>
                        <p className="text-[#561412]">
                            Get your miniatures printed and shipped faster than ever before.
                        </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
                        {/* order image */}
                        <img src={order} alt="Order Process" className="w-full h-auto rounded-lg mb-4" />
                        <h3 className="text-xl font-semibold text-[#AB2724] mb-2">
                            Personalized Service
                        </h3>
                        <p className="text-[#561412]">
                            Our team is here to help you every step of the way.
                        </p>
                    </div>
                </div>
            </section>

            {/* Auto-Scrolling Carousel */}
            <section className="w-full overflow-x-hidden py-10 bg-[#DDA9A7]">
                <div className="flex gap-6 animate-scroll whitespace-nowrap px-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="inline-block min-w-[250px] bg-white rounded-xl p-4 shadow text-left shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <div className="text-2xl mb-2">🧩 Card {i}</div>
                            <p className="text-sm text-[#561412]">
                                Sample description for card {i}.
                            </p>
                        </div>
                    ))}
                    {/* Duplicate for smooth loop */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={`dup-${i}`}
                            className="inline-block min-w-[250px] bg-white rounded-xl p-4 shadow text-left"
                        >
                            <div className="text-2xl mb-2">🧩 Card {i}</div>
                            <p className="text-sm text-[#561412]">
                                Sample description for card {i}.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feature Teaser */}
            <section className="bg-[#DDA9A7] py-16">
                <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {[
                        { icon: '🎨', title: 'Custom Colors' },
                        { icon: '⚙️', title: 'Easy Setup' },
                        { icon: '🚀', title: 'Fast Delivery' },
                    ].map(({ icon, title }) => (
                        <div
                            key={title}
                            className="p-6 bg-white rounded-lg shadow hover:scale-105 transform transition"
                        >
                            <div className="text-4xl mb-4">{icon}</div>
                            <h3 className="text-xl font-semibold text-[#AB2724]">
                                {title}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#561412] text-[#F7E9E9] py-6">
                <div className="container mx-auto px-6 text-center">
                    <p>
                        &copy; {new Date().getFullYear()} MiniForge. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    );
};

export default Home;