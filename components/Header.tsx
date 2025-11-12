import React from 'react';
import { BurgerIcon } from './Icons';

interface HeaderProps {
  currentPageName: string;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPageName, onMenuToggle }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-b border-gray-800 z-30 h-16 flex items-center px-4 md:px-6">
      <div className="flex items-center w-full">
        <button
          onClick={onMenuToggle}
          className="p-2 mr-4 text-gray-400 hover:text-green-400 transition-colors md:hidden"
          aria-label="Toggle menu"
        >
          <BurgerIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <h1 className="text-xl font-mono text-green-400">Bilyabits API / <span className="text-gray-300">{currentPageName}</span></h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
