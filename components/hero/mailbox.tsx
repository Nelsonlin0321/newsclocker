import React from 'react';

export function Mailbox() {
  return (
    <g id="mailbox" transform="translate(380, 160)">
      {/* Main Container */}
      <rect
        x="0"
        y="25"
        width="40"
        height="35"
        rx="6"
        fill="url(#mailboxGradient)"
        className="drop-shadow-xl"
      />

      {/* Envelope Design */}
      <g transform="translate(5, 35)">
        {/* Envelope Body */}
        <rect
          x="0"
          y="0"
          width="30"
          height="20"
          fill="white"
          opacity="0.9"
        />
        
        {/* Envelope Flap */}
        <path
          d="M 0,0 L 15,10 L 30,0"
          stroke="white"
          strokeWidth="1.5"
          fill="white"
          opacity="0.7"
        />

        {/* Envelope Lines */}
        <line
          x1="0"
          y1="0"
          x2="15"
          y2="12"
          stroke="#2563EB"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="30"
          y1="0"
          x2="15"
          y2="12"
          stroke="#2563EB"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </g>
    </g>
  );
}