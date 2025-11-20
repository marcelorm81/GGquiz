
import React, { useEffect, useRef } from 'react';
import { RESULTS } from '../constants';
import { ResultType } from '../types';

interface ResultCardProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ score, total, onRestart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const resultData: ResultType = RESULTS.find(
    r => score >= r.minScore && score <= r.maxScore
  ) || RESULTS[0];

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const tl = window.gsap.timeline();

      // Calmer, slower entrance for container
      tl.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2.0, ease: "power2.inOut" }
      )
      
      // Score animation (Big numbers character by character)
      .fromTo(".score-char", 
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.1, ease: "power2.out" },
        "-=1.5"
      )
      
      // Title words - elegant stagger
      .fromTo(".title-word",
        { opacity: 0, y: 15, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, stagger: 0.08, ease: "power2.out" },
        "-=0.8"
      )

      // Divider
      .fromTo(".result-divider", 
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.5, ease: "expo.out" },
        "-=0.8"
      )

      // Description words - rapid smooth flow
      .fromTo(".desc-word",
        { opacity: 0, y: 10, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.015, ease: "power2.out" },
        "-=1.2"
      )

      // Buttons - staggered entrance
      .fromTo(".action-btn",
        { opacity: 0, y: 10, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, stagger: 0.2, ease: "power2.out" },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scoreString = `${score}/${total}`;
  
  const handleJoinCommunity = () => {
    window.open('https://www.carolinaherrera.com/', '_blank');
  };

  return (
    <div ref={containerRef} className="w-full max-w-3xl p-4 md:p-8 text-center flex flex-col items-center justify-center h-full opacity-0">
      
      <div className="mb-6 md:mb-12">
        <span className="text-6xl md:text-8xl font-normal text-white block mb-2 font-serif">
           {scoreString.split('').map((char, i) => (
             <span key={i} className="score-char inline-block opacity-0">{char}</span>
           ))}
        </span>
      </div>

      <h2 className="text-3xl md:text-6xl text-white mb-6 md:mb-10 tracking-tight font-normal italic">
        {resultData.title.split(" ").map((word, i) => (
            <span key={i} className="title-word inline-block opacity-0 mr-[0.25em]">
                {word}
            </span>
        ))}
      </h2>

      <div className="result-divider w-16 md:w-24 h-px bg-white mb-6 md:mb-10 opacity-0"></div>

      <p className="text-sm md:text-2xl text-gray-100 leading-relaxed mb-10 md:mb-20 font-light max-w-xl mx-auto">
         {resultData.description.split(" ").map((word, i) => (
            <span key={i} className="desc-word inline-block opacity-0 mr-[0.25em]">
                {word}
            </span>
        ))}
      </p>

      <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
        <button
          onClick={onRestart}
          className="action-btn px-10 md:px-12 py-4 md:py-5 border border-white text-white hover:bg-white hover:text-black transition-all duration-700 uppercase tracking-[0.3em] text-[9px] md:text-[10px] font-medium opacity-0 w-full md:w-auto min-w-[220px]"
        >
          Try Again
        </button>
        
        <button
          onClick={handleJoinCommunity}
          className="action-btn px-10 md:px-12 py-4 md:py-5 border border-white text-white hover:bg-white hover:text-black transition-all duration-700 uppercase tracking-[0.3em] text-[9px] md:text-[10px] font-medium opacity-0 w-full md:w-auto min-w-[220px]"
        >
          Join Our Community
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
