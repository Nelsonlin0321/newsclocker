import React from 'react';

const newsSourceLogos = [
  { name: 'NYT', color: '#000000' },
  { name: 'BBC', color: '#BB1919' },
  { name: 'AP', color: '#FF322E' },
  { name: 'Yahoo', color: '#5D0FFF' },
  { name: '...', color: '#007DB3' },
];

export function NewsSourcesGroup() {
  return (
    <g id="news-sources">
      {newsSourceLogos.map((source, index) => {
        const y = 80 + index * 60;
        return (
          <g key={source.name}>
            <circle cx="80" cy={y} r="25" fill={source.color} className="drop-shadow-lg" />
            <text x="80" y={y} textAnchor="middle" dy=".3em" fill="white" className="text-sm font-bold">
              {source.name}
            </text>
            {/* Flow line to AI processor */}
            <path
              d={`M 100 ${y} Q 150 ${y} 180 200`}
              stroke={source.color}
              strokeWidth="2"
              fill="none"
            />
          </g>
        );
      })}
    </g>
  );
}