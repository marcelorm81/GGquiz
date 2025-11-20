
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GameState, Question } from './types';
import { INITIAL_QUESTIONS, POOL_QUESTIONS, BACKGROUND_POOL, INTRO_BG_IMAGE, INTRO_BG_VIDEO, RESULT_BG_MEDIA } from './constants';
import StartScreen from './components/StartScreen';
import QuizCard from './components/QuizCard';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  // Track if the game has been played at least once to trigger randomization on subsequent runs
  const [isFirstRun, setIsFirstRun] = useState(true);
  
  // State to hold the active set of questions
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  
  const bgContainerRef = useRef<HTMLDivElement>(null);

  // Fisher-Yates shuffle helper
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    
    if (isFirstRun) {
      // First time: Use the fixed initial set
      setActiveQuestions(INITIAL_QUESTIONS);
      setIsFirstRun(false);
    } else {
      // Subsequent times: Shuffle pool and pick 5
      const shuffledPool = shuffleArray(POOL_QUESTIONS);
      const selectedRaw = shuffledPool.slice(0, 5);
      
      // Map raw data to full Question objects with IDs and Backgrounds
      // We cycle through BACKGROUND_POOL for images
      const newQuestions: Question[] = selectedRaw.map((q, index) => ({
        id: index + 1,
        text: q.text!,
        options: q.options!,
        // Cycle through backgrounds: 0, 1, 2, 3, 4
        backgroundImage: BACKGROUND_POOL[index % BACKGROUND_POOL.length]
      }));
      
      setActiveQuestions(newQuestions);
    }

    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < activeQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setGameState('finished');
    }
  };

  // Determine current background media type and source
  const currentMedia = useMemo(() => {
    if (gameState === 'start') return { type: 'video', src: INTRO_BG_VIDEO };
    if (gameState === 'finished') return { type: 'video', src: RESULT_BG_MEDIA };
    
    // Safe check in case activeQuestions isn't ready
    const currentQ = activeQuestions[currentQuestionIndex];
    return { type: 'image', src: currentQ ? currentQ.backgroundImage : INTRO_BG_IMAGE };
  }, [gameState, currentQuestionIndex, activeQuestions]);

  // Elegant GSAP Cross-fade logic for background (supports Image and Video)
  useEffect(() => {
    if (!bgContainerRef.current) return;
    
    const container = bgContainerRef.current;
    let newBg: HTMLElement;
    
    // Create appropriate element based on media type
    if (currentMedia.type === 'video') {
        const video = document.createElement('video');
        video.src = currentMedia.src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true; // Required for autoplay
        video.playsInline = true; // Required for mobile iOS
        video.className = "absolute top-0 left-0 w-full h-full object-cover grayscale";
        newBg = video;
    } else {
        const div = document.createElement('div');
        div.style.backgroundImage = `url(${currentMedia.src})`;
        div.className = "absolute top-0 left-0 w-full h-full bg-cover bg-center grayscale";
        newBg = div;
    }
    
    newBg.style.opacity = "0";
    newBg.style.zIndex = "1"; // Ensure it sits on top of the old one (if any)
    
    // Append to DOM
    container.appendChild(newBg);

    // Ensure video plays if applicable
    if (newBg instanceof HTMLVideoElement) {
        newBg.play().catch(e => console.log("Video autoplay prevented:", e));
    }

    // Animate in
    window.gsap.to(newBg, {
      opacity: 1,
      duration: 2.0, // Slow, elegant fade
      ease: "power2.inOut",
      onComplete: () => {
        // Cleanup: Remove all previous background layers, keeping only the new one
        // We iterate backwards to safely remove children while preserving the last one (newBg)
        while (container.firstChild && container.firstChild !== newBg) {
            container.removeChild(container.firstChild);
        }
      }
    });

  }, [currentMedia]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black text-white overflow-hidden selection:bg-white selection:text-black flex flex-col">
      
      {/* Background Container for GSAP Transitions */}
      <div ref={bgContainerRef} className="absolute top-0 left-0 w-full h-full z-0" />
      
      {/* Dark Overlay for Readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-0 pointer-events-none" />

      {/* Atmospheric Grain/Texture feel */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMzMzIiAvPgo8L3N2Zz4=')] opacity-20 pointer-events-none z-0"></div>

      {/* Main Content Area - use flex-1 to fill available space between header/footer if needed, but primarily center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full h-full p-4 md:p-8">
        
        {/* Header / Logo Area - Positioned absolutely but responsive. Only show on finished. */}
        {gameState === 'finished' && (
          <div className="absolute top-6 md:top-12 left-0 w-full flex justify-center pointer-events-none z-20">
             <span className="text-white/50 tracking-[0.4em] text-[9px] md:text-[10px] uppercase border-b border-white/20 pb-2 drop-shadow-md">Final Score</span>
          </div>
        )}

        {gameState === 'start' && (
          <StartScreen onStart={startGame} />
        )}

        {gameState === 'playing' && (
          <QuizCard
            key={currentQuestionIndex}
            question={activeQuestions[currentQuestionIndex]}
            currentNumber={currentQuestionIndex + 1}
            totalQuestions={activeQuestions.length}
            onAnswer={handleAnswer}
          />
        )}

        {gameState === 'finished' && (
          <ResultCard
            score={score}
            total={activeQuestions.length}
            onRestart={startGame}
          />
        )}
      </div>
    </div>
  );
};

export default App;
