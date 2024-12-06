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
  const [rating, setRating] = useState<number>(0); // 별점 상태

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/product/${category}/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch item: ${res.status}`);
        }
        const data = await res.json();
        setProductDetails(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItem();
  }, [category, id]);

  const handleSubmitReview = () => {
    console.log("Submitted Rating:", rating);
    alert("Your rating has been submitted!");
    // 여기에서 API를 호출하여 별점을 저장할 수 있습니다.
    setRating(0);
  };

  return (
    <div className="container mx-auto px-6 py-20">
      {productDetails ? (
        <div className="flex flex-col md:flex-row gap-6">
          {productDetails.images?.hi_res ? (
            <div className="relative w-full md:w-1/2 max-w-lg">
              <Image
                layout="intrinsic"
                width={500}
                height={500}
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

      {/* 리뷰 작성 섹션 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Rate this product
        </h2>
        <div className="flex items-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={rating >= star ? "gold" : "gray"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="w-8 h-8"
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
        <button
          onClick={handleSubmitReview}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
