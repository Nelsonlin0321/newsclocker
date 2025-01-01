import React from 'react';
import { NewsSourcesGroup } from './news-sources';
import { AIProcessor } from './ai-processor';
import { Scheduler } from './scheduler';
import { Mailbox } from './mailbox';
import { FlowLines } from './flow-lines';

export function NewsHero({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 500 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#818CF8', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="mailboxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Arrow marker for flow lines */}
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="18"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#4F46E5" />
        </marker>
      </defs>

      {/* Background grid */}
      <rect
        width="100%"
        height="100%"
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="0.5"
        strokeDasharray="4 4"
        className="opacity-30"
      />

      {/* Flow lines */}
      <FlowLines />

      {/* Components */}
      <NewsSourcesGroup />
      <Scheduler />
      <AIProcessor />
      <Mailbox />

      {/* Labels */}
      <g className="text-xs fill-white font-medium">
        <text x="80" y="40" textAnchor="middle">News Sources</text>
        <text x="200" y="140" textAnchor="middle">AI Analysis</text>
        <text x="300" y="140" textAnchor="middle">Scheduler</text>
        <text x="400" y="140" textAnchor="middle">Your Mailbox</text>
      </g>
    </svg>
  );
}