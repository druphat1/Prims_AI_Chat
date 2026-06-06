import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="relative min-h-[75vh] flex flex-col items-center justify-center px-4 pt-20 pb-10 overflow-hidden">
      <div class="orb orb-purple w-[500px] h-[500px] -top-40 -left-40 opacity-30"></div>
      <div class="orb orb-blue w-[400px] h-[400px] top-20 -right-32 opacity-20"></div>
      <div class="orb orb-cyan w-[300px] h-[300px] bottom-0 left-1/3 opacity-15"></div>
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute w-1 h-1 bg-purple-400 rounded-full top-1/4 left-1/4 float-anim opacity-60"></div>
        <div class="absolute w-1.5 h-1.5 bg-blue-400 rounded-full top-1/3 right-1/3 float-anim opacity-40" style="animation-delay:1s"></div>
        <div class="absolute w-1 h-1 bg-cyan-400 rounded-full bottom-1/4 left-1/2 float-anim opacity-50" style="animation-delay:2s"></div>
      </div>
      <div class="relative z-10 text-center max-w-4xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
          <span class="w-2 h-2 bg-purple-400 rounded-full pulse-ring"></span>
          <span class="text-purple-300 text-[10px] font-mono tracking-widest uppercase">NEURAL_PROCESSING_ENGINE v4.2</span>
        </div>
        <h1 class="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span class="text-white">One Question.</span><br/>
          <span class="gradient-text">Infinite Perspectives.</span>
        </h1>
        <p class="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-mono">
          Explore how different AI minds think about the same problem. Get parallel neural insights in seconds.
        </p>
        <div class="relative max-w-2xl mx-auto">
          <div class="relative rounded-2xl border border-purple-500/20 bg-[#0c0c1a] p-1.5">
            <div class="flex items-center gap-2">
              <div class="flex-1 relative">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                </svg>
                <input
                  [(ngModel)]="question"
                  (keydown.enter)="onAsk()"
                  type="text"
                  placeholder="Enter synthetic command or query neural..."
                  class="w-full bg-transparent border-none rounded-xl py-3 sm:py-3.5 pl-11 pr-4 text-white placeholder-gray-600 text-sm font-mono focus:outline-none"
                />
              </div>
              <button
                (click)="onAsk()"
                [disabled]="!question.trim()"
                class="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-white font-mono font-semibold text-xs tracking-wider whitespace-nowrap disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                style="background: linear-gradient(135deg, #7c3aed, #3b82f6); box-shadow: 0 0 20px rgba(124,58,237,0.3);"
              >
                EXECUTE
              </button>
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-2 mt-5">
            <button *ngFor="let s of quickSuggestions" (click)="question=s;onAsk()" class="pill cursor-pointer text-[10px] font-mono">
              {{ s }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroSectionComponent {
  @Output() askQuestion = new EventEmitter<string>();
  question = '';
  quickSuggestions = [
    'What is the meaning of life?',
    'How do I become successful?',
    'Is AI a threat to humanity?',
  ];
  onAsk(): void {
    if (this.question.trim()) { this.askQuestion.emit(this.question.trim()); }
  }
}
