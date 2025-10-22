import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white mb-4">Sorteio Não Encontrado</h2>
      <p className="text-gray-400 mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/" className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors">
        Ir para a Página Inicial
      </Link>
    </div>
  );
};

export default NotFoundPage;