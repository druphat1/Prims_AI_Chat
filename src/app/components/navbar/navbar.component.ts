import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 navbar-blur">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between h-14">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2 group">
            <div class="w-7 h-7 rounded-lg border border-purple-500/30 flex items-center justify-center">
              <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <span class="font-mono font-bold text-base tracking-wider text-white">NEURO_CORE</span>
          </a>

          <!-- Center Nav Links -->
          <div class="hidden md:flex items-center gap-1">
            <a routerLink="/" routerLinkActive="text-purple-400" [routerLinkActiveOptions]="{exact: true}"
               class="px-3 py-1.5 text-xs tracking-wider text-gray-500 hover:text-purple-400 transition-colors font-mono">
              Home
            </a>
            <a routerLink="/explore-minds" routerLinkActive="text-purple-400"
               class="px-3 py-1.5 text-xs tracking-wider text-gray-500 hover:text-purple-400 transition-colors font-mono">
              Minds
            </a>
            <a routerLink="/mind-clash" routerLinkActive="text-purple-400"
               class="px-3 py-1.5 text-xs tracking-wider text-gray-500 hover:text-purple-400 transition-colors font-mono">
              Clash
            </a>
            <a routerLink="/history" routerLinkActive="text-purple-400"
               class="px-3 py-1.5 text-xs tracking-wider text-gray-500 hover:text-purple-400 transition-colors font-mono">
              History
            </a>
          </div>

          <!-- Right: System Status -->
          <div class="flex items-center gap-3">
            <div class="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5">
              <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <span class="text-[10px] font-mono text-gray-400 tracking-wider">SYSTEM: ONLINE</span>
            </div>
            <button class="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:border-purple-500/30 transition-colors">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </button>

            <!-- Mobile menu button -->
            <button (click)="mobileOpen=!mobileOpen" class="md:hidden w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center">
              <svg *ngIf="!mobileOpen" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              <svg *ngIf="mobileOpen" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div *ngIf="mobileOpen" class="md:hidden border-t border-white/5 px-4 py-3 space-y-1">
        <a routerLink="/" (click)="mobileOpen=false" class="block px-4 py-2.5 rounded-lg text-xs font-mono text-gray-400 hover:text-purple-400 hover:bg-white/5 transition-all">Home</a>
        <a routerLink="/explore-minds" (click)="mobileOpen=false" class="block px-4 py-2.5 rounded-lg text-xs font-mono text-gray-400 hover:text-purple-400 hover:bg-white/5 transition-all">Minds</a>
        <a routerLink="/mind-clash" (click)="mobileOpen=false" class="block px-4 py-2.5 rounded-lg text-xs font-mono text-gray-400 hover:text-purple-400 hover:bg-white/5 transition-all">Clash</a>
        <a routerLink="/history" (click)="mobileOpen=false" class="block px-4 py-2.5 rounded-lg text-xs font-mono text-gray-400 hover:text-purple-400 hover:bg-white/5 transition-all">History</a>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  mobileOpen = false;
}
