import React from 'react';

interface QuikeeLogoProps {
  className?: string; // This will carry the text-white or text-black
}

const QuikeeLogo: React.FC<QuikeeLogoProps> = ({ className }) => {
  return (
      <svg 
        className={`h-8 w-auto ${className}`} // Pass className for color
        viewBox="0 0 150 40"
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="10"
          y="30"
          fontFamily="Georgia, 'Times New Roman', Times, serif"
          fontSize="30"
          fontStyle="italic"
          fontWeight="bold"
        >
          Quikee
        </text>
      </svg>
  );
};

export default QuikeeLogo;