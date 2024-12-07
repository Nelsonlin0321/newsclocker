import React from 'react';

export function NotificationRing({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#ringGradient)"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
    </svg>
  );
}