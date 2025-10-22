import React from 'react';
import { TrophyIcon } from './icons/TrophyIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-800 shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <TrophyIcon className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-white ml-3">
          SorteioMeet
        </h1>
      </div>
    </header>
  );
};

export default Header;