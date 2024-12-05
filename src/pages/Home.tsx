import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { itemJson, categoryList } from "../constants/Items";

const categories = categoryList;

const Home: React.FC = () => {
  // 상태 관리: 선택된 카테고리와 상품 리스트
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  ); // 첫 번째 카테고리 기본 선택

  const products = itemJson[selectedCategory] || []; // 선택된 카테고리의 상품 가져오기

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <Navbar />
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
                {category.replace(/_/g, " ")} {/* 카테고리 이름 보기 좋게 */}
              </option>
            ))}
          </select>
        </div>

        {/* 상품 리스트 */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-2 md:px-4">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              category={selectedCategory}
              productIdx={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
