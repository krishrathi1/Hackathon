import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mic, MapPin, Send, Star } from 'lucide-react';
import ProblemCategories from '../components/ProblemCategories';
import LocationPicker from '../components/LocationPicker';
import GamificationPanel from '../components/GamificationPanel';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const ReportProblem: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    severity: 3,
    location: '',
    photo: null as File | null,
  });

  const [isRecording, setIsRecording] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let photoURL = '';
      if (formData.photo) {
        const photoRef = ref(storage, `photos/${formData.photo.name}-${Date.now()}`);
        await uploadBytes(photoRef, formData.photo);
        photoURL = await getDownloadURL(photoRef);
      }

      const submission = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        severity: formData.severity,
        location: formData.location,
        photo_url: photoURL,
        created_at: Timestamp.now(),
        processed: false,
        status: 'pending',
      };

      await addDoc(collection(db, 'raw_submissions'), submission);
      alert('✅ Report submitted successfully!');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('❌ Failed to submit report.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Citizen Voice Portal
                </h1>
                <p className="text-gray-600">
                  Your voice matters. Report issues and help build a better community.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                          currentStep >= step
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-16 h-1 rounded ${
                            currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Problem Details */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-3">
                        Problem Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Brief description of the issue"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-3">
                        Detailed Description
                      </label>
                      <div className="relative">
                        <textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Provide detailed information about the problem"
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg resize-none"
                        />
                        <button
                          type="button"
                          onClick={() => setIsRecording(!isRecording)}
                          className={`absolute bottom-4 right-4 p-2 rounded-full ${
                            isRecording
                              ? 'bg-red-500 text-white animate-pulse'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          } transition-all duration-200`}
                        >
                          <Mic className="w-5 h-5" />
                        </button>
                      </div>
                      {isRecording && (
                        <p className="text-red-600 text-sm mt-2 animate-pulse">
                          🎙️ Voice recording in progress...
                        </p>
                      )}
                    </div>

                    <ProblemCategories
                      selectedCategory={formData.category}
                      onCategoryChange={(category) => handleInputChange('category', category)}
                    />
                  </motion.div>
                )}

                {/* Step 2: Photo & Location */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-3">
                        Photo Evidence
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoCapture}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Click to capture or upload photo</p>
                          <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                        </label>
                        {formData.photo && (
                          <p className="text-green-600 mt-2">✅ Photo uploaded successfully</p>
                        )}
                      </div>
                    </div>

                    <LocationPicker
                      onLocationChange={(location) => handleInputChange('location', location)}
                    />

                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-3">
                        Severity Level: {formData.severity}/5
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={formData.severity}
                        onChange={(e) => handleInputChange('severity', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>Low</span>
                        <span>Critical</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review & Submit */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-4">Review Your Report</h3>
                      <div className="space-y-4">
                        <div>
                          <span className="font-medium text-gray-600">Title:</span>
                          <p className="text-gray-900">{formData.title || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Category:</span>
                          <p className="text-gray-900">{formData.category || 'Not selected'}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Severity:</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < formData.severity
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <Send className="mr-3 w-6 h-6" />
                      Submit Report
                    </button>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="px-6 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  {currentStep < 3 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      className="ml-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Next Step
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <GamificationPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportProblem;