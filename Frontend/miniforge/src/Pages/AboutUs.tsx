import React from 'react';
import { Users, Lamp, MapPin } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#F7E9E9]">
        <div className="container mx-auto px-6 py-16 space-y-16 ">

            {/* Hero Section */}
            <section className="text-center">
                <h1 className="text-4xl font-bold text-[#561412] mb-4">About Us</h1>
                <p className="text-lg text-[#561412] max-w-2xl mx-auto">
                    At MiniForge, we are passionate about transforming your ideas into intricately crafted miniatures.
                    Our journey began with a simple mission: to democratize access to high-quality 3D printing for hobbyists and professionals alike.
                </p>
                <div className="mt-8 flex justify-center space-x-6">
                    {/* Placeholder images */}
                    <div className="w-48 h-32 bg-gray-200 rounded shadow-lg" />
                    <div className="w-48 h-32 bg-gray-200 rounded shadow-lg" />
                    <div className="w-48 h-32 bg-gray-200 rounded shadow-lg" />
                </div>
            </section>

            {/* Our Mission */}
            <section>
                <h2 className="text-2xl font-semibold text-[#AB2724] mb-6">Our Mission</h2>
                <p className="text-[#561412] max-w-3xl">
                    We strive to provide a seamless, user-friendly platform where creativity meets technology.
                    From design to delivery, our goal is to ensure every miniature crafted through MiniForge is a testament to precision and imagination.
                </p>
            </section>

            {/* Core Values */}
            <section>
                <h2 className="text-2xl font-semibold text-[#AB2724] mb-8 text-center">Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex items-start space-x-4">
                        <Users className="w-8 h-8 text-[#AB2724] flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-lg text-[#561412]">Community-Driven</h3>
                            <p className="text-[#561412]">Building a supportive community of creators and enthusiasts.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Lamp className="w-8 h-8 text-[#AB2724] flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-lg text-[#561412]">Innovation</h3>
                            <p className="text-[#561412]">Continuously exploring new techniques and materials for superior quality.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <MapPin className="w-8 h-8 text-[#AB2724] flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-lg text-[#561412]">Accessibility</h3>
                            <p className="text-[#561412]">Ensuring our services are affordable and easy to use for everyone.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section>
                <h2 className="text-2xl font-semibold text-[#AB2724] mb-8 text-center">Meet the Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {['Alice', 'Bob', 'Charlie', 'Diana'].map(name => (
                        <div key={name} className="text-center">
                            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                                {/* Placeholder for avatar */}
                            </div>
                            <h4 className="font-semibold text-[#561412]">{name} Smith</h4>
                            <p className="text-sm text-[#561412]">Role</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    </div>
    );
};

export default About;
