import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto px-4 mb-8">
      <div class="rounded-2xl border border-purple-500/20 bg-[#0c0c1a] p-1.5">
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
              class="w-full bg-transparent border-none rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 text-sm font-mono focus:outline-none"
            />
          </div>
          <button
            (click)="onAsk()"
            [disabled]="!question.trim()"
            class="px-5 py-3 rounded-xl text-white font-mono font-semibold text-xs tracking-wider whitespace-nowrap disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            style="background:linear-gradient(135deg,#7c3aed,#3b82f6);box-shadow:0 0 20px rgba(124,58,237,0.3);"
          >EXECUTE</button>
        </div>
      </div>
    </div>
  `,
})
export class QuestionBoxComponent {
  @Output() askQuestion = new EventEmitter<string>();
  question = '';
  onAsk(): void {
    if (this.question.trim()) { this.askQuestion.emit(this.question.trim()); this.question = ''; }
  }
}
