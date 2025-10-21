
import React from 'react';
import { StarIcon } from './icons';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  onRate?: (rating: number) => void;
  size?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, onRate, size = 'w-5 h-5' }) => {
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            onClick={() => onRate?.(starValue)}
            disabled={!onRate}
            className={`cursor-${onRate ? 'pointer' : 'default'}`}
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            <StarIcon className={size} isFilled={starValue <= rating} />
          </button>
        );
      })}
    </div>
  );
};
