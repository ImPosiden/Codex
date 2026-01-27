'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, ArrowLeft, Home, Camera, Upload, X } from 'lucide-react';

interface Property {
  id?: string;
  propertyType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  yearBuilt: string;
  rooms: string;
  description: string;
  image?: string;
}

export default function MyPropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Property>({
    propertyType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    yearBuilt: '',
    rooms: '',
    description: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load properties from localStorage
    const saved = localStorage.getItem('submittedProperties');
    if (saved) {
      setProperties(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImage) {
      alert('Please upload a property photo');
      return;
    }

    const newProperty: Property = {
      ...formData,
      image: uploadedImage,
    };

    const updated = [...properties, newProperty];
    setProperties(updated);
    localStorage.setItem('submittedProperties', JSON.stringify(updated));

    // Reset form
    setShowAddForm(false);
    setUploadedImage(null);
    setFormData({
      propertyType: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      yearBuilt: '',
      rooms: '',
      description: '',
    });
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setUploadedImage(null);
    setFormData({
      propertyType: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      yearBuilt: '',
      rooms: '',
      description: '',
    });
  };

  const handleDeleteProperty = (index: number) => {
    const updated = properties.filter((_, i) => i !== index);
    setProperties(updated);
    localStorage.setItem('submittedProperties', JSON.stringify(updated));
  };

  const handleEditProperty = (index: number) => {
    // Store the property to edit and redirect
    localStorage.setItem('editingPropertyIndex', index.toString());
    router.push('/portal');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <button
          onClick={() => router.push('/portal')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Properties</h1>
          <p className="text-gray-600">Manage all your property listings</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              <Plus size={20} />
              Add New Property
            </button>
          </div>
        </div>

        {/* Add Property Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleAddPropertySubmit} className="p-6 space-y-6">
                {/* Photo Upload Section */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#333333' }}>
                    Property Photo *
                  </label>
                  {!uploadedImage ? (
                    <div className="grid grid-cols-2 gap-4">
                      {/* File Upload */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                      >
                        <Upload className="mx-auto text-blue-500 mb-3" size={32} />
                        <p className="font-semibold text-gray-900 mb-1 text-sm">Upload Photo</p>
                        <p className="text-xs text-black">Select from device</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>

                      {/* Camera Capture */}
                      <div
                        onClick={() => cameraInputRef.current?.click()}
                        className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
                      >
                        <Camera className="mx-auto text-green-500 mb-3" size={32} />
                        <p className="font-semibold text-gray-900 mb-1">Take Photo</p>
                        <p className="text-xs text-black">Capture with camera</p>
                        <input
                          ref={cameraInputRef}
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden bg-gray-100">
                        <img src={uploadedImage} alt="Property" className="w-full h-48 object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedImage(null)}
                        className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2 font-medium"
                      >
                        <X size={18} />
                        Change Photo
                      </button>
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>
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

                  {/* Rooms */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>
                      Rooms
                    </label>
                    <input
                      type="number"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleFormChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>



                  {/* Year Built */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>
                      Year Built
                    </label>
                    <input
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleFormChange}
                      min="1800"
                      max={new Date().getFullYear()}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={new Date().getFullYear().toString()}
                    />
                  </div>
                </div>

                {/* Full Width Fields */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="New York"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="NY"
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10001"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>
                    Additional Notes
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add any additional details about your property..."
                  />
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
                  >
                    Add Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Property Image */}
                {property.image && (
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={property.image}
                      alt={property.address}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Property Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{property.address}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {property.city}, {property.state} {property.zipCode}
                  </p>

                  {/* Quick Stats */}
                  <div className="mb-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{property.rooms || '—'}</p>
                      <p className="text-xs text-gray-600">Rooms</p>
                    </div>
                  </div>

                  {/* Property Info */}
                  {property.propertyType && (
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Type:</span> {property.propertyType}
                    </p>
                  )}
                  {property.yearBuilt && (
                    <p className="text-sm text-gray-700 mb-4">
                      <span className="font-semibold">Year Built:</span> {property.yearBuilt}
                    </p>
                  )}

                  {property.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {property.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditProperty(index)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(index)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Home className="mx-auto text-gray-400 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Properties Yet</h2>
            <p className="text-gray-600 mb-8">Start adding properties to build your portfolio</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              <Plus size={20} />
              Add Your First Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
