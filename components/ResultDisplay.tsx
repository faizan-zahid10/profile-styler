
import React from 'react';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage }) => {
  if (!generatedImage) return null;

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `stylized-profile-picture.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-center text-cyan-400 mb-6">Your New Profile Picture!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Original</h3>
          <img src={originalImage || ''} alt="Original" className="rounded-lg w-full max-w-sm mx-auto aspect-square object-cover" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Stylized</h3>
          <img src={generatedImage} alt="Generated" className="rounded-lg w-full max-w-sm mx-auto aspect-square object-cover" />
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={downloadImage}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Image
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
