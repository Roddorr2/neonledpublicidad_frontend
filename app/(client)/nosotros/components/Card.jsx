"use client";

export const Card = ({ title, imageSrc, imageAlt, description }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <h2 className="text-xl md:text-2xl font-bold text-yellow-400">{title}</h2>

      <div className="flex justify-center">
        <img
          src={imageSrc}
          width="80"
          alt={imageAlt}
          className="h-[80px] object-contain"
        />
      </div>

      <div className="bg-gray-800 bg-opacity-90 border-2 border-white rounded-lg p-4 w-full max-w-xs">
        <p className="text-xs md:text-sm text-white leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};
