"use client";

import { ItemInfo } from "@/constants/Items";
import { useEffect, useState } from "react";

interface ProductCardProps {
  category: string;
  setProducts: (products: ItemInfo[]) => void;
}

export const Search: React.FC<ProductCardProps> = ({
  category,
  setProducts,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false); // 요청 상태 추가

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery); // 입력이 멈춘 후 1초 뒤에 업데이트
    }, 1000); // 딜레이

    return () => {
      clearTimeout(handler); // 이전 타이머를 취소
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      const requestSearch = async () => {
        // 요청 상태 설정
        setIsFetching(true);

        const url = `/api/search/${category}?query=${debouncedQuery}`;
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

          const { items } = await response.json(); // 응답 데이터를 JSON으로 변환
          setProducts(items);
        } catch (error) {
          console.error("Error in GET request:", error);
        } finally {
          // 요청 상태 해제
          setIsFetching(false);
        }
      };

      requestSearch();
    }
  }, [debouncedQuery, category]);

  return (
    /* 검색 UI */
    <div className="flex flex-col justify-center items-center mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={isFetching} // 요청 중에는 입력 필드 비활성화
        className={`px-4 py-2 w-1/2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 ${
          isFetching ? "bg-gray-200 cursor-not-allowed" : "focus:ring-blue-500"
        }`}
      />
      {isFetching && (
        <div className="text-sm text-gray-500 mt-2">Searching...</div>
      )}
    </div>
  );
};
