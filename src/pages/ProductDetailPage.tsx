import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { itemJson, ItemInfo } from "../constants/Items";

const ProductDetailPage: React.FC = () => {
  const { category, id } = useParams();

  const productDetails: ItemInfo = itemJson[category!][id!] || {}; // 선택된 카테고리의 상품 가져오기

  return (
    <div className="bg-gray-50 min-h-screen w-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={productDetails.images?.hi_res || undefined}
            alt={productDetails.title || undefined}
            className="w-full md:w-1/2 max-w-lg h-auto rounded-lg shadow"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {productDetails.title}
            </h1>
            <p className="text-lg text-gray-500">
              Rating: {productDetails.average_rating}
            </p>
            <p className="text-2xl font-bold text-blue-600">
              ${productDetails.price}
            </p>
            <p className="text-gray-700 mt-4">{productDetails.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
