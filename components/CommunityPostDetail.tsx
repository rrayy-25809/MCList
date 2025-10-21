import React, { useState } from 'react';
import type { CommunityPost, CommunityComment, User } from '../types';
import { UserIcon, ThumbsUpIcon, EyeIcon, ArrowLeftIcon } from './icons';

interface CommunityPostDetailProps {
  post: CommunityPost;
  comments: CommunityComment[];
  currentUser: User | null;
  onBack: () => void;
  onSubmitComment: (postId: number, content: string) => void;
}

export const CommunityPostDetail: React.FC<CommunityPostDetailProps> = ({ post, comments, currentUser, onBack, onSubmitComment }) => {
  const [newComment, setNewComment] = useState('');
  
  const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (newComment.trim()) {
          onSubmitComment(post.id, newComment);
          setNewComment('');
      }
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 mb-6 transition-colors">
        <ArrowLeftIcon />
        <span>커뮤니티 게시판으로 돌아가기</span>
      </button>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        {/* Post Header */}
        <div className="border-b border-slate-700 pb-4 mb-4">
          <h1 className="text-3xl font-bold text-white mb-2">{post.title}</h1>
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <UserIcon className="w-4 h-4" />
              <span>{post.user.username}</span>
              <span>•</span>
              <span>{new Date(post.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1"><ThumbsUpIcon className="w-4 h-4" /> <span>{post.recommendations}</span></div>
              <div className="flex items-center space-x-1"><EyeIcon className="w-4 h-4" /> <span>{post.views}</span></div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="prose prose-invert prose-p:text-slate-300 min-w-full py-4 mb-6">
          <p>{post.content}</p>
        </div>
        
        {/* Comments Section */}
        <div className="border-t border-slate-700 pt-6">
            <h3 className="text-xl font-bold text-sky-400 mb-4">댓글 ({comments.length})</h3>
            <div className="space-y-4">
                {comments.map(comment => (
                    <div key={comment.id} className="bg-slate-900/50 p-3 rounded-md">
                        <div className="flex items-center space-x-2 mb-1 text-sm">
                            <span className="font-semibold text-slate-200">{comment.user.username}</span>
                            <span className="text-slate-500">• {new Date(comment.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-300">{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* New Comment Form */}
        {currentUser && (
            <form onSubmit={handleCommentSubmit} className="mt-6 border-t border-slate-700 pt-6">
                 <h4 className="text-lg font-bold text-white mb-2">댓글 남기기</h4>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="댓글을 추가하세요..."
                />
                <button type="submit" className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                    댓글 게시
                </button>
            </form>
        )}
      </div>
    </div>
  );
};