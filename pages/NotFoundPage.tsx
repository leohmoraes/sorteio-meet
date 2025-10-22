
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white mb-4">Raffle Not Found</h2>
      <p className="text-gray-400 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
