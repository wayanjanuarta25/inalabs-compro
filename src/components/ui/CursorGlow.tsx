'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function CursorGlow() {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isLight = theme === 'light';

  return (
    <div
      className="fixed pointer-events-none -z-5 transition-opacity duration-500 will-change-transform"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '600px',
        height: '600px',
        background: isLight
          ? 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.015) 35%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 35%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
      }}
    />
  );
}
