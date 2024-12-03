import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const productDetails = {
  id: 1,
  title: "Sample Product",
  average_rating: 4.5,
  images: { hi_res: ["https://via.placeholder.com/500"] },
  price: "$19.99",
  description: "This is a sample product description.",
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={productDetails.images.hi_res[0]}
            alt={productDetails.title}
            className="w-full md:w-1/2 rounded-lg shadow"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {productDetails.title}
            </h1>
            <p className="text-lg text-gray-500">
              Rating: {productDetails.average_rating}
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {productDetails.price}
            </p>
            <p className="text-gray-700 mt-4">{productDetails.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
