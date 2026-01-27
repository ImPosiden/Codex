'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      {/* Company Overview */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About ServiceHub</h1>
          <p className="text-xl text-gray-600 mb-6">
            Founded in 2020, ServiceHub has been revolutionizing the way businesses access and
            manage essential services. Our mission is to provide reliable, scalable, and
            affordable solutions that empower organizations of all sizes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">500K+</p>
              <p className="text-gray-600">Active Customers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">99.9%</p>
              <p className="text-gray-600">Uptime Guarantee</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">24/7</p>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Reliability</h3>
              <p className="text-gray-600">
                We believe in providing services you can depend on. Our infrastructure is
                built on redundancy and tested through rigorous quality assurance.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We constantly evolve our services to meet the changing needs of our customers,
                incorporating the latest technologies and best practices.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Security</h3>
              <p className="text-gray-600">
                Your data security is our top priority. We implement enterprise-grade security
                measures and comply with international standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Customer-First</h3>
              <p className="text-gray-600">
                We are committed to delivering exceptional customer experiences through responsive
                support and continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-lg p-4 flex-shrink-0">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <a href="mailto:support@servicehub.com" className="text-blue-600 hover:underline">
                    support@servicehub.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-lg p-4 flex-shrink-0">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-lg p-4 flex-shrink-0">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  <p className="text-gray-600">
                    123 Business Street<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
