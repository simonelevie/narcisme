import React, { useState, useRef, useEffect } from 'react';
import { getChatSession } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from "@google/genai";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hoi lieverd! 👋 Ik ben je virtuele praatpaal. Heb je vragen over de test of wil je gewoon even je hart luchten? Vertel het me!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chat = getChatSession();
      const resultStream = await chat.sendMessageStream({ message: userMessage.text });

      const botMessageId = (Date.now() + 1).toString();
      
      // Add initial empty bot message
      setMessages((prev) => [
        ...prev,
        { id: botMessageId, role: 'model', text: '', isStreaming: true },
      ]);

      let fullText = '';

      for await (const chunk of resultStream) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text || '';
        fullText += textChunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: fullText }
              : msg
          )
        );
      }

       setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, isStreaming: false }
              : msg
          )
        );

    } catch (error) {
      console.error("Chat error", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'model',
          text: 'Oepsie, er ging even iets mis. Probeer het zo nog eens!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full comic-shadow transition-all duration-300 transform hover:scale-110 flex items-center justify-center comic-border ${
          isOpen ? 'bg-yellow-400 rotate-12' : 'bg-pink-500 hover:bg-pink-400 -rotate-3'
        } text-white`}
        aria-label="Open Chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 md:right-6 w-80 md:w-96 bg-white rounded-3xl comic-shadow z-40 flex flex-col transition-all duration-300 transform comic-border overflow-hidden ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-10 pointer-events-none scale-95'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-yellow-400 p-4 border-b-4 border-black flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-500 rounded-full border-2 border-black flex items-center justify-center text-white font-bold text-xl">
             AI
          </div>
          <div className="font-bold text-xl text-black tracking-wide comic-title">Je Chatvriendin</div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pink-50 scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-3 text-lg font-medium border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] ${
                  msg.role === 'user'
                    ? 'bg-pink-500 text-white rounded-2xl rounded-br-none'
                    : 'bg-white text-black rounded-2xl rounded-bl-none'
                }`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < msg.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
                {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-black animate-pulse"/>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-yellow-50 border-t-4 border-black">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Zeg het maar..."
              className="flex-1 p-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-black font-medium placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-pink-500 text-white rounded-xl border-2 border-black hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBot;