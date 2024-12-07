"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

import { categoryList, ItemInfo } from "../constants/Items";
import ColdStartPopup from "../components/ColdStartPopup";
import { useRouter } from "next/navigation";
import { useRecommendedItems } from "@/context/RecmmendedItemsContext";
import { Search } from "@/components/Search";

const categories = categoryList;

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const { recommendedProducts, setRecommendedProducts } = useRecommendedItems();

  const [products, setProducts] = useState<ItemInfo[]>([]);
  const [showColdStart, setShowColdStart] = useState<boolean>(false);
  const [randomProducts, setRandomProducts] = useState<ItemInfo[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) router.push("/login");
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // 로딩 시작
        // const res = await fetch(`/api/product/${selectedCategory}`);
        // if (!res.ok) throw new Error("Failed to fetch data");

        // const jsonData = await res.json();
        // setProducts(jsonData);
        const username = localStorage.getItem("username");
        const res = await fetch(`/api/list/${selectedCategory}/${username}`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        const { items } = data;
        setProducts(items);

        const randomSelection = [...items]
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
    const coldStartData = JSON.parse(localStorage.getItem("coldstart") || "{}");
    if (!coldStartData[selectedCategory]) {
      setShowColdStart(true);
    }
  }, [selectedCategory]);

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

    // 추천 알고리즘에 cold start 데이터 보내기
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

      const { data } = await response.json(); // 응답 데이터를 JSON으로 변환
      setRecommendedProducts((prev) => ({
        ...prev,
        [selectedCategory]: data,
      }));
    } catch (error) {
      console.error("Error in GET request:", error);
    }

    //localstorage에 coldstart값 저장
    try {
      // localStorage에서 데이터 가져오기
      let coldStartData = JSON.parse(localStorage.getItem("coldstart") || "{}");

      // 데이터가 객체가 아닐 경우 기본 객체로 초기화
      if (typeof coldStartData !== "object" || coldStartData === null) {
        coldStartData = {};
      }

      // 카테고리 데이터 업데이트
      coldStartData[selectedCategory] = true; // boolean 값을 저장
      localStorage.setItem("coldstart", JSON.stringify(coldStartData));
    } catch (error) {
      console.error("Error handling coldstart data:", error);

      // localStorage에 기본값 설정
      localStorage.setItem(
        "coldstart",
        JSON.stringify({ [selectedCategory]: true })
      );
    }

    setRatings({});
    setShowColdStart(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      {showColdStart &&
        (loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ColdStartPopup
            randomProducts={randomProducts}
            ratings={ratings}
            handleRatingChange={handleRatingChange}
            handleSubmitRatings={handleSubmitRatings}
            selectedCategory={selectedCategory}
          />
        ))}

      {!showColdStart && (
        <div className="w-full py-20">
          <div className="w-full mb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Recommended Items
            </h2>
            <div className="flex w-full space-x-4">
              {products
                .filter((obj) =>
                  recommendedProducts[selectedCategory]?.includes(
                    obj.parent_asin!
                  )
                )
                .map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    category={selectedCategory}
                  />
                ))}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Explore Products
          </h1>

          <Search setProducts={setProducts} category={selectedCategory} />

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
