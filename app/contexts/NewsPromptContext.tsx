"use client";
import React, { createContext, useContext, useState } from "react";

interface NewsPromptContextType {
  newsPrompt: string;
  setNewsPrompt: (prompt: string) => void;
}

const NewsPromptContext = createContext<NewsPromptContextType | undefined>(
  undefined
);

export function NewsPromptProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [newsPrompt, setNewsPrompt] = useState("");

  return (
    <NewsPromptContext.Provider value={{ newsPrompt, setNewsPrompt }}>
      {children}
    </NewsPromptContext.Provider>
  );
}

export function useNewsPrompt() {
  const context = useContext(NewsPromptContext);
  if (undefined === context) {
    throw new Error("useNewsPrompt must be used within a NewsPromptProvider");
  }
  return context;
}
