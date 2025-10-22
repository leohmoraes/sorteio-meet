import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useLocalStorageEvents } from '../hooks/useLocalStorage';
import type { Participant } from '../types';
import Card from '../components/Card';

const ParticipantPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [events, setEvents] = useLocalStorageEvents('events', {});
  const [name, setName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);

  const event = eventId ? events[eventId] : undefined;
  
  if (!eventId || !event) {
    return <Navigate to="/404" replace />;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Por favor, digite seu nome.");
      return;
    }
    
    const newParticipant: Participant = {
      id: `${Date.now()}-${Math.random()}`,
      name: name.trim(),
      timestamp: Date.now()
    };
    
    setEvents(prev => {
        const currentEvent = prev[eventId];
        if (currentEvent) {
            return {
                ...prev,
                [eventId]: {
                    ...currentEvent,
                    participants: [...currentEvent.participants, newParticipant]
                }
            };
        }
        return prev;
    });

    setHasJoined(true);
  };

  if (hasJoined) {
    return (
      <div className="max-w-md mx-auto text-center">
        <Card>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-secondary mb-4">Você está dentro!</h1>
            <p className="text-gray-300">Seu nome foi adicionado ao sorteio. Boa sorte!</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!event.isRegistrationOpen) {
    return (
      <div className="max-w-md mx-auto text-center">
        <Card>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-amber-500 mb-4">Inscrições Encerradas</h1>
            <p className="text-gray-300">Desculpe, as inscrições para "{event.title}" estão encerradas.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">{event.title}</h1>
          <p className="text-gray-400">Digite seu nome para participar do sorteio.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu Nome"
            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-colors duration-300"
          >
            Participar do Sorteio
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ParticipantPage;