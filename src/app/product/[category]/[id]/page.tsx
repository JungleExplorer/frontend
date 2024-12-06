"use client";

import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import Image from "next/image";
import { ItemInfo } from "@/app/constants/Items";

const ProductDetailPage: React.FC = () => {
  const params = useParams(); // URL 매개변수 가져오기
  const category = params.category as string;
  const id = params.id as string;

  const [productDetails, setProductDetails] = useState<ItemInfo | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/product/${category}/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch item: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setProductDetails(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItem();
  }, [category, id]);

  return (
    <div className="container mx-auto px-6 py-20">
      {productDetails ? (
        <div className="flex flex-col md:flex-row gap-6">
          {productDetails.images?.hi_res ? (
            <div className="relative w-full md:w-1/2 max-w-lg">
              <Image
                layout="intrinsic" // 이미지 원본 비율을 유지
                width={500} // 기본 너비 설정
                height={500} // 기본 높이 설정 (비율 유지)
                src={productDetails.images.hi_res}
                alt={productDetails.title || "Product"}
                className="rounded-lg shadow"
                priority
              />
            </div>
          ) : (
            <div className="w-full md:w-1/2 max-w-lg h-80 bg-gray-200 flex items-center justify-center rounded-lg shadow">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {productDetails.title || "Unknown Product"}
            </h1>
            <p className="text-lg text-gray-500">
              Rating: {productDetails.average_rating || "N/A"}
            </p>
            <p className="text-2xl font-bold text-blue-600">
              ${productDetails.price || "0.00"}
            </p>
            <p className="text-gray-700 mt-4">
              {productDetails.description || "No description available."}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500">Product not found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
