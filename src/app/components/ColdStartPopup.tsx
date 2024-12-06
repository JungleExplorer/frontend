import React from "react";
import Image from "next/image";
import { ItemInfo } from "../constants/Items";
import Star from "./Star";

interface ColdStartPopupProps {
  randomProducts: ItemInfo[];
  ratings: Record<number, number>;
  handleRatingChange: (productId: number, rating: number) => void;
  handleSubmitRatings: () => void;
  selectedCategory: string;
}

const ColdStartPopup: React.FC<ColdStartPopupProps> = ({
  randomProducts,
  ratings,
  handleRatingChange,
  handleSubmitRatings,
  selectedCategory,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Rate {selectedCategory} product
        </h2>
        <div className="flex flex-col space-y-4">
          {randomProducts.map((product, index) => (
            <div key={index} className="flex flex-col items-start">
              <h3 className="font-semibold text-gray-700">{product.title}</h3>
              <div className="relative w-full h-36">
                {product.images?.hi_res ? (
                  <Image
                    fill
                    src={product.images.hi_res}
                    alt={product.title || "product"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    filled={ratings[index] >= rating} // 선택된 별 여부
                    onClick={() => handleRatingChange(index, rating)} // 클릭 핸들러
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSubmitRatings}
        >
          Submit Ratings
        </button>
      </div>
    </div>
  );
};

export default ColdStartPopup;
