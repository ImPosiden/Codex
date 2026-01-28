'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload, CheckCircle, X, ArrowRight, Home, AlertTriangle, Loader2 } from 'lucide-react';

export default function PortalHome() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [submittedProperties, setSubmittedProperties] = useState<any[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load submitted properties from localStorage
    const saved = localStorage.getItem('submittedProperties');
    if (saved) {
      setSubmittedProperties(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageData = reader.result as string;
        setUploadedImage(imageData);
        
        // Store image immediately after setting it
        localStorage.setItem('propertyImage', imageData);
        
        // Analyze image with FastAPI backend
        await analyzeImage(file, imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (file: File, imageData: string) => {
    setIsAnalyzing(true);
    setAnalysisError('');
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysisResult(result);
      
      // Store analysis result in localStorage
      localStorage.setItem('analysisResult', JSON.stringify(result));
      
    } catch (error: any) {
      console.error('Analysis failed:', error);
      setAnalysisError(error.message || 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setAnalysisError('');
    localStorage.removeItem('propertyImage');
    localStorage.removeItem('analysisResult');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <h1 className="text-2xl font-bold text-gray-900">Property Portal</h1>
          <button
            onClick={() => router.push('/portal/my-properties')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            <Home size={18} />
            My Properties
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12 pt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Property Assessment
          </h1>
          <p className="text-xl text-gray-600">
            Upload a photo of your property to get started
          </p>
        </div>

        {/* Centered Upload Widget */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-lg shadow-lg p-10 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Property Photo</h2>

              {!uploadedImage ? (
                <div className="grid grid-cols-2 gap-4">
                  {/* File Upload */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <Upload className="mx-auto text-blue-500 mb-3" size={36} />
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
                    <Camera className="mx-auto text-green-500 mb-3" size={36} />
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
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100">
                    <img src={uploadedImage} alt="Property" className="w-full h-64 object-cover" />
                  </div>
                  
                  {/* Analysis Loading State */}
                  {isAnalyzing && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                      <Loader2 className="text-blue-600 flex-shrink-0 animate-spin" size={24} />
                      <div>
                        <p className="font-semibold text-blue-900">Analyzing Image...</p>
                        <p className="text-sm text-blue-700">AI is checking for structural defects</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Analysis Error */}
                  {analysisError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                      <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                      <div>
                        <p className="font-semibold text-red-900">Analysis Failed</p>
                        <p className="text-sm text-red-700">{analysisError}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Analysis Results */}
                  {analysisResult && !isAnalyzing && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                      <h3 className="font-bold text-gray-900 text-lg">AI Analysis Results</h3>
                      
                      {/* Risk Assessment */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">Risk Level</p>
                          <p className="text-sm text-gray-600">{analysisResult.analysis?.summary}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          analysisResult.analysis?.risk_level === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                          analysisResult.analysis?.risk_level === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                          analysisResult.analysis?.risk_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {analysisResult.analysis?.risk_level}
                        </div>
                      </div>
                      
                      {/* Risk Score */}
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-2">Risk Score: {analysisResult.analysis?.risk_score}/100</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              (analysisResult.analysis?.risk_score || 0) >= 80 ? 'bg-red-500' :
                              (analysisResult.analysis?.risk_score || 0) >= 60 ? 'bg-orange-500' :
                              (analysisResult.analysis?.risk_score || 0) >= 30 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${analysisResult.analysis?.risk_score || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Recommendations */}
                      {analysisResult.analysis?.recommendations && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-semibold text-blue-900 mb-2">Recommendations</p>
                          <ul className="text-sm text-blue-800 space-y-1">
                            {analysisResult.analysis.recommendations.map((rec: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Urgency */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold text-gray-900">Urgency Level:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          analysisResult.analysis?.urgency === 'IMMEDIATE' ? 'bg-red-100 text-red-800' :
                          analysisResult.analysis?.urgency === 'URGENT' ? 'bg-orange-100 text-orange-800' :
                          analysisResult.analysis?.urgency === 'MODERATE' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {analysisResult.analysis?.urgency}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={handleClearImage}
                    className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2 font-medium"
                  >
                    <X size={18} />
                    Clear & Upload New
                  </button>
                  
                  {(analysisResult || analysisError) && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 mb-4">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                      <div>
                        <p className="font-semibold text-black">Analysis Complete</p>
                        <p className="text-sm text-black">Click next to save property details</p>
                      </div>
                    </div>
                  )}
                  
                  {(analysisResult || analysisError) && (
                    <button
                      onClick={() => {
                        localStorage.setItem('propertyImage', uploadedImage);
                        if (analysisResult) {
                          localStorage.setItem('analysisResult', JSON.stringify(analysisResult));
                        }
                        router.push('/portal/property-form');
                      }}
                      className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-2"
                    >
                      Next: Property Details
                      <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submitted Properties */}
        {submittedProperties.length > 0 && (
          <div className="mt-8 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {submittedProperties.map((property, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="relative h-48 bg-gray-200">
                    <img src={property.image} alt={property.address} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{property.address}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {property.city}, {property.state} {property.zipCode}
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{property.bedrooms || '—'}</p>
                        <p className="text-xs text-gray-600">Beds</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{property.bathrooms || '—'}</p>
                        <p className="text-xs text-gray-600">Baths</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{property.squareFootage || '—'}</p>
                        <p className="text-xs text-gray-600">Sqft</p>
                      </div>
                    </div>
                    {property.propertyType && (
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Type:</span> {property.propertyType}
                      </p>
                    )}
                    {property.yearBuilt && (
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Year Built:</span> {property.yearBuilt}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
