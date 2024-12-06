"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";

import { categoryList, ItemInfo } from "./constants/Items";
import ColdStartPopup from "./components/ColdStartPopup";

const categories = categoryList;

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const [products, setProducts] = useState<ItemInfo[]>([]);
  const [showColdStart, setShowColdStart] = useState<boolean>(false);
  const [randomProducts, setRandomProducts] = useState<ItemInfo[]>([]);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // 로딩 시작
        const res = await fetch(`/api/product/${selectedCategory}`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const jsonData = await res.json();
        setProducts(jsonData);

        const randomSelection = jsonData
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setRandomProducts(randomSelection);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const coldStart = localStorage.getItem("coldstart");
    if (!coldStart) setShowColdStart(true);
  }, []);

  const handleRatingChange = (productId: number, rating: number) => {
    setRatings((prev) => ({ ...prev, [productId]: rating }));
  };

  const handleSubmitRatings = () => {
    console.log("Submitted Ratings:", ratings);
    localStorage.setItem("coldstart", "true");
    setShowColdStart(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <Navbar />

      {showColdStart && (
        <ColdStartPopup
          randomProducts={randomProducts}
          ratings={ratings}
          handleRatingChange={handleRatingChange}
          handleSubmitRatings={handleSubmitRatings}
          selectedCategory={selectedCategory}
        />
      )}

      {!showColdStart && (
        <div className="w-full py-20">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Explore Products
          </h1>

          <div className="flex justify-center mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* 로딩 상태 표시 */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-2 md:px-4">
              {products.map((product: ItemInfo, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  category={selectedCategory}
                  productIdx={index}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;