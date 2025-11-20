
import React, { useEffect, useRef, useState } from 'react';
import { Question } from '../types';

interface QuizCardProps {
  question: Question;
  currentNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, currentNumber, totalQuestions, onAnswer }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Reset state when question changes
    setHasSubmitted(false);
    setSelectedId(null);
    setIsProcessing(false);

    const ctx = window.gsap.context(() => {
      const tl = window.gsap.timeline();
      
      // Calmer, slower entrance
      tl.fromTo(containerRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" }
      )
      .fromTo(".question-meta",
        { opacity: 0 },
        { opacity: 1, duration: 1.0 },
        "-=0.8"
      )
      // Elegant word-by-word reveal with subtle blur
      .fromTo(".word-span",
        { opacity: 0, y: 15, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.05, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(".option-btn",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [question]);

  const handleOptionClick = (optionId: string, isCorrect: boolean) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setSelectedId(optionId);
    setHasSubmitted(true);

    // Wait longer (1.5s) to allow user to see the feedback
    setTimeout(() => {
      if (containerRef.current) {
        // Use selector scoping for robustness
        const q = window.gsap.utils.selector(containerRef);
        const tl = window.gsap.timeline({
          onComplete: () => {
            onAnswer(isCorrect);
          }
        });

        // Elegant exit: Fade words out with blur (mirroring entrance)
        tl.to(q(".word-span"), {
          opacity: 0,
          y: -10, // Float up slightly as they dissolve
          filter: "blur(6px)",
          duration: 0.6,
          stagger: 0.02, // Slightly faster stagger for exit
          ease: "power2.in"
        })
        // Fade out options
        .to(q(".option-btn"), {
          opacity: 0,
          y: 10,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.in"
        }, "<") // Start at the same time as words
        // Ensure container is fully gone
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        }, "-=0.2");
      }
    }, 1500);
  };

  return (
    <div ref={containerRef} className="w-full max-w-4xl flex flex-col items-center justify-center h-full opacity-0 py-2">
      <div className="question-meta mb-6 md:mb-12 opacity-0 shrink-0">
        <span className="text-white/60 text-[9px] md:text-[10px] tracking-[0.4em] uppercase border-b border-white/20 pb-2">
          No. {currentNumber} of {totalQuestions}
        </span>
      </div>

      <h2 className="question-text text-[2.2rem] md:text-5xl text-white text-center leading-[1.1] md:leading-[1.1] mb-10 md:mb-20 font-normal max-w-3xl shrink-0">
        {question.text.split(" ").map((word, i) => (
            <span key={i} className="word-span inline-block opacity-0 mr-[0.25em]">
                {word}
            </span>
        ))}
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 shrink-0">
        {question.options.map((option) => {
          const isSelected = selectedId === option.id;
          const isOptionCorrect = option.isCorrect;
          
          // Dynamic Style Logic for Feedback
          let btnClasses = 'bg-transparent border-white/30 hover-enabled text-white'; // Default - hover only on hover-capable devices
          let textClasses = 'text-white/90 hover-enabled-text';
          
          if (hasSubmitted) {
            if (isSelected) {
              if (isOptionCorrect) {
                // User Selected Correct: Solid White
                btnClasses = 'bg-white border-white text-black';
                textClasses = 'text-black';
              } else {
                // User Selected Wrong: Discreet Red
                // Using a subtle red border and red text to indicate error elegantly
                btnClasses = 'bg-transparent border-red-500/40 text-red-400';
                textClasses = 'text-red-400';
              }
            } else {
              // Not Selected: Fade away regardless of correctness
              // We do NOT reveal the correct answer here
              btnClasses = 'bg-transparent border-white/10 text-white/10 opacity-30';
              textClasses = 'text-white/10';
            }
          } else if (isSelected) {
             // Fallback for pre-submission
             btnClasses = 'bg-white border-white text-black';
             textClasses = 'text-black';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id, option.isCorrect)}
              disabled={isProcessing}
              className={`option-btn group relative p-4 md:p-8 text-center border transition-all duration-700 outline-none opacity-0
                ${btnClasses}
              `}
            >
              <div className="flex items-center justify-center w-full">
                <span className={`text-sm md:text-lg tracking-wide font-light transition-colors duration-700 ${textClasses}`}>
                  {option.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCard;
