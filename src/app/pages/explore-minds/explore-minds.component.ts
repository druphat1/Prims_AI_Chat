import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PERSONALITIES } from '../../shared/constants/personalities.constants';
import { Personality } from '../../models/personality.model';

@Component({
  selector: 'app-explore-minds',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mesh-bg min-h-screen pt-16">
      <!-- Hero Banner -->
      <div class="relative h-[280px] overflow-hidden">
        <img src="images/hero-banner.png" alt="" class="absolute inset-0 w-full h-full object-cover opacity-40"/>
        <div class="absolute inset-0 bg-gradient-to-t from-[#08080f] via-[#08080f]/60 to-transparent"></div>
        <div class="relative z-10 h-full flex flex-col justify-end p-6 max-w-[1400px] mx-auto">
          <div class="flex gap-2 mb-3">
            <span class="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">FEATURED AUGMENT</span>
            <span class="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider bg-green-500/20 text-green-300 border border-green-500/30">v1.2 STABLE</span>
          </div>
          <h1 class="font-display text-3xl md:text-4xl font-bold text-white mb-2">Hyper-Threaded Cognition</h1>
          <p class="text-gray-400 text-sm font-mono max-w-lg mb-4">Elevate your neural processing with the new Tier-S cognitive framework. Optimized for multi-tasking across 4096 concurrent sub-processes.</p>
          <div class="flex gap-3">
            <button class="px-5 py-2.5 rounded-lg text-white text-xs font-mono font-semibold tracking-wider" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);box-shadow:0 0 20px rgba(124,58,237,0.3);">Forge Mind</button>
            <button class="px-5 py-2.5 rounded-lg text-white text-xs font-mono font-semibold tracking-wider border border-white/20 hover:bg-white/5 transition-colors">View Specs</button>
          </div>
        </div>
      </div>

      <div class="max-w-[1400px] mx-auto px-4 py-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar -->
          <div class="lg:w-56 shrink-0">
            <p class="text-[10px] font-mono text-gray-600 tracking-widest mb-3">NEURAL DOMAINS</p>
            <div class="space-y-1">
              <button *ngFor="let cat of categories; let i = index"
                      (click)="activeCategory = i"
                      class="w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all"
                      [class]="activeCategory === i ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'">
                {{ cat }}
                <span *ngIf="activeCategory === i" class="float-right">›</span>
              </button>
            </div>

            <!-- Neural Health -->
            <div class="mt-8 rounded-xl border border-purple-500/10 bg-[#0c0c1a] p-4">
              <h4 class="text-white font-mono text-xs font-semibold mb-1">Neural Health</h4>
              <p class="text-[10px] font-mono text-gray-600 mb-3">Current sync stability at 98.4%. Optimal state.</p>
              <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
                <div class="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500" style="width:98%"></div>
              </div>
              <button class="w-full py-2 rounded-lg border border-white/10 text-[10px] font-mono text-gray-400 hover:text-white hover:border-purple-500/30 transition-all">Run Diagnostics</button>
            </div>
          </div>

          <!-- Main Content -->
          <div class="flex-1">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 class="font-display text-xl font-bold text-white">Neural Marketplace</h2>
              <div class="flex items-center gap-2">
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input type="text" placeholder="Search augments..." class="bg-[#0c0c1a] border border-purple-500/10 rounded-lg py-2 pl-9 pr-3 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/30 w-48"/>
                </div>
                <button class="px-3 py-2 rounded-lg border border-purple-500/10 bg-[#0c0c1a] text-gray-500 hover:text-purple-400 transition-colors flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                  <span class="text-[10px] font-mono">SORT</span>
                </button>
              </div>
            </div>

            <!-- Personality Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div *ngFor="let p of personalities; let i = index"
                   class="rounded-2xl border bg-[#0c0c1a] p-6 card-hover relative overflow-hidden group"
                   [style.border-color]="p.borderColor">
                <div class="absolute top-0 left-0 right-0 h-[2px]"
                     [style.background]="'linear-gradient(90deg, ' + p.gradientFrom + ', ' + p.gradientTo + ')'"></div>

                <!-- Price tag -->
                <div class="flex justify-between items-start mb-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                       [style.background]="p.iconBg">{{ p.emoji }}</div>
                  <span class="text-[10px] font-mono text-gray-500">Ξ {{ (i + 1) * 1.2 | number:'1.1-1' }}k</span>
                </div>

                <h3 class="text-white font-display font-bold text-base mb-1">{{ p.name }}: {{ p.title }}</h3>
                <p class="text-gray-500 text-xs font-mono leading-relaxed mb-4">{{ p.description }}</p>

                <!-- Stats -->
                <div class="flex gap-6 mb-4">
                  <div>
                    <p class="text-white font-mono text-lg font-bold">{{ (i + 1) * 2 }}ms</p>
                  </div>
                  <div>
                    <p class="text-white font-mono text-lg font-bold">Tier-{{ ['A','S','A','B','A','S'][i] }}</p>
                  </div>
                </div>

                <button class="w-full py-2.5 rounded-lg text-xs font-mono font-semibold tracking-wider text-white transition-all"
                        [style.background]="'linear-gradient(135deg, ' + p.gradientFrom + ', ' + p.gradientTo + ')'"
                        [style.box-shadow]="'0 0 15px ' + p.gradientFrom + '40'">
                  INSTALL MODULE
                </button>

                <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     [style.background]="'radial-gradient(circle at 50% 50%, ' + p.gradientFrom + '08, transparent 70%)'"></div>
              </div>
            </div>

            <!-- Featured Section -->
            <div class="rounded-2xl border border-purple-500/15 bg-[#0a0a18] p-6 mb-6">
              <div class="flex flex-col md:flex-row gap-6">
                <div class="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                  <img src="images/hero-banner.png" alt="" class="w-full h-full object-cover opacity-60"/>
                </div>
                <div class="flex-1">
                  <span class="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 mb-2 inline-block">⚡ LIMITED CAPACITY</span>
                  <h3 class="font-display text-xl font-bold text-white mb-2">The Architect's Core</h3>
                  <p class="text-gray-500 text-xs font-mono leading-relaxed mb-4">A complete rewrite of the neural basal ganglia. Designed for those who define the rules of the system, rather than follow them. Limited to 50 active syncs globally.</p>
                  <div class="flex items-center gap-8">
                    <div>
                      <p class="text-[9px] font-mono text-gray-600 tracking-wider">ARCHITECTURE</p>
                      <p class="text-white font-mono text-sm">Omega-6 Deca-core</p>
                    </div>
                    <div>
                      <p class="text-[9px] font-mono text-gray-600 tracking-wider">SYNC RATIO</p>
                      <p class="text-white font-mono text-sm">1:1 Virtual Reality</p>
                    </div>
                    <button class="ml-auto px-5 py-2.5 rounded-lg text-xs font-mono font-semibold tracking-wider text-white" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);">Request Access</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ExploreMindsComponent {
  personalities = PERSONALITIES;
  categories = ['All Architecture', 'Analytical Logic', 'Creative Synthesis', 'Tactical Awareness', 'Emotive Processing'];
  activeCategory = 0;
}
