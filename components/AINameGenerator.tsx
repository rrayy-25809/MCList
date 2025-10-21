import React, { useState } from 'react';
import { generateServerNames } from '../services/geminiService';
import { SparklesIcon, BotIcon } from './icons';

interface AINameGeneratorProps {
    onSelectName: (name: string) => void;
}

export const AINameGenerator: React.FC<AINameGeneratorProps> = ({ onSelectName }) => {
    const [keywords, setKeywords] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!keywords.trim()) {
            setError('키워드를 입력해주세요.');
            return;
        }
        setIsLoading(true);
        setError('');
        setSuggestions([]);
        try {
            const names = await generateServerNames(keywords);
            setSuggestions(names);
        } catch (err) {
            setError('이름 생성에 실패했습니다. 다시 시도해주세요.');
            console.error(err);
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-lg space-y-3">
            <div className="flex items-center space-x-2">
                <BotIcon className="w-6 h-6 text-indigo-400" />
                <h4 className="font-bold text-lg text-white">AI 서버 이름 추천기</h4>
            </div>
            <p className="text-sm text-slate-400">이름을 짓기 힘드신가요? 서버에 대한 키워드(예: "생존, 마법, 퀘스트")를 입력하면 AI가 도와드립니다!</p>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="flex-grow bg-slate-900 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="키워드..."
                />
                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    <SparklesIcon className="w-5 h-5"/>
                    <span>{isLoading ? '생성 중...' : '이름 추천받기'}</span>
                </button>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {isLoading && <div className="text-center text-slate-400 py-2">AI가 생각 중입니다...</div>}
            {suggestions.length > 0 && (
                <div className="pt-2">
                    <h5 className="text-sm font-semibold text-slate-300 mb-2">추천 이름:</h5>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((name, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => onSelectName(name)}
                                className="bg-slate-700 hover:bg-emerald-600 text-slate-200 hover:text-white text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};