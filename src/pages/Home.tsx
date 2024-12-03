import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

// 3000개의 상품 생성 (테스트용)
const products = Array.from({ length: 3000 }, (_, index) => ({
  id: index + 1,
  title: `Product ${index + 1}`,
  average_rating: (Math.random() * 5).toFixed(1),
  images: { thumb: ["https://via.placeholder.com/150"] },
  price: `$${(Math.random() * 100).toFixed(2)}`,
}));

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <Navbar />
      <div className="w-full py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Explore Products
        </h1>
        {/* 전체 화면을 사용하는 그리드 */}
        <div className="w-full grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-2 md:px-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
