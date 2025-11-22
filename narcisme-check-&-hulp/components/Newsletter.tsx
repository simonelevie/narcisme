
import React, { useState } from 'react';

interface NewsletterProps {
  resultTitle?: string;
  score?: number;
}

const Newsletter: React.FC<NewsletterProps> = ({ resultTitle, score }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('loading');
    
    try {
      // We sturen de data naar onze eigen API (Vercel serverless function)
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: name,
          email: email,
          resultTitle: resultTitle || 'Nog geen test gedaan', // Fallback voor intro scherm
          score: score || 0
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage("Yes! Je staat in ons systeem. Check je mail voor de uitslag! 💌");
        setName('');
        setEmail('');
      } else {
        throw new Error(data.error || 'Er ging iets mis');
      }
    } catch (error) {
      console.error(error);
      // Fallback bericht als er geen backend is (lokaal testen)
      setStatus('error');
      setMessage("Oeps! We konden geen verbinding maken met de server. (Controleer je API instellingen)");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 mb-8 w-full px-4">
      <div className="bg-yellow-100 rounded-3xl border-4 border-black p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 overflow-visible">
        
        {/* Decorative Tape */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pink-400 w-32 h-8 opacity-80 rotate-2 border-l-2 border-r-2 border-white/50"></div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Text Section */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-bold text-black comic-title mb-2">
              {resultTitle ? "📬 Ontvang je uitslag & tips!" : "💌 Blijf op de hoogte, schat!"}
            </h3>
            <p className="text-lg text-slate-800 font-medium leading-snug">
              {resultTitle 
                ? "Vul hieronder je gegevens in, dan stuur ik je de hele uitslag en een paar handige tips direct per mail." 
                : "Wil je meer tips van Tante Truus en updates over de app? Schrijf je in!"}
              <br/>
              <span className="text-pink-600 italic text-sm">(Geen spam, beloofd!)</span>
            </p>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-auto flex-1">
            {status === 'success' ? (
              <div className="bg-white p-6 rounded-xl border-2 border-black text-center animate-fade-in">
                <div className="text-4xl mb-2">🥳</div>
                <h4 className="font-bold text-xl text-green-600 comic-title">Geregeld!</h4>
                <p className="text-sm text-gray-600">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Hoe heet je?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 font-bold placeholder-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]"
                  required
                />
                <input
                  type="email"
                  placeholder="Je e-mailadres"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 font-bold placeholder-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]"
                  required
                />
                
                {status === 'error' && (
                  <div className="text-red-600 font-bold text-sm bg-red-100 p-2 rounded border border-red-400">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-pink-500 text-white font-bold text-xl rounded-xl border-2 border-black hover:bg-pink-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] font-['Bangers'] tracking-wide disabled:opacity-50 disabled:cursor-wait"
                >
                  {status === 'loading' ? 'Even geduld...' : resultTitle ? 'STUUR MIJN UITSLAG 🚀' : 'JA, GEZELLIG! ✍️'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
