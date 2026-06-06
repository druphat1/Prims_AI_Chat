import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiResponse } from '../../models/ai-response.model';
import { PERSONALITIES } from '../../shared/constants/personalities.constants';

@Component({
  selector: 'app-ai-response-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-2xl p-5 card-hover relative overflow-hidden group border transition-all duration-300"
         [style.background]="'rgba(14,14,28,0.8)'"
         [style.border-color]="personality?.borderColor || 'rgba(255,255,255,0.06)'"
         [class]="response.glowClass">
      <div class="absolute top-0 left-0 right-0 h-[2px]"
           [style.background]="'linear-gradient(90deg, ' + (personality?.gradientFrom || '#a855f7') + ', ' + (personality?.gradientTo || '#3b82f6') + ')'"></div>
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
             [style.background]="personality?.iconBg || 'rgba(168,85,247,0.15)'">
          {{ response.emoji }}
        </div>
        <div>
          <h3 class="text-white font-semibold text-sm font-mono">{{ response.personalityName }}</h3>
          <p class="text-[10px] font-mono" [style.color]="personality?.tagColor || '#c084fc'">{{ personality?.title || 'AI_MIND' }}</p>
        </div>
        <div class="ml-auto">
          <div class="w-2 h-2 rounded-full" [style.background]="personality?.gradientFrom || '#a855f7'"
               [class.pulse-ring]="isTyping"></div>
        </div>
      </div>
      <div class="text-gray-300 text-sm leading-relaxed min-h-[60px]">
        <span>{{ displayedText }}</span>
        <span *ngIf="isTyping" class="cursor-blink"></span>
      </div>
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
        <span class="text-[10px] font-mono text-gray-600">{{ getTimestamp() }}</span>
        <button (click)="copyText()" class="text-[10px] font-mono text-gray-500 hover:text-purple-400 transition-colors flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          {{ copied ? 'COPIED' : 'COPY' }}
        </button>
      </div>
      <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           [style.background]="'radial-gradient(circle at 50% 50%, ' + (personality?.gradientFrom || '#a855f7') + '08, transparent 70%)'"></div>
    </div>
  `,
})
export class AiResponseCardComponent implements OnInit, OnDestroy {
  @Input() response!: AiResponse;
  @Input() delay: number = 0;
  personality: any;
  displayedText = '';
  isTyping = true;
  copied = false;
  private typingInterval: any;

  ngOnInit(): void {
    this.personality = PERSONALITIES.find(p => p.id === this.response.personalityId);
    setTimeout(() => this.startTyping(), this.delay);
  }

  ngOnDestroy(): void {
    if (this.typingInterval) clearInterval(this.typingInterval);
  }

  private startTyping(): void {
    const text = this.response.response;
    let i = 0;
    this.typingInterval = setInterval(() => {
      if (i < text.length) { this.displayedText += text[i]; i++; }
      else { clearInterval(this.typingInterval); this.isTyping = false; }
    }, 15);
  }

  getTimestamp(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  copyText(): void {
    navigator.clipboard.writeText(this.response.response);
    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }
}
