import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AiResponse } from '../models/ai-response.model';
import { Personality } from '../models/personality.model';
import { PERSONALITIES, AI_RESPONSES } from '../shared/constants/personalities.constants';

export interface HistoryItem {
  id: string;
  question: string;
  responses: AiResponse[];
  timestamp: Date;
  traceId: string;
  module: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private personalities = PERSONALITIES;
  private responsesSubject = new BehaviorSubject<AiResponse[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private historySubject = new BehaviorSubject<HistoryItem[]>([]);

  responses$ = this.responsesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  history$ = this.historySubject.asObservable();

  constructor() {
    this.loadHistory();
  }

  getPersonalities(): Personality[] {
    return this.personalities;
  }

  askQuestion(question: string): void {
    this.loadingSubject.next(true);
    this.responsesSubject.next([]);

    const responses: AiResponse[] = this.personalities.map((p) => {
      const specificResponse = AI_RESPONSES[p.id]?.[question];
      const responseText = specificResponse || AI_RESPONSES[p.id]?.['default'] || 'Processing neural query...';
      return {
        id: `${p.id}-${Date.now()}`,
        personalityId: p.id,
        personalityName: p.name,
        emoji: p.emoji,
        response: responseText,
        glowClass: p.glowClass,
        gradientClass: '',
        isTyping: true,
        displayedText: '',
        timestamp: new Date(),
      };
    });

    responses.forEach((resp, index) => {
      setTimeout(() => {
        const current = this.responsesSubject.value;
        this.responsesSubject.next([...current, resp]);
        if (index === responses.length - 1) {
          this.loadingSubject.next(false);
          this.saveToHistory(question, responses);
        }
      }, 400 * (index + 1));
    });
  }

  getDebateResponses(question: string, p1Id: string, p2Id: string): { p1Response: string; p2Response: string } {
    const p1Resp = AI_RESPONSES[p1Id]?.[question] || AI_RESPONSES[p1Id]?.['default'] || 'Analyzing...';
    const p2Resp = AI_RESPONSES[p2Id]?.[question] || AI_RESPONSES[p2Id]?.['default'] || 'Analyzing...';
    return { p1Response: p1Resp, p2Response: p2Resp };
  }

  clearResponses(): void {
    this.responsesSubject.next([]);
  }

  private saveToHistory(question: string, responses: AiResponse[]): void {
    const modules = ['LOGIC_CORE', 'MEMORY_V01', 'GLOBAL_STATE', 'VISUAL_SYNTH', 'EMOTION_MATRIX'];
    const statuses = ['COMMITTED', 'ENCRYPTED', 'PENDING'];
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      question,
      responses,
      timestamp: new Date(),
      traceId: 'NC-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      module: modules[Math.floor(Math.random() * modules.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
    const current = this.historySubject.value;
    const updated = [historyItem, ...current].slice(0, 50);
    this.historySubject.next(updated);
    try { localStorage.setItem('prismmind_history', JSON.stringify(updated)); } catch (e) {}
  }

  private loadHistory(): void {
    try {
      const stored = localStorage.getItem('prismmind_history');
      if (stored) { this.historySubject.next(JSON.parse(stored)); }
    } catch (e) {}
  }

  clearHistory(): void {
    this.historySubject.next([]);
    localStorage.removeItem('prismmind_history');
  }
}
