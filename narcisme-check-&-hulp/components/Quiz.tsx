import React from 'react';
import { Question } from '../types';

interface QuizProps {
  questions: Question[];
  currentIndex: number;
  onAnswer: (answer: number) => void;
  answers: (number | null)[];
}

const Quiz: React.FC<QuizProps> = ({ questions, currentIndex, onAnswer, answers }) => {
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Progress Bar */}
      <div className="mb-8 w-full bg-white border-2 border-black rounded-full h-6 relative overflow-hidden comic-shadow-sm">
        <div 
          className="bg-yellow-400 h-full border-r-2 border-black transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="text-center font-bold text-pink-600 mb-4 text-xl comic-title">
          Vraag {currentIndex + 1} van {questions.length}
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl p-8 md:p-12 comic-border comic-shadow min-h-[300px] flex flex-col justify-center animate-fade-in relative overflow-hidden">
        
        {/* Decorative element */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pink-200 rounded-full opacity-50"></div>

        <h2 className="text-2xl md:text-3xl font-bold text-black mb-10 text-center leading-snug relative z-10">
          "{currentQuestion.text}"
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <button
            onClick={() => onAnswer(0)}
            className="group relative flex items-center justify-center py-4 px-6 bg-white border-4 border-black rounded-2xl hover:bg-red-100 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transform hover:-rotate-1"
          >
            <span className="text-2xl font-bold text-black group-hover:text-red-600 font-['Bangers'] tracking-wider">NEE, ZEKER NIET</span>
          </button>
          
          <button
            onClick={() => onAnswer(1)}
            className="group relative flex items-center justify-center py-4 px-6 bg-yellow-300 border-4 border-black rounded-2xl hover:bg-yellow-400 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transform hover:rotate-1"
          >
             <span className="text-2xl font-bold text-black group-hover:text-purple-700 font-['Bangers'] tracking-wider">JA, HELAAS WEL</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;