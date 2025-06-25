import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import banner from '../assets/banner.png';
import figures from '../assets/figures.png';
import printer from '../assets/printer.png';
import order from '../assets/order.png';
import { supabase } from '../Lib/supabaseClient';
import type { Product } from '../Types/Product';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from('products')
                .select('*')
                .order('id')  // simple order, adjust as needed
                .limit(12);
            if (data) setProducts(data as Product[]);
        };
        load();
    }, []);

    // duplicate list for seamless scroll
    const scrollItems = [...products, ...products];

    return (
        <main className="min-h-screen flex flex-col bg-[#F7E9E9]">
            {/* Hero */}
            <section
                className="relative flex-grow py-16 px-4 bg-size-[auto_1100px] bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className="absolute inset-0 bg-[#F7E9E9]/20 backdrop-blur-xs" />

                <div className="relative z-10 text-center max-w-3xl mx-auto bg-white/80 backdrop-blur rounded-xl p-8 shadow-lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#561412] mb-4">
                        Transform Your MiniForge Journey
                    </h2>
                    <p className="text-[#561412] text-lg md:text-xl mb-8">
                        Experience custom design, quick printing, and personal service for your collectible miniatures.
                    </p>
                </div>

                {/* Feature trio */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4 max-w-6xl mx-auto">
                    {[
                        { img: figures, title: 'Design Flexibility', desc: 'Choose from a variety of presets or upload your own models with ease.' },
                        { img: printer, title: 'Fast Turnaround', desc: 'Get your miniatures printed and shipped faster than ever before.' },
                        { img: order, title: 'Personalized Service', desc: 'Our team is here to help you every step of the way.' },
                    ].map(({ img, title, desc }) => (
                        <div key={title} className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
                            <img src={img} alt={title} className="w-full h-auto rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold text-[#AB2724] mb-2">{title}</h3>
                            <p className="text-[#561412]">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Auto-scrolling product carousel */}
            <section className="w-full overflow-x-hidden py-10 bg-[#DDA9A7]">
                <div className="flex gap-6 animate-scroll whitespace-nowrap px-6">
                    {scrollItems.map(prod => (
                        <Link
                            to={`/product/${prod.id}`}
                            key={`${prod.id}-${Math.random()}`}
                            className="inline-block min-w-[250px] bg-white rounded-xl p-4 shadow transform transition duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-40 object-cover rounded mb-2"
                            />
                            <h4 className="font-semibold text-sm mb-1 truncate">{prod.name}</h4>
                            <p className="text-[#AB2724] font-bold text-sm">${prod.price.toFixed(2)}</p>
                        </Link>
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
                        <div key={title} className="p-6 bg-white rounded-lg shadow hover:scale-105 transform transition">
                            <div className="text-4xl mb-4">{icon}</div>
                            <h3 className="text-xl font-semibold text-[#AB2724]">{title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#561412] text-[#F7E9E9] py-6">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; {new Date().getFullYear()} MiniForge. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
};

export default Home;