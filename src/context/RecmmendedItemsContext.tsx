"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const LOCAL_STORAGE_KEY = "recommendedProducts";

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

  // Load from localStorage when the app starts
  useEffect(() => {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedItems) {
      try {
        setRecommendedItems(JSON.parse(storedItems));
      } catch (error) {
        console.error(
          "Failed to parse recommended products from localStorage",
          error
        );
      }
    }
  }, []);

  // Save to localStorage whenever recommendedItems changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recommendedItems));
  }, [recommendedItems]);

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
