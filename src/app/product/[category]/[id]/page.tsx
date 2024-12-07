"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ItemInfo } from "@/constants/Items";
import Star from "@/components/Star";
import { useRecommendedItems } from "@/context/RecmmendedItemsContext";

const ProductDetailPage: React.FC = () => {
  const params = useParams(); // URL 매개변수 가져오기
  const category = params.category as string;
  const id = params.id as string;

  const { setRecommendedProducts } = useRecommendedItems();

  const [productDetails, setProductDetails] = useState<ItemInfo | null>(null);
  const [rating, setRating] = useState<number>(0); // 별점 상태

  const router = useRouter();

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

  const handleSubmitReview = async () => {
    const userReviews = [
      {
        product_id_str: productDetails?.parent_asin,
        rating: rating,
      },
    ];

    // JSON 문자열로 직렬화 후 URI 인코딩
    const queryParam = encodeURIComponent(
      JSON.stringify({ user_reviews: userReviews })
    );

    const url = `/api/recommend/${category}?data=${queryParam}`;

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
      console.log("Response from API:", data);

      setRecommendedProducts((prev) => ({
        ...prev,
        [category]: data,
      }));

      router.push("/");
    } catch (error) {
      console.error("Error in GET request:", error);
    }

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
            <Star
              key={star}
              filled={rating >= star} // 선택된 별인지 여부
              onClick={() => setRating(star)} // 클릭 이벤트 핸들러
            />
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
