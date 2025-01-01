import React from "react";

interface PriceDisplayProps {
  price: string;
  originalPrice?: string;
  period?: string;
}

export function PriceDisplay({
  price,
  originalPrice,
  period,
}: PriceDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {originalPrice && (
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-500">Regular price</span>
          <span className="text-lg line-through text-gray-400">
            ${originalPrice}
          </span>
        </div>
      )}
      <div className="flex items-end">
        <span className="text-3xl font-bold">{price}</span>
        {period && <span className="text-gray-500 mb-1 ml-1">{period}</span>}
      </div>
    </div>
  );
}
