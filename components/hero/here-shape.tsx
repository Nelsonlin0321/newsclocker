import React from 'react';

export function HeroShape({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#F472B6', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
      </defs>

      {/* Center circle */}
      <circle
        cx="200"
        cy="200"
        r="40"
        fill="white"
        className="drop-shadow-xl"
      />

      {/* Petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const x = Math.cos(angle) * 120 + 200;
        const y = Math.sin(angle) * 120 + 200;
        
        return (
          <g key={i} transform={`rotate(${i * 45} 200 200)`}>
            <path
              d={`M 200 160 L 240 200 L 200 240 L 160 200 Z`}
              fill={i % 2 === 0 ? 'url(#blueGradient)' : 'url(#pinkGradient)'}
              className="drop-shadow-lg"
              style={{
                transform: 'scale(1.2)',
                transformOrigin: 'center',
              }}
            />
          </g>
        );
      })}

      {/* Highlight overlay */}
      <circle
        cx="200"
        cy="200"
        r="35"
        fill="white"
        fillOpacity="0.3"
        filter="url(#glow)"
      />
    </svg>
  );
}