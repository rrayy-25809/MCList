import React from 'react';
import type { Server } from '../types';
import { ServerCard } from './ServerCard';

interface ServerListProps {
  servers: Server[];
  onSelectServer: (id: number) => void;
  onShowRegisterForm: () => void;
}

export const ServerList: React.FC<ServerListProps> = ({ servers, onSelectServer, onShowRegisterForm }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12 md:py-20">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">
          당신의 <span className="text-emerald-400">다음 모험</span>을 찾으세요
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          플레이어 리뷰와 AI 요약으로 최고의 마인크래프트 서버를 찾아보세요. 멀티플레이어의 즐거움을 위한 궁극의 목적지입니다.
        </p>
        <button 
          onClick={onShowRegisterForm}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 text-lg"
        >
          당신의 서버 등록하기
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8 text-white border-t border-slate-800 pt-12">상위 랭킹 서버</h2>
      <div className="space-y-4">
        {servers.sort((a, b) => a.rank - b.rank).map(server => (
          <ServerCard key={server.id} server={server} onSelect={onSelectServer} />
        ))}
      </div>
    </div>
  );
};