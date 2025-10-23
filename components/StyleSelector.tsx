
import React from 'react';
import type { Style } from '../types';

interface StyleSelectorProps {
  styles: Style[];
  selectedStyle: Style | null;
  onStyleSelect: (style: Style) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onStyleSelect(style)}
          className={`relative block rounded-lg overflow-hidden border-2 transition-transform duration-200 transform hover:scale-105 focus:outline-none ${selectedStyle?.id === style.id ? 'border-cyan-400 ring-2 ring-cyan-400' : 'border-gray-700 hover:border-gray-500'}`}
        >
          <img src={style.imageUrl} alt={style.name} className="w-full h-24 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <p className="absolute bottom-2 left-2 text-sm font-semibold text-white">{style.name}</p>
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;
