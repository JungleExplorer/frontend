import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    average_rating: string;
    images: { thumb: string[] };
    price: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden w-full"
    >
      {/* 이미지 */}
      <img
        src={product.images.thumb[0]}
        alt={product.title}
        className="w-full h-36 object-cover"
      />
      {/* 콘텐츠 */}
      <div className="p-2">
        <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
          {product.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Rating: {product.average_rating}
        </p>
        <p className="text-sm sm:text-base font-bold text-blue-600 mt-2">
          {product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
