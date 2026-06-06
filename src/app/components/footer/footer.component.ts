import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="border-t border-purple-500/10 mt-12">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded border border-purple-500/30 flex items-center justify-center">
              <svg class="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <span class="font-mono text-xs text-gray-600">NEURO_CORE v4.2.1</span>
          </div>
          <div class="flex gap-6">
            <a routerLink="/" class="text-[10px] font-mono text-gray-600 hover:text-purple-400 transition-colors tracking-wider">HOME</a>
            <a routerLink="/explore-minds" class="text-[10px] font-mono text-gray-600 hover:text-purple-400 transition-colors tracking-wider">MINDS</a>
            <a routerLink="/mind-clash" class="text-[10px] font-mono text-gray-600 hover:text-purple-400 transition-colors tracking-wider">CLASH</a>
            <a routerLink="/history" class="text-[10px] font-mono text-gray-600 hover:text-purple-400 transition-colors tracking-wider">HISTORY</a>
          </div>
          <span class="text-[10px] font-mono text-gray-700">© 2026 NEURAL_SYSTEMS</span>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
