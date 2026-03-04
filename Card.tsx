import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, hover = false, className = '', ...props }) => {
  const hoverClass = hover ? 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300' : '';

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
