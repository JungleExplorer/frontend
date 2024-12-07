"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

const RecommendedItemContext = createContext<{
  recommendedProducts: string[];
  setRecommendedProducts: React.Dispatch<React.SetStateAction<string[]>>;
} | null>(null);

export const RecommendedItemProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recommendedItems, setRecommendedItems] = useState<string[]>([]);

  return (
    <RecommendedItemContext.Provider
      value={{
        recommendedProducts: recommendedItems,
        setRecommendedProducts: setRecommendedItems,
      }}
    >
      {children}
    </RecommendedItemContext.Provider>
  );
};

export const useRecommendedItems = () => {
  const context = useContext(RecommendedItemContext);
  if (!context) {
    throw new Error(
      "useRecommendedItems must be used within a RecommendedItemProvider"
    );
  }
  return context;
};
