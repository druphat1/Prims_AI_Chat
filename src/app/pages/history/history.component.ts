import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AiService, HistoryItem } from '../../services/ai.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="mesh-bg min-h-screen pt-16">
      <div class="max-w-[1400px] mx-auto px-4 py-6">
        <div class="flex flex-col lg:flex-row gap-6">

          <!-- Sidebar Filters -->
          <div class="lg:w-56 shrink-0">
            <h3 class="text-white font-mono text-sm font-semibold mb-4">Archive Filters</h3>

            <!-- Search -->
            <div class="mb-5">
              <p class="text-[9px] font-mono text-gray-600 tracking-widest mb-2 uppercase">Universal Search</p>
              <div class="relative">
                <input [(ngModel)]="searchQuery" type="text" placeholder="Trace ID or Keyword..."
                       class="w-full bg-[#0c0c1a] border border-purple-500/15 rounded-lg py-2 px-3 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/30"/>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>

            <!-- Neural Module -->
            <div class="mb-5">
              <p class="text-[9px] font-mono text-gray-600 tracking-widest mb-2 uppercase">Neural Module</p>
              <div class="space-y-2">
                <label *ngFor="let m of modules" class="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" [checked]="selectedModules.includes(m)" (change)="toggleModule(m)"
                         class="w-3.5 h-3.5 rounded border-gray-600 bg-transparent accent-purple-500"/>
                  <span class="text-xs font-mono text-gray-400 group-hover:text-gray-200 transition-colors">{{ m }}</span>
                </label>
              </div>
            </div>

            <!-- Chronological Span -->
            <div class="mb-5">
              <p class="text-[9px] font-mono text-gray-600 tracking-widest mb-2 uppercase">Chronological Span</p>
              <select class="w-full bg-[#0c0c1a] border border-purple-500/15 rounded-lg py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-purple-500/30 appearance-none">
                <option>Last 7 Cycles</option>
                <option>Last 30 Cycles</option>
                <option>All Time</option>
              </select>
            </div>

            <!-- System Status -->
            <div class="mb-5">
              <p class="text-[9px] font-mono text-gray-600 tracking-widest mb-2 uppercase">System Status</p>
              <div class="flex flex-wrap gap-1.5">
                <button *ngFor="let s of statuses"
                        (click)="toggleStatus(s)"
                        [class]="selectedStatuses.includes(s) ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' : 'bg-white/5 border-white/10 text-gray-500'"
                        class="px-2.5 py-1 rounded-full text-[10px] font-mono border transition-all">
                  {{ s }}
                </button>
              </div>
            </div>

            <!-- Core Capacity -->
            <div class="rounded-xl border border-purple-500/10 bg-[#0c0c1a] p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-mono text-purple-400 tracking-wider font-semibold">CORE CAPACITY</span>
                <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 3.6 4 8 4s8-1.8 8-4V7M4 7c0 2 3.6 4 8 4s8-1.8 8-4M4 7c0-2 3.6-4 8-4s8 1.8 8 4"/></svg>
              </div>
              <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                <div class="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500" style="width:74%"></div>
              </div>
              <p class="text-[10px] font-mono text-gray-500">742.8 GB / 1.0 TB Archived</p>
            </div>
          </div>

          <!-- Main Content -->
          <div class="flex-1">
            <div class="mb-6">
              <h1 class="text-purple-400 font-display text-2xl font-bold mb-1">Neural History</h1>
              <p class="text-gray-500 text-sm font-mono">Accessing encrypted interaction logs from the last 7 active cycles.</p>
            </div>

            <!-- View Toggle & Clear -->
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-2">
                <button (click)="viewMode='grid'" [class]="viewMode==='grid' ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' : 'bg-white/5 border-white/10 text-gray-500'"
                        class="w-8 h-8 rounded-lg border flex items-center justify-center transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                </button>
                <button (click)="viewMode='list'" [class]="viewMode==='list' ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' : 'bg-white/5 border-white/10 text-gray-500'"
                        class="w-8 h-8 rounded-lg border flex items-center justify-center transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                </button>
              </div>
              <button *ngIf="history.length > 0" (click)="clearHistory()" class="text-[10px] font-mono text-red-400/60 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500/40">
                Clear All
              </button>
            </div>

            <!-- History Cards Grid -->
            <div *ngIf="history.length > 0" class="grid gap-4" [class]="viewMode==='grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'">
              <div *ngFor="let item of filteredHistory; let i = index"
                   class="rounded-2xl border border-purple-500/10 bg-[#0a0a18] overflow-hidden card-hover group">
                <!-- Card Image Header -->
                <div class="h-32 relative overflow-hidden">
                  <img src="images/hero-banner.png" alt="" class="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"/>
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a18] to-transparent"></div>
                  <div class="absolute top-2 left-2">
                    <span class="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider border"
                          [class]="getModuleClass(item.module)">{{ item.module }}</span>
                  </div>
                </div>

                <!-- Card Body -->
                <div class="p-4">
                  <div class="flex items-start justify-between mb-2">
                    <h3 class="text-white font-display font-semibold text-sm leading-snug flex-1 mr-2">"{{ item.question }}"</h3>
                    <span class="text-[9px] font-mono text-gray-600 whitespace-nowrap">{{ getSpeed(i) }}</span>
                  </div>
                  <p class="text-[10px] font-mono text-gray-600 mb-3">TRACE ID: {{ item.traceId }}</p>
                  <p class="text-gray-500 text-xs font-mono leading-relaxed mb-3 line-clamp-2">{{ item.responses[0] ? item.responses[0].response : 'Processing...' }}</p>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1">
                      <span *ngFor="let r of item.responses.slice(0,3)" class="text-xs">{{ r.emoji }}</span>
                      <span *ngIf="item.responses.length > 3" class="text-[9px] font-mono text-gray-600">+{{ item.responses.length - 3 }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="px-1.5 py-0.5 rounded text-[8px] font-mono" [class]="getStatusClass(item.status)">{{ item.status }}</span>
                      <span class="text-[9px] font-mono text-gray-600">{{ formatDate(item.timestamp) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div *ngIf="history.length === 0" class="text-center py-20">
              <div class="text-5xl mb-4">📭</div>
              <h3 class="text-white font-mono text-sm mb-2">No neural logs found</h3>
              <p class="text-gray-600 text-[10px] font-mono mb-6">Execute your first query to start building interaction history</p>
              <a routerLink="/" class="inline-block px-5 py-2.5 rounded-xl text-white text-xs font-mono font-semibold tracking-wider" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);">Initialize Query ⚡</a>
            </div>

            <!-- Pagination -->
            <div *ngIf="history.length > 0" class="flex items-center justify-center gap-2 mt-8">
              <button class="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-600 hover:text-white hover:border-purple-500/30 transition-all">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button class="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono">1</button>
              <button class="w-8 h-8 rounded-lg border border-white/10 text-gray-600 text-xs font-mono hover:text-white transition-colors">2</button>
              <button class="w-8 h-8 rounded-lg border border-white/10 text-gray-600 text-xs font-mono hover:text-white transition-colors">3</button>
              <span class="text-gray-600 text-xs font-mono">...</span>
              <button class="w-8 h-8 rounded-lg border border-white/10 text-gray-600 text-xs font-mono hover:text-white transition-colors">12</button>
              <button class="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-600 hover:text-white hover:border-purple-500/30 transition-all">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HistoryComponent {
  history: HistoryItem[] = [];
  searchQuery = '';
  viewMode: 'grid' | 'list' = 'grid';
  modules = ['Cognitive Archiver', 'Logic Synth', 'Emotion Matrix'];
  statuses = ['Committed', 'Pending', 'Encrypted'];
  selectedModules: string[] = [];
  selectedStatuses: string[] = [];

  constructor(private aiService: AiService) {
    this.aiService.history$.subscribe(h => this.history = h);
  }

  get filteredHistory(): HistoryItem[] {
    let result = this.history;
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(h => h.question.toLowerCase().includes(q) || h.traceId.toLowerCase().includes(q));
    }
    return result;
  }

  toggleModule(m: string): void {
    const idx = this.selectedModules.indexOf(m);
    if (idx >= 0) this.selectedModules.splice(idx, 1);
    else this.selectedModules.push(m);
  }

  toggleStatus(s: string): void {
    const idx = this.selectedStatuses.indexOf(s);
    if (idx >= 0) this.selectedStatuses.splice(idx, 1);
    else this.selectedStatuses.push(s);
  }

  clearHistory(): void { this.aiService.clearHistory(); }

  formatDate(ts: Date): string {
    const d = new Date(ts);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getSpeed(i: number): string {
    const speeds = ['0.02ms', '0.14ms', '0.05ms', '0.08ms', '0.11ms'];
    return speeds[i % speeds.length];
  }

  getModuleClass(m: string): string {
    const map: Record<string, string> = {
      'LOGIC_CORE': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'MEMORY_V01': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'GLOBAL_STATE': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      'VISUAL_SYNTH': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'EMOTION_MATRIX': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    };
    return map[m] || 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  }

  getStatusClass(s: string): string {
    const map: Record<string, string> = {
      'COMMITTED': 'bg-green-500/15 text-green-400 border border-green-500/20',
      'ENCRYPTED': 'bg-red-500/15 text-red-400 border border-red-500/20',
      'PENDING': 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
    };
    return map[s] || 'bg-gray-500/15 text-gray-400';
  }
}
