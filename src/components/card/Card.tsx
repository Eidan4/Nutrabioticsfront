import React from "react";

interface CardProps {
  image: string;
  name: string;
  price: number;
  onDetailClick: () => void;
}

export default function Card({ image, name, price, onDetailClick }: CardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden w-60 cursor-pointer"
      onClick={onDetailClick}
    >
      <div className="w-full aspect-[2/3] overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black">{name}</h3>
        <p className="text-gray-700 font-bold mt-2">${price.toFixed(2)}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetailClick();
          }}
          className="mt-4 w-full bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-500 transition"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
}