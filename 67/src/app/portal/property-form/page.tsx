'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function PropertyFormPage() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submittedProperties, setSubmittedProperties] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    propertyType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    squareFootage: '',
    yearBuilt: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
  });

  useEffect(() => {
    // Retrieve image from localStorage
    const storedImage = localStorage.getItem('propertyImage');
    if (storedImage) {
      setUploadedImage(storedImage);
    }
    setIsLoading(false);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage for persistence
    const savedProperties = JSON.parse(localStorage.getItem('submittedProperties') || '[]');
    savedProperties.push({ ...formData, image: uploadedImage });
    localStorage.setItem('submittedProperties', JSON.stringify(savedProperties));
    setSubmittedProperties(savedProperties);

    // Clear the property image from localStorage
    localStorage.removeItem('propertyImage');

    // Show success message
    setSubmitted(true);

    // Reset form
    setFormData({
      propertyType: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      squareFootage: '',
      yearBuilt: '',
      bedrooms: '',
      bathrooms: '',
      description: '',
    });
    setUploadedImage(null);

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/portal');
    }, 2000);
  };

  const handleBackClick = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!uploadedImage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Photo Found</h1>
          <p className="text-gray-600 mb-8">Please upload a property photo first.</p>
          <button
            onClick={() => router.push('/portal')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Back to Upload
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Submitted!</h1>
          <p className="text-gray-600 mb-8">Your property details have been successfully saved. You'll be redirected shortly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to Upload
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Preview */}
          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Property Photo</h2>
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                <img src={uploadedImage} alt="Property" className="w-full h-96 object-cover" />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-lg p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Property Details</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select property type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="commercial">Commercial</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleFormChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-150"
                    placeholder="0"
                  />
                </div>

                {/* Year Built */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year Built
                  </label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleFormChange}
                    min="1800"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-150"
                    placeholder={new Date().getFullYear().toString()}
                  />
                </div>
              </div>

              {/* Full Width Fields */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-150"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-150"
                    placeholder="New York"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-150"
                    placeholder="NY"
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-150"
                    placeholder="10001"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-150"
                  placeholder="Add any additional details about your property..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
              >
                Submit Property Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
