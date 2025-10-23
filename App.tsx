
import React, { useState, useCallback } from 'react';
import type { Style } from './types';
import { STYLES } from './constants';
import { stylizeImage } from './services/geminiService';
import { fileToBase64 } from './utils/imageUtils';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';

export default function App() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(STYLES[0]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB.');
      return;
    }
    setOriginalImage(file);
    setGeneratedImage(null);
    setError(null);
    try {
      const base64Preview = await fileToBase64(file);
      setOriginalImagePreview(base64Preview);
    } catch (err) {
      setError('Could not read image file.');
      console.error(err);
    }
  }, []);

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !selectedStyle) {
      setError('Please upload an image and select a style.');
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const base64Image = await fileToBase64(originalImage);
      const mimeType = originalImage.type;
      
      const { base64: imageData, mimeType: imageMimeType } = await stylizeImage(base64Image, mimeType, selectedStyle.prompt);
      setGeneratedImage(`data:${imageMimeType};base64,${imageData}`);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate image. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedStyle]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-6 p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-1">1. Upload Your Photo</h2>
              <p className="text-gray-400">Upload a clear photo of yourself (JPG or PNG, max 10MB).</p>
            </div>
            <ImageUploader onImageUpload={handleImageUpload} previewUrl={originalImagePreview} />
          </div>

          <div className="flex flex-col gap-6 p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-1">2. Choose a Style</h2>
              <p className="text-gray-400">Select a style to transform your photo.</p>
            </div>
            <StyleSelector styles={STYLES} selectedStyle={selectedStyle} onStyleSelect={setSelectedStyle} />
          </div>
        </div>

        <div className="w-full flex justify-center">
            <button
              onClick={handleGenerateClick}
              disabled={!originalImage || !selectedStyle || isLoading}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
            >
                <span className="absolute -inset-full top-0 block -translate-y-full rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 blur-2xl transition-all duration-500 group-hover:-translate-y-0 group-hover:scale-105"></span>
                <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine"></span>
                <SparklesIcon />
                <span className="relative">
                    {isLoading ? 'Generating...' : 'Generate Your Profile Picture'}
                </span>
            </button>
        </div>

        {error && <div className="mt-4 p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-lg">{error}</div>}

        {isLoading && <Loader />}
        
        {generatedImage && !isLoading && (
            <div className="w-full mt-4">
                 <ResultDisplay originalImage={originalImagePreview} generatedImage={generatedImage} />
            </div>
        )}
      </main>
    </div>
  );
}
