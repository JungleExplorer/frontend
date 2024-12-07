"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

import { categoryList, ItemInfo } from "./constants/Items";
import ColdStartPopup from "./components/ColdStartPopup";
import { useRouter } from "next/navigation";

const categories = categoryList;

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  const [recommendedProducts, setRecommendedProducts] = useState<ItemInfo[]>(
    []
  );
  const [products, setProducts] = useState<ItemInfo[]>([]);
  const [showColdStart, setShowColdStart] = useState<boolean>(false);
  const [randomProducts, setRandomProducts] = useState<ItemInfo[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
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

  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) router.push("/login");
  }, []);

  useEffect(() => {
    const coldStart = localStorage.getItem("coldstart");
    if (!coldStart) setShowColdStart(true);
  }, []);

  const handleRatingChange = (productId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [productId]: rating }));
  };

  const handleSubmitRatings = async () => {
    if (Object.keys(ratings).length < 5) {
      alert("Please rate all 5 products before submitting.");
      return;
    }

    const userReviews = Object.entries(ratings).map(([productId, rating]) => ({
      product_id_str: productId,
      rating: rating,
    }));

    // JSON 문자열로 직렬화 후 URI 인코딩
    const queryParam = encodeURIComponent(
      JSON.stringify({ user_reviews: userReviews })
    );
    const url = `/api/recommend/${selectedCategory}?data=${queryParam}`;

    try {
      const response = await fetch(url, {
        method: "GET", // HTTP 메서드 설정
        headers: {
          "Content-Type": "application/json", // JSON 데이터임을 명시
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // 응답 데이터를 JSON으로 변환
      console.log("Response from API:", data);
    } catch (error) {
      console.error("Error in GET request:", error);
    }

    localStorage.setItem("coldstart", "true");
    setShowColdStart(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
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
