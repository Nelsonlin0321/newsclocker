import React from 'react';

export function FlowLines() {
  return (
    <g id="flow-lines">
      {/* AI to Scheduler line */}
      <path
        d="M 235 200 L 280 200"
        stroke="#4F46E5"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      
      {/* Scheduler to Mailbox line */}
      <path
        d="M 330 200 L 380 200"
        stroke="#2563EB"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    </g>
  );
}