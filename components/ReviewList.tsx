
import React from 'react';
import type { Review } from '../types';
import { StarRating } from './StarRating';
import { UserIcon } from './icons';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-6">
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-700 p-2 rounded-full">
                  <UserIcon className="w-5 h-5 text-slate-300" />
                </div>
                <span className="font-bold text-slate-200">{review.user.username}</span>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-slate-300">{review.comment}</p>
            <p className="text-xs text-slate-500 mt-2 text-right">{new Date(review.timestamp).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p className="text-slate-400 bg-slate-800 p-4 rounded-lg">아직 리뷰가 없습니다. 가장 먼저 리뷰를 작성해보세요!</p>
      )}
    </div>
  );
};