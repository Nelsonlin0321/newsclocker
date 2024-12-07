import React from 'react';

export function NewsHero({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="newsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
        <clipPath id="clockFace">
          <circle cx="200" cy="200" r="160" />
        </clipPath>
      </defs>

      {/* Background circles */}
      <g className="animate-pulse">
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </g>

      {/* Main circular frame */}
      <circle
        cx="200"
        cy="200"
        r="150"
        fill="white"
        className="drop-shadow-xl"
      />

      {/* Time markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = Math.cos(angle) * 140 + 200;
        const y = Math.sin(angle) * 140 + 200;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill="url(#newsGradient)"
            className="drop-shadow-sm"
          />
        );
      })}

      {/* Central notification icon */}
      <g transform="translate(160, 160) scale(0.8)">
        <rect
          x="0"
          y="0"
          width="80"
          height="80"
          rx="20"
          fill="url(#newsGradient)"
          className="drop-shadow-lg"
        />
        <path
          d="M20 30h40M20 50h40"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* Orbiting notification dots */}
      {Array.from({ length: 3 }).map((_, i) => {
        const angle = ((i * 120 + Date.now() / 50) * Math.PI) / 180;
        const x = Math.cos(angle) * 120 + 200;
        const y = Math.sin(angle) * 120 + 200;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="8"
            fill="url(#newsGradient)"
            className="animate-pulse drop-shadow-lg"
          />
        );
      })}

      {/* Glow effect */}
      <circle
        cx="200"
        cy="200"
        r="140"
        fill="white"
        fillOpacity="0.2"
        filter="url(#glow)"
      />
    </svg>
  );
}