import React from 'react';
import { Sparkles } from 'lucide-react';

export function AIProcessor() {
  return (
    <g id="ai-processor" transform="translate(180, 160)">
      {/* Main Circle */}
      <circle
        cx="20"
        cy="40"
        r="35"
        fill="url(#aiGradient)"
        className="drop-shadow-xl"
      />
      
      {/* Sparkles Icon */}
      <foreignObject x="2" y="22" width="36" height="36">
        <div className="h-full w-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </foreignObject>
    </g>
  );
}