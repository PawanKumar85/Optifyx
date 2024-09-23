import React from "react";

const Card = ({ imageSrc, name, price }) => {
  return (
    <div className="p-4 rounded-lg shadow-lg bg-white max-w-sm mx-auto mt-3 transition-transform transform hover:scale-105 duration-200">
      {/* Image Section */}
      <img
        src={imageSrc}
        alt={name}
        className="rounded-md w-full h-48 object-cover mb-4"
      />

      <h1 className="text-2xl font-semibold mb-2 text-gray-800">{name}</h1>

      <div className="flex gap-3 mb-4 text-lg">
        <p className="font-semibold text-gray-600">Price:</p>
        <p className="text-gray-800">Rs {price}</p>
      </div>

      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 duration-200 transition-all">
          Buy Now
        </button>
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 duration-200 transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
