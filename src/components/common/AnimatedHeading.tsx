import React, { useState, useEffect } from 'react';
import { HeadingAnimationType, AccentGradientTheme } from '../../types';

interface AnimatedHeadingProps {
  title: string;
  accent: string;
  suffix?: string;
  animationType?: HeadingAnimationType;
  accentGradient?: AccentGradientTheme;
  words?: string[];
  typingSpeedMs?: number;
  pauseDurationMs?: number;
  className?: string;
  accentClassName?: string;
  tag?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center' | 'right';
}

const GRADIENT_MAP: Record<AccentGradientTheme, string> = {
  'orange-amber': 'from-[#FF7A29] via-[#FFA15C] to-amber-300',
  'indigo-blue': 'from-indigo-400 via-sky-400 to-cyan-300',
  'emerald-teal': 'from-emerald-400 via-teal-300 to-cyan-300',
  'rose-pink': 'from-rose-400 via-pink-400 to-amber-300',
  'purple-violet': 'from-purple-400 via-violet-300 to-indigo-300'
};

const GLOW_COLOR_MAP: Record<AccentGradientTheme, string> = {
  'orange-amber': 'rgba(255, 122, 41, 0.35)',
  'indigo-blue': 'rgba(99, 102, 241, 0.35)',
  'emerald-teal': 'rgba(16, 185, 129, 0.35)',
  'rose-pink': 'rgba(244, 63, 94, 0.35)',
  'purple-violet': 'rgba(168, 85, 247, 0.35)'
};

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  title,
  accent,
  suffix = '',
  animationType = 'gradient-shimmer',
  accentGradient = 'orange-amber',
  words,
  typingSpeedMs = 85,
  pauseDurationMs = 1800,
  className = 'text-3xl sm:text-4xl font-extrabold text-white tracking-tight',
  accentClassName = '',
  tag: Tag = 'h2',
  align = 'left'
}) => {
  const gradientClass = GRADIENT_MAP[accentGradient] || GRADIENT_MAP['orange-amber'];
  const glowColor = GLOW_COLOR_MAP[accentGradient] || GLOW_COLOR_MAP['orange-amber'];

  // Words list for cycling animations
  const cycleWords = words && words.length > 0 ? words : [accent];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(typingSpeedMs);

  // Typewriter effect
  useEffect(() => {
    if (animationType !== 'typewriter') return;

    const fullWord = cycleWords[currentWordIndex] || accent;

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setSpeed(typingSpeedMs);

        if (currentText === fullWord) {
          setTimeout(() => setIsDeleting(true), pauseDurationMs);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setSpeed(Math.max(35, Math.floor(typingSpeedMs * 0.5)));

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % cycleWords.length);
          setSpeed(280);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, speed, animationType, cycleWords, typingSpeedMs, pauseDurationMs, accent]);

  // Rotate cycle effect for 'fade-rotate' or 'wave-bounce' if multi-words
  const [rotateIndex, setRotateIndex] = useState(0);
  useEffect(() => {
    if (animationType !== 'fade-rotate' && animationType !== 'wave-bounce' && animationType !== 'glitch-tech') return;
    if (cycleWords.length <= 1) return;

    const interval = setInterval(() => {
      setRotateIndex((prev) => (prev + 1) % cycleWords.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [animationType, cycleWords.length]);

  const activeDisplayWord = cycleWords[rotateIndex] || accent;

  // Render the accent component depending on animationType
  const renderAccent = () => {
    switch (animationType) {
      case 'typewriter':
        return (
          <span className={`relative inline-grid text-left align-baseline max-w-full ${accentClassName}`}>
            {/* Sizer for layout stability if multiple words */}
            {cycleWords.map((w, idx) => (
              <span
                key={idx}
                className="col-start-1 row-start-1 invisible pointer-events-none select-none opacity-0 inline-block"
                aria-hidden="true"
              >
                <span>{w}</span>
                <span className="inline-block w-1.5 h-[0.82em] ml-1" />
              </span>
            ))}
            <span className="col-start-1 row-start-1 inline-block">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}`}>
                {currentText || '\u200B'}
              </span>
              <span
                className="inline-block w-1.5 h-[0.82em] ml-1 bg-[#FF7A29] animate-pulse align-middle rounded-full"
                aria-hidden="true"
              />
            </span>
          </span>
        );

      case 'fade-rotate':
        return (
          <span className={`inline-block relative overflow-hidden align-baseline ${accentClassName}`}>
            <span
              key={rotateIndex}
              className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} animate-[fadeInUp_0.5s_ease-out]`}
            >
              {activeDisplayWord}
            </span>
          </span>
        );

      case 'gradient-shimmer':
        return (
          <span
            className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} animate-pulse font-extrabold ${accentClassName}`}
            style={{
              textShadow: `0 0 25px ${glowColor}`
            }}
          >
            {accent}
          </span>
        );

      case 'wave-bounce':
        return (
          <span className={`inline-inline-flex flex-wrap gap-x-1 align-baseline ${accentClassName}`}>
            {accent.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="inline-flex">
                {word.split('').map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} hover:-translate-y-1 transition-transform duration-200`}
                    style={{
                      animation: 'waveBounce 2s ease-in-out infinite',
                      animationDelay: `${(wIdx * 4 + cIdx) * 0.08}s`
                    }}
                  >
                    {char}
                  </span>
                ))}
                &nbsp;
              </span>
            ))}
          </span>
        );

      case 'glitch-tech':
        return (
          <span
            className={`relative inline-block text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} font-mono tracking-wide ${accentClassName}`}
          >
            <span className="relative z-10">{accent}</span>
            <span
              className="absolute inset-0 text-cyan-400 opacity-60 blur-[1px] pointer-events-none select-none translate-x-[1px]"
              aria-hidden="true"
            >
              {accent}
            </span>
          </span>
        );

      case 'glow-pulse':
      default:
        return (
          <span
            className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} ${accentClassName}`}
            style={{
              filter: `drop-shadow(0 0 16px ${glowColor})`
            }}
          >
            {accent}
          </span>
        );
    }
  };

  return (
    <Tag className={`${className} ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
      <span>{title} </span>
      {renderAccent()}
      {suffix && <span> {suffix}</span>}
    </Tag>
  );
};
