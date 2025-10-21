import React, { useState } from 'react';

interface CommunityPostFormProps {
    onSubmit: (title: string, content: string) => void;
    onCancel: () => void;
}

export const CommunityPostForm: React.FC<CommunityPostFormProps> = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() === '' || content.trim() === '') {
            setError('제목과 내용은 비워둘 수 없습니다.');
            return;
        }
        onSubmit(title, content);
    };

    return (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">새 게시물 작성</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="post-title" className="block text-sm font-medium text-slate-300 mb-2">제목</label>
                    <input
                        id="post-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        placeholder="게시물 제목을 입력하세요"
                    />
                </div>
                <div>
                    <label htmlFor="post-content" className="block text-sm font-medium text-slate-300 mb-2">내용</label>
                    <textarea
                        id="post-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                        className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        placeholder="무슨 생각을 하고 있나요?"
                    />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                        취소
                    </button>
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                        게시물 제출
                    </button>
                </div>
            </form>
        </div>
    );
};