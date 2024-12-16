import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-4xl font-bold mb-4">News Prompts to Try</h1>
      <p className="text-lg text-muted-foreground mb-4">
        Explore prompts to create personalized news subscriptions and stay
        informed.
      </p>
      {children}
    </div>
  );
};

export default layout;
