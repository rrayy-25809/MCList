

import { GoogleGenAI, Type } from "@google/genai";
import type { Review } from '../types';

if (!process.env.VITE_GEMINI_API_KEY) {
  // This is a placeholder for environments where the key is not set.
  // The app will function with a warning, but AI features will be disabled.
  console.warn("API_KEY 환경 변수가 설정되지 않았습니다. AI 기능이 비활성화됩니다.");
}

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY || '' });

export async function generateServerNames(keywords: string): Promise<string[]> {
  if (!process.env.VITE_GEMINI_API_KEY) {
    // Return some fun mock names if AI is disabled
    return ["픽셀왕국", "블록버스", "크래프트퀘스트", "마인레거시", "에테르크래프트"];
  }

  const systemInstruction = `당신은 마인크래프트 플레이어를 위한 창의적인 조수입니다. 당신의 임무는 사용자가 제공한 키워드 목록을 기반으로 새 마인크래프트 서버를 위한 독특하고, 눈길을 끌며, 창의적인 이름 5개를 생성하는 것입니다. 이름은 한두 단어로 이루어져야 하고 기억하기 쉬워야 합니다. 이름을 JSON 문자열 배열로 반환하세요.`;
  const userPrompt = `키워드: ${keywords}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: '창의적인 마인크래프트 서버 이름.'
          }
        }
      },
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("서버 이름 생성 중 오류:", error);
    return ["이름 생성 중 오류. 다시 시도하세요."];
  }
}

export async function summarizeReviews(reviews: Review[]): Promise<string> {
  if (!process.env.VITE_GEMINI_API_KEY) {
    return "AI 기능이 비활성화되었습니다. API 키를 설정해주세요.";
  }

  if (reviews.length === 0) {
    return "아직 요약을 생성할 리뷰가 없습니다.";
  }

  const reviewTexts = reviews.map(r => `- "${r.comment}" (평점 ${r.rating}/5)`).join('\n');
  const userPrompt = `
    다음은 리뷰 목록입니다:
    ${reviewTexts}

    요약:
  `;

  const systemInstruction = `당신은 마인크래프트 서버 순위 웹사이트의 유용한 조수입니다.
    당신의 임무는 특정 서버에 대한 사용자 리뷰 목록을 요약하는 것입니다.
    플레이어들이 언급한 일반적인 칭찬과 비판을 강조하는 균형 잡힌 단일 단락 요약을 제공하세요.
    새로운 정보를 만들어내지 마세요. 제공된 리뷰에만 근거하여 요약하세요.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("리뷰 요약 중 오류:", error);
    return "오류로 인해 AI 요약을 생성할 수 없습니다.";
  }
}