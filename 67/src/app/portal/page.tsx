'use client';

import { useRouter } from 'next/navigation';
import { Home, Briefcase, FileText, MessageSquare, Settings, ArrowRight, Check } from 'lucide-react';

export default function PortalHome() {
  const router = useRouter();

  const features = [
    {
      icon: Home,
      title: 'Property Management',
      description: 'Upload photos and manage all your properties in one place with detailed information',
      link: '/portal/catalog',
    },
    {
      icon: Briefcase,
      title: 'Service Catalog',
      description: 'Browse and explore our wide range of professional services tailored for you',
      link: '/portal/catalog',
    },
    {
      icon: MessageSquare,
      title: 'Complaints & Reports',
      description: 'Submit complaints and track their resolution status in real-time',
      link: '/portal/complaints',
    },
    {
      icon: FileText,
      title: 'Pricing Plans',
      description: 'View our flexible pricing options and choose the perfect plan for your needs',
      link: '/portal/pricing',
    },
    {
      icon: Settings,
      title: 'My Account',
      description: 'Manage your profile, preferences, and account settings',
      link: '/portal/dashboard',
    },
  ];

  const benefits = [
    'Easy property upload and management',
    'Real-time complaint tracking',
    'Comprehensive service catalog',
    'Flexible pricing options',
    ' 24/7 customer support',
    'Secure data storage',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Customer Portal
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Manage your properties, track complaints, browse services, and more—all in one convenient place
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/portal/catalog')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => router.push('/portal/pricing')}
              className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-lg border-2 border-blue-600 transition"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Portal Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  onClick={() => router.push(feature.link)}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer border border-blue-200"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-6 mx-auto">
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center mb-4">{feature.description}</p>
                  <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
                    Explore
                    <ArrowRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Why Choose Our Portal</h2>
          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-lg text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '1', title: 'Sign In', description: 'Log in to your account' },
              { number: '2', title: 'Upload', description: 'Add your properties with photos' },
              { number: '3', title: 'Track', description: 'Monitor complaints and services' },
              { number: '4', title: 'Manage', description: 'Handle everything from dashboard' },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full font-bold text-2xl mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < 3 && <div className="hidden md:block absolute right-0 top-8 w-8 h-1 bg-blue-300"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of customers already using our portal to manage their properties and services
          </p>
          <button
            onClick={() => router.push('/portal/catalog')}
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2 mx-auto"
          >
            Explore Portal Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/portal/catalog" className="hover:text-white">Property Management</a></li>
              <li><a href="/portal/complaints" className="hover:text-white">Complaints</a></li>
              <li><a href="/portal/pricing" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Customer Portal. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}
