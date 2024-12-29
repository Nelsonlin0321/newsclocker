import React from "react";
import SubscriptionCardSkeleton from "./subscription-card-skeleton";

const SubscriptionCardGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <SubscriptionCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default SubscriptionCardGridSkeleton;
