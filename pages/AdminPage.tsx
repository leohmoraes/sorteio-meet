import React, { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useLocalStorageEvents } from '../hooks/useLocalStorage';
import Card from '../components/Card';
import { ClipboardIcon } from '../components/icons/ClipboardIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { TrophyIcon } from '../components/icons/TrophyIcon';
import { PlusIcon } from '../components/icons/PlusIcon';

const AdminPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [events, setEvents] = useLocalStorageEvents('events', {});
  const [copied, setCopied] = useState(false);

  const event = eventId ? events[eventId] : undefined;

  const joinUrl = useMemo(() => {
    if (!eventId) return '';
    const url = new URL(window.location.href);
    url.hash = `/join/${eventId}`;
    return url.href;
  }, [eventId]);

  const nonWinnerParticipants = useMemo(() => {
    if (!event) return [];
    const winnerIds = new Set(event.winners.map(w => w.id));
    return event.participants.filter(p => !winnerIds.has(p.id));
  }, [event]);

  if (!eventId || !event) {
    return <Navigate to="/404" replace />;
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateEvent = (updates: Partial<typeof event>) => {
    setEvents(prev => ({ ...prev, [eventId]: { ...event, ...updates } }));
  };

  const drawWinners = (count: number) => {
    const eligible = nonWinnerParticipants;
    if (eligible.length === 0) {
        alert("Não há participantes disponíveis para sortear.");
        return;
    }

    const countToDraw = Math.min(count, eligible.length);
    const shuffled = [...eligible].sort(() => 0.5 - Math.random());
    const newWinners = shuffled.slice(0, countToDraw);
    
    updateEvent({ winners: [...event.winners, ...newWinners] });
  };
  
  const handleTagChange = (winnerId: string, tag: string) => {
    const updatedWinners = event.winners.map(w => w.id === winnerId ? { ...w, tag } : w);
    updateEvent({ winners: updatedWinners });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
        <p className="text-gray-400">Painel de administração para o seu sorteio.</p>
      </div>
      
      <Card>
        <h3 className="font-bold text-lg mb-4">Compartilhe para Inscrição</h3>
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-grow w-full">
                <p className="text-sm font-medium text-gray-400 mb-2">Copie e compartilhe o link:</p>
                <div className="flex items-center space-x-2 bg-dark-900 p-3 rounded-md">
                    <input type="text" readOnly value={joinUrl} className="flex-grow bg-transparent text-gray-300 outline-none"/>
                    <button onClick={copyToClipboard} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors text-sm flex items-center shrink-0">
                        <ClipboardIcon className="h-4 w-4 mr-2"/>
                        {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                </div>
            </div>
            <div className="text-center">
                <p className="text-sm font-medium text-gray-400 mb-2">Ou escaneie o QR Code:</p>
                <div className="bg-white p-2 rounded-md inline-block shadow-md">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(joinUrl)}&qzone=1`} 
                        alt="QR Code do link de inscrição" 
                        width="128" 
                        height="128" 
                    />
                </div>
            </div>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card title="Controles" className="h-fit">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="registration-toggle" className="font-medium">Inscrições Abertas</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="registration-toggle" className="sr-only peer" checked={event.isRegistrationOpen} onChange={e => updateEvent({ isRegistrationOpen: e.target.checked })} />
                <div className="w-11 h-6 bg-dark-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="winner-count" className="font-medium">Ganhadores Iniciais a Sortear</label>
              <input 
                id="winner-count" 
                type="number"
                min="1"
                value={event.initialWinnerCount}
                onChange={e => updateEvent({ initialWinnerCount: Math.max(1, parseInt(e.target.value) || 1)})}
                className="w-20 bg-dark-700 border border-dark-600 rounded-md p-2 text-center"
              />
            </div>
             <button onClick={() => drawWinners(event.initialWinnerCount)} disabled={nonWinnerParticipants.length === 0} className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-dark-600 disabled:cursor-not-allowed">
              Sortear {event.initialWinnerCount} Ganhador(es)
            </button>
          </div>
        </Card>

        <Card title="Ganhadores" icon={<TrophyIcon className="h-6 w-6" />}>
          {event.winners.length > 0 ? (
            <div className="space-y-3">
              <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {event.winners.map((winner, index) => (
                  <li key={winner.id} className="bg-dark-700 p-3 rounded-md flex items-center justify-between gap-4">
                    <div className="flex items-center overflow-hidden">
                      <span className="text-sm font-bold text-amber-400 mr-3 shrink-0">#{index + 1}</span>
                      <span className="font-semibold truncate" title={winner.name}>{winner.name}</span>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Adicionar tag..." 
                      value={winner.tag || ''} 
                      onChange={e => handleTagChange(winner.id, e.target.value)} 
                      aria-label={`Tag para ${winner.name}`}
                      className="text-right text-sm bg-dark-600 rounded-md px-2 py-1 border border-dark-600 focus:border-primary focus:outline-none w-36 transition-colors"
                    />
                  </li>
                ))}
              </ul>
              {nonWinnerParticipants.length > 0 && (
                <button onClick={() => drawWinners(1)} className="w-full mt-4 bg-primary/20 border border-primary text-primary font-bold py-2 px-4 rounded-md hover:bg-primary/30 transition-colors flex items-center justify-center">
                  <PlusIcon className="h-5 w-5 mr-2" /> Sortear +1 Ganhador
                </button>
              )}
            </div>
          ) : (
            <p className="text-gray-400">Nenhum ganhador sorteado ainda.</p>
          )}
        </Card>
      </div>

      <Card title="Participantes" icon={<UsersIcon className="h-6 w-6" />}>
        <div className="flex justify-between items-baseline mb-2">
            <p className="text-gray-400">Total: {event.participants.length}</p>
            <p className="text-gray-400">Restantes para sortear: {nonWinnerParticipants.length}</p>
        </div>
        {event.participants.length > 0 ? (
          <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {event.participants.map(p => (
              <li key={p.id} className={`bg-dark-700 p-3 rounded-md ${event.winners.some(w => w.id === p.id) ? 'line-through text-gray-500' : ''}`}>
                {p.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhum participante entrou ainda.</p>
        )}
      </Card>
    </div>
  );
};

export default AdminPage;