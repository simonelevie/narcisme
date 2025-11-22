import React from 'react';
import { QuizResult } from '../types';

interface ResultsProps {
  result: QuizResult;
  totalScore: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, totalScore, onRestart }) => {
  
  const getScoreColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-900 border-green-900';
      case 'moderate': return 'bg-yellow-100 text-yellow-900 border-yellow-900';
      case 'high': return 'bg-orange-100 text-orange-900 border-orange-900';
      case 'severe': return 'bg-red-100 text-red-900 border-red-900';
      default: return 'bg-slate-100';
    }
  };

  const getHeaderColor = (level: string) => {
     switch (level) {
      case 'low': return 'bg-green-400';
      case 'moderate': return 'bg-yellow-400';
      case 'high': return 'bg-orange-400';
      case 'severe': return 'bg-red-500 text-white';
      default: return 'bg-slate-400';
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full animate-fade-in-up">
      <div className="bg-white rounded-3xl p-0 comic-border comic-shadow overflow-hidden text-center">
        
        <div className={`p-6 border-b-4 border-black ${getHeaderColor(result.level)}`}>
            <span className="text-lg font-bold uppercase tracking-wider opacity-80 comic-title">De Uitslag is binnen!</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 comic-title transform -rotate-2">{result.title}</h2>
        </div>

        <div className="p-8 md:p-12">
            <div className="text-2xl font-bold text-black mb-2">Jouw Score: {totalScore} / 20</div>
            <div className="w-full bg-gray-200 rounded-full h-6 border-2 border-black mb-8 overflow-hidden">
                <div 
                    className={`h-full border-r-2 border-black ${getHeaderColor(result.level)}`}
                    style={{ width: `${(totalScore / 20) * 100}%` }}
                ></div>
            </div>

            <div className={`p-6 rounded-2xl border-4 border-black mb-8 relative ${getScoreColor(result.level)} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1`}>
                 {/* Speech bubble tail */}
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 border-t-4 border-l-4 border-black bg-inherit rotate-45`}></div>
                <p className="text-xl font-medium leading-relaxed">
                    "{result.description}"
                </p>
            </div>

            <div className="text-left bg-blue-50 p-4 rounded-xl border-2 border-black border-dashed mb-8 relative">
                <div className="absolute -top-3 -left-3 bg-blue-400 text-white px-3 py-1 border-2 border-black font-bold rounded-lg transform -rotate-6 text-sm">LET OP</div>
                <p className="font-medium mt-2"><strong>Even serieus:</strong> Dit is natuurlijk maar een testje op internet. Als je echt in de knoop zit, ga dan alsjeblieft naar de dokter of zoek hulp. Je staat er niet alleen voor! ❤️</p>
            </div>

            <button
            onClick={onRestart}
            className="inline-flex items-center justify-center px-8 py-4 border-4 border-black text-xl font-bold rounded-2xl text-white bg-pink-500 hover:bg-pink-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] hover:-rotate-1"
            >
            Nog een keer! 🔄
            </button>
        </div>
      </div>

      <div className="mt-10 text-center">
          <p className="text-lg font-bold text-purple-900">Wil je erover praten? <br/>Klik op de <span className="text-pink-600 underline decoration-wavy">AI Vriendin</span> rechtsonder! 👇</p>
      </div>
    </div>
  );
};

export default Results;