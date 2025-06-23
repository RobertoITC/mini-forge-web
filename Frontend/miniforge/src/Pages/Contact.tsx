import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: implement form submission logic
        console.log('Form submitted', form);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className={'min-h-screen bg-[#F7E9E9]'}>
        <div className="container mx-auto px-6 py-16 space-y-12">
            {/* Hero */}
            <section className="text-center">
                <h1 className="text-4xl font-bold text-[#561412] mb-2">Get in Touch</h1>
                <p className="text-lg text-[#561412] max-w-2xl mx-auto">
                    Have questions or need support? Drop us a message and we’ll get back to you soon.
                </p>
            </section>

            {/* Contact Info + Form */}
            <section className="flex flex-col lg:flex-row gap-10">
                {/* Info */}
                <div className="lg:w-1/3 space-y-8">
                    <div className="flex items-start space-x-4">
                        <MapPin className="w-6 h-6 text-[#AB2724] flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-[#561412]">Address</h4>
                            <p className="text-[#561412]">123 Forge Street, Creators City, MX</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Mail className="w-6 h-6 text-[#AB2724] flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-[#561412]">Email</h4>
                            <p className="text-[#561412]">support@miniforge.com</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Phone className="w-6 h-6 text-[#AB2724] flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-[#561412]">Phone</h4>
                            <p className="text-[#561412]">+52 123 456 7890</p>
                        </div>
                    </div>
                    {/* Placeholder for map */}
                    <div className="w-full h-48 bg-gray-200 rounded shadow-lg" />
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="lg:w-2/3 bg-white rounded-lg shadow-lg p-8 space-y-6"
                >
                    <div>
                        <label className="block text-[#561412] mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#AB2724]"
                        />
                    </div>
                    <div>
                        <label className="block text-[#561412] mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#AB2724]"
                        />
                    </div>
                    <div>
                        <label className="block text-[#561412] mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#AB2724]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center bg-[#AB2724] text-white px-6 py-3 rounded hover:bg-[#781B19] transition"
                    >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                    </button>
                </form>
            </section>
        </div>
        </div>
    );
};

export default Contact;
