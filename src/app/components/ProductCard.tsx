import React from "react";

import Link from "next/link";
import Image from "next/image";
import { ItemInfo } from "../constants/Items";

interface ProductCardProps {
  product: ItemInfo;
  productIdx: number;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productIdx,
  category,
  product,
}) => {
  return (
    <Link
      href={`/product/${category}/${productIdx}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden w-full"
    >
      {/* 이미지 */}
      <div className="relative w-full h-36">
        {product.images?.thumb ? (
          <Image
            fill
            src={product.images.thumb}
            alt={product.title || "product"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 화면 크기에 따라 이미지 크기 지정
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      {/* 콘텐츠 */}
      <div className="p-2">
        <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
          {product.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Rating: {product.average_rating}
        </p>
        <p className="text-sm sm:text-base font-bold text-blue-600 mt-2">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
