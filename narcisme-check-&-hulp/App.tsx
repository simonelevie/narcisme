
import React, { useState } from 'react';
import { QUESTIONS, RESULTS } from './constants';
import { QuizState, QuizResult } from './types';
import Quiz from './components/Quiz';
import Results from './components/Results';
import ChatBot from './components/ChatBot';
import Newsletter from './components/Newsletter';

function App() {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.INTRO);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null));

  const handleStartQuiz = () => {
    setQuizState(QuizState.ACTIVE);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(QUESTIONS.length).fill(null));
  };

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 250); // Small delay for UX
    } else {
      setQuizState(QuizState.FINISHED);
    }
  };

  const calculateResult = (): { result: QuizResult; score: number } => {
    const score = answers.reduce((acc, curr) => acc! + (curr || 0), 0) || 0;
    
    let matched = RESULTS[0];
    for (const r of RESULTS) {
        if (score >= r.score && score <= r.maxScore) {
            matched = r;
            break;
        }
    }
    return { result: matched, score };
  };

  const handleRestart = () => {
    setQuizState(QuizState.INTRO);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-pink-50 text-slate-900">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-yellow-200 border-4 border-black opacity-40"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-pink-200 border-4 border-black opacity-40"></div>
        <div className="absolute bottom-20 right-40 w-40 h-40 bg-blue-200 rounded-full border-4 border-black opacity-40"></div>
        
        {/* Polka dots pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <header className="relative z-10 p-6 flex justify-center items-center">
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 cursor-pointer" onClick={handleRestart}>
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl border-2 border-black">N</div>
            <h1 className="text-3xl font-bold text-black tracking-wide comic-title">Narcisme Check</h1>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-[80vh]">
        
        {quizState === QuizState.INTRO && (
          <div className="max-w-3xl text-center animate-fade-in mt-6 md:mt-10 w-full">
            <div className="inline-block bg-yellow-300 px-4 py-1 border-2 border-black rounded-lg font-bold text-sm mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform rotate-3">
                ✨ Speciaal voor jou! ✨
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-black mb-6 leading-none comic-title text-stroke-white drop-shadow-md">
              Heb jij een <span className="text-pink-600 underline decoration-wavy decoration-4">narcist</span> in huis? 🏠
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-10 leading-relaxed max-w-2xl mx-auto font-medium bg-white/80 p-4 rounded-xl backdrop-blur-sm border-2 border-transparent">
              Twijfel je wel eens aan je huisgenoot of partner? Doet-ie soms raar? <br/>
              Doe gezellig mee met onze check van 20 vragen! 
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button
                onClick={handleStartQuiz}
                className="px-10 py-5 bg-pink-500 text-white rounded-2xl border-4 border-black font-bold text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-600 hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 font-['Bangers'] tracking-widest"
              >
                DOE DE TEST! 🚀
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto mb-16">
                <div className="bg-white p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 hover:rotate-0 transition-transform">
                    <div className="w-12 h-12 bg-yellow-300 rounded-full border-2 border-black flex items-center justify-center text-black mb-4 text-2xl">
                        🤫
                    </div>
                    <h3 className="font-bold text-xl text-black mb-2 comic-title">Lekker Anoniem</h3>
                    <p className="text-base text-slate-600">Niemand die het ziet. Gewoon even checken voor jezelf.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 hover:rotate-0 transition-transform">
                    <div className="w-12 h-12 bg-blue-300 rounded-full border-2 border-black flex items-center justify-center text-black mb-4 text-2xl">
                         ⚡️
                    </div>
                    <h3 className="font-bold text-xl text-black mb-2 comic-title">Snel Duidelijkheid</h3>
                    <p className="text-base text-slate-600">Binnen 2 minuten weet je of je gek bent of dat er toch iets niet klopt.</p>
                </div>
                 <div className="bg-white p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-2 hover:rotate-0 transition-transform">
                    <div className="w-12 h-12 bg-pink-300 rounded-full border-2 border-black flex items-center justify-center text-black mb-4 text-2xl">
                         👯‍♀️
                    </div>
                    <h3 className="font-bold text-xl text-black mb-2 comic-title">Je Eigen Vriendin</h3>
                    <p className="text-base text-slate-600">Praat na afloop even na met onze gezellige AI-tante voor tips.</p>
                </div>
            </div>

            <Newsletter />

          </div>
        )}

        {quizState === QuizState.ACTIVE && (
          <Quiz
            questions={QUESTIONS}
            currentIndex={currentQuestionIndex}
            onAnswer={handleAnswer}
            answers={answers}
          />
        )}

        {quizState === QuizState.FINISHED && (
          <div className="w-full">
            <Results
              result={calculateResult().result}
              totalScore={calculateResult().score}
              onRestart={handleRestart}
            />
            {/* Also show newsletter on results page for engagement, passing the result */}
             <div className="mt-12">
                <Newsletter 
                    resultTitle={calculateResult().result.title} 
                    score={calculateResult().score}
                />
             </div>
          </div>
        )}

      </main>
      
      <ChatBot />
    </div>
  );
}

export default App;
