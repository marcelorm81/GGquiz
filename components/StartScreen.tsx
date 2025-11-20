
import React, { useEffect, useRef } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const tl = window.gsap.timeline();
      
      // Slower, calmer entrance for main container
      tl.fromTo(containerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 2.5, ease: "power2.inOut" }
      )
      // Title words
      .fromTo(".title-word",
        { opacity: 0, y: 20, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, stagger: 0.1, ease: "power2.out" },
        "-=2.0"
      )
      // Intro text paragraph 1
      .fromTo(".intro-word-1",
        { opacity: 0, y: 15, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, stagger: 0.03, ease: "power2.out" },
        "-=1.0"
      )
      // Button
      .fromTo(btnRef.current,
        { opacity: 0, filter: "blur(4px)" },
        { opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleLine1 = "How Deep Is Your";
  const titleLine2 = "Good Girl Love?";
  
  // Broken down into specific lines for better visual pacing
  const introBlock1 = [
    "Are you merely an admirer",
    "or do you truly embody the Good Girl spirit?"
  ];

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center w-full max-w-4xl text-center px-4 opacity-0">
      
      <h1 className="text-4xl md:text-7xl font-normal text-white mb-10 md:mb-16 tracking-tight leading-tight">
        <div className="block">
          {titleLine1.split(" ").map((word, i) => (
            <span key={i} className="title-word inline-block opacity-0 mr-[0.25em]">{word}</span>
          ))}
        </div>
        <div className="block">
           {titleLine2.split(" ").map((word, i) => (
            <span key={i} className="title-word inline-block opacity-0 mr-[0.25em]">{word}</span>
          ))}
        </div>
      </h1>

      <div className="intro-text space-y-8 mb-12 md:mb-20 text-gray-100 text-lg md:text-2xl font-light leading-relaxed max-w-3xl">
        
        {/* First Block */}
        <div className="flex flex-col gap-1 md:gap-2">
          {introBlock1.map((line, lineIdx) => (
            <div key={lineIdx} className="block">
              {line.split(" ").map((word, wordIdx) => (
                <span key={`${lineIdx}-${wordIdx}`} className="intro-word-1 inline-block opacity-0 mr-[0.25em]">
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>

      </div>

      <button
        ref={btnRef}
        onClick={onStart}
        className="group relative px-10 md:px-16 py-4 md:py-5 border border-white/80 text-white text-[10px] md:text-xs tracking-[0.3em] uppercase transition-all duration-700 hover:bg-white hover:text-black overflow-hidden"
      >
        <span className="relative z-10">Start</span>
      </button>
    </div>
  );
};

export default StartScreen;
