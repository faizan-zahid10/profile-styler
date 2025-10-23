
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 sm:mb-12">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          AI Profile Picture Styler
        </span>
      </h1>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Breathe new life into your profile picture. Upload a photo, select a style, and let our AI work its magic.
      </p>
    </header>
  );
};

export default Header;
