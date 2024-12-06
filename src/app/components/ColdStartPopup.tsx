import React from "react";
import Image from "next/image";
import { ItemInfo } from "../constants/Items";

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
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(index, rating)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={ratings[index] >= rating ? "gold" : "gray"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-6 h-6"
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
