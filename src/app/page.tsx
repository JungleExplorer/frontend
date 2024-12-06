"use client";

import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import { categoryList, ItemInfo } from "./constants/Items";
import Image from "next/image";

const categories = categoryList;

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  ); // 첫 번째 카테고리 기본 선택
  const [products, setProducts] = useState<ItemInfo[]>([]);
  const [showColdStart, setShowColdStart] = useState<boolean>(false); // Coldstart 팝업 표시 여부
  const [randomProducts, setRandomProducts] = useState<ItemInfo[]>([]);
  const [ratings, setRatings] = useState<Record<number, number>>({}); // 상품별 별점 저장

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/product/${selectedCategory}`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const jsonData = await res.json();
        console.log(jsonData);
        setProducts(jsonData);

        //랜덤 데이터 설정
        const randomSelection = jsonData
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setRandomProducts(randomSelection);
      } catch (error) {
        console.error("Error fetching data:", error);
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

    // Coldstart 완료 상태로 변경
    localStorage.setItem("coldstart", "true");
    setShowColdStart(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <Navbar />

      {showColdStart && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Rate {selectedCategory} product
            </h2>
            <div className="flex flex-col space-y-4">
              {randomProducts.map((product, index) => (
                <div key={index} className="flex flex-col items-start">
                  <h3 className="font-semibold text-gray-700">
                    {product.title}
                  </h3>
                  <div className="relative w-full h-36">
                    {product.images?.hi_res ? (
                      <Image
                        fill
                        src={product.images.hi_res}
                        alt={product.title || "product"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingChange(index, rating)}
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={ratings[index] >= rating ? "gold" : "gray"}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.122 6.564a1 1 0 00.95.69h6.905c.969 0 1.371 1.24.588 1.81l-5.593 4.067a1 1 0 00-.364 1.118l2.122 6.564c.3.921-.755 1.688-1.538 1.118l-5.593-4.067a1 1 0 00-1.176 0l-5.593 4.067c-.783.57-1.838-.197-1.538-1.118l2.122-6.564a1 1 0 00-.364-1.118L2.37 11.99c-.783-.57-.38-1.81.588-1.81h6.905a1 1 0 00.95-.69l2.122-6.564z"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSubmitRatings}
            >
              Submit Ratings
            </button>
          </div>
        </div>
      )}

      {!showColdStart && (
        <div className="w-full py-20">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Explore Products
          </h1>

          {/* 카테고리 선택 드롭다운 */}
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

          {/* 상품 리스트 */}
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
        </div>
      )}
    </div>
  );
};

export default Home;
