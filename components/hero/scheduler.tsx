import React from 'react';

export function Scheduler() {
  return (
    <g id="scheduler" transform="translate(280, 160)">
      {/* Main Circle */}
      <circle
        cx="20"
        cy="40"
        r="35"
        fill="url(#clockGradient)"
        className="drop-shadow-xl"
      />

      {/* Clock Face */}
      <circle
        cx="20"
        cy="40"
        r="30"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Hour Markers */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = Math.cos(angle) * 28 + 20;
        const y1 = Math.sin(angle) * 28 + 40;
        const x2 = Math.cos(angle) * 30 + 20;
        const y2 = Math.sin(angle) * 30 + 40;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="white"
            strokeWidth={i % 3 === 0 ? "2" : "1"}
          />
        );
      })}

      {/* Clock Hands */}
      <g stroke="white" strokeLinecap="round">
        <line x1="20" y1="40" x2="20" y2="25" strokeWidth="2" /> {/* Hour */}
        <line x1="20" y1="40" x2="32" y2="40" strokeWidth="1.5" /> {/* Minute */}
      </g>

      {/* Center Dot */}
      <circle cx="20" cy="40" r="2" fill="white" />
    </g>
  );
}