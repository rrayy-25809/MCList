
import React, { useState } from 'react';
import { StarRating } from './StarRating';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('별점을 선택해주세요.');
      return;
    }
    if (comment.trim() === '') {
      setError('코멘트를 입력해주세요.');
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg border border-slate-700 space-y-4">
      <h4 className="text-xl font-bold text-white">리뷰 작성하기</h4>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">당신의 평점</label>
        <StarRating rating={rating} onRate={setRating} size="w-8 h-8" />
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-slate-300 mb-2">당신의 코멘트</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-emerald-500 focus:border-emerald-500 transition"
          placeholder="서버에 대해 어떻게 생각하셨나요?"
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
        리뷰 제출
      </button>
    </form>
  );
};