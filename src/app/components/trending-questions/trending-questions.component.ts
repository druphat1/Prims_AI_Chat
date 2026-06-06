import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRENDING_QUESTIONS } from '../../shared/constants/personalities.constants';

@Component({
  selector: 'app-trending-questions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-[1400px] mx-auto px-4 py-10">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
          <span class="text-xs">⚡</span>
        </div>
        <h2 class="text-white font-mono font-semibold text-sm tracking-wider">TRENDING_QUERIES</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        <button
          *ngFor="let q of questions; let i = index"
          (click)="selectQuestion.emit(q)"
          class="rounded-xl px-4 py-3.5 text-left group cursor-pointer border border-purple-500/10 bg-[#0c0c1a] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-200"
        >
          <div class="flex items-start gap-3">
            <span class="text-base mt-0.5 opacity-60">{{ icons[i % icons.length] }}</span>
            <span class="text-gray-400 text-xs group-hover:text-gray-200 transition-colors leading-snug font-mono">{{ q }}</span>
          </div>
        </button>
      </div>
    </section>
  `,
})
export class TrendingQuestionsComponent {
  @Output() selectQuestion = new EventEmitter<string>();
  questions = TRENDING_QUESTIONS;
  icons = ['💭', '🚀', '💔', '🤖', '😊', '👑', '🌧️', '❤️', '🏔️', '🌍'];
}
