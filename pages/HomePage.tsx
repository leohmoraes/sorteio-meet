import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorageEvents } from '../hooks/useLocalStorage';
import { generateHash } from '../utils/helpers';
import type { EventData } from '../types';
import Card from '../components/Card';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useLocalStorageEvents('events', {});
  const [title, setTitle] = useState('');

  const createEvent = () => {
    if (!title.trim()) {
        alert("Por favor, insira um título para o seu sorteio.");
        return;
    }
    let newId = generateHash();
    while (events[newId]) {
      newId = generateHash();
    }
    
    const newEvent: EventData = {
      id: newId,
      title: title.trim(),
      participants: [],
      winners: [],
      isRegistrationOpen: true,
      initialWinnerCount: 1,
    };

    setEvents(prevEvents => ({
      ...prevEvents,
      [newId]: newEvent,
    }));

    navigate(`/admin/${newId}`);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Crie um Sorteio Privado</h1>
      <p className="text-lg text-gray-400 mb-8">
        Crie instantaneamente uma lista privada para seu sorteio. Compartilhe o link exclusivo e sorteie os vencedores com um clique.
      </p>
      <Card className="w-full">
        <div className="flex flex-col gap-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o Título do Sorteio (ex: 'Almoço Semanal da Equipe')"
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
            onClick={createEvent}
            className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300 text-lg shadow-lg"
            >
            Criar Novo Sorteio
            </button>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;