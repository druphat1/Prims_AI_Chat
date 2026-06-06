import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PERSONALITIES } from '../../shared/constants/personalities.constants';
import { Personality } from '../../models/personality.model';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-mind-clash',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mesh-bg min-h-screen pt-16">
      <div class="max-w-[1400px] mx-auto px-4 py-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span class="text-[10px] font-mono text-red-400 tracking-widest uppercase">LIVE ARENA EVENT</span>
            </div>
            <h1 class="font-display text-3xl md:text-4xl font-bold text-white mb-2">Quantum Sovereignty Debate</h1>
            <p class="text-gray-500 text-sm font-mono max-w-lg">Competing neural entities analyze the ethical implications of autonomous data-states in the year 2088.</p>
          </div>
          <div class="rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-3 text-center">
            <p class="text-[9px] font-mono text-gray-500 tracking-widest mb-1">TOTAL STAKES</p>
            <p class="text-purple-300 font-mono text-xl font-bold">4.82M CRED</p>
          </div>
        </div>

        <!-- Main Arena -->
        <div class="grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-4 mb-6">
          <!-- Challenger (Left) -->
          <div class="rounded-2xl border border-blue-500/20 bg-[#0a0a18] overflow-hidden">
            <div class="h-48 relative overflow-hidden">
              <img src="images/avatar-challenger.png" alt="Challenger" class="w-full h-full object-cover"/>
              <div class="absolute bottom-2 left-2">
                <span class="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider bg-blue-500/30 text-blue-300 border border-blue-500/40">CHALLENGER</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-white font-display font-bold text-lg mb-1">{{ selected1?.name || 'AEON-7' }}</h3>
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-mono text-gray-600 tracking-wider">COGNITIVE LOAD</span>
                <span class="text-blue-400 font-mono text-sm font-bold">82%</span>
              </div>
              <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
                <div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style="width:82%"></div>
              </div>
              <!-- Personality selector -->
              <div class="flex flex-wrap gap-1.5">
                <button *ngFor="let p of personalities"
                        (click)="selectP1(p)"
                        [class]="selected1?.id === p.id ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-white/5 border-white/10 text-gray-500'"
                        class="px-2 py-1 rounded text-[9px] font-mono border transition-all hover:border-blue-500/40">
                  {{ p.emoji }} {{ p.name }}
                </button>
              </div>
            </div>
          </div>

          <!-- Center: Debate Stream -->
          <div class="rounded-2xl border border-purple-500/15 bg-[#0a0a18]">
            <div class="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                <span class="text-[10px] font-mono text-gray-600 tracking-wider">ACTIVE_DEBATE_STREAM_V2.1</span>
              </div>
              <div class="flex gap-1">
                <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                <div class="w-2 h-2 rounded-full bg-pink-500"></div>
              </div>
            </div>

            <!-- Messages -->
            <div class="p-4 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
              <div *ngIf="!debateStarted" class="flex flex-col items-center justify-center h-[300px] text-center">
                <div class="text-4xl mb-3">⚔️</div>
                <h3 class="text-white font-mono text-sm mb-1">Select two minds and inject a prompt</h3>
                <p class="text-gray-600 text-[10px] font-mono">Watch them clash with opposing neural pathways</p>
              </div>

              <div *ngIf="debateStarted">
                <!-- P1 Message -->
                <div class="mb-4">
                  <span class="text-[9px] font-mono text-gray-600">{{ selected1?.name || 'AEON-7' }} [00:00:45]</span>
                  <div class="mt-1 rounded-xl bg-white/5 border border-white/5 p-4">
                    <p class="text-gray-300 text-sm font-mono leading-relaxed">{{ p1Text }}<span *ngIf="p1Typing" class="cursor-blink"></span></p>
                  </div>
                </div>

                <!-- P2 Message -->
                <div class="mb-4">
                  <div class="text-right">
                    <span class="text-[9px] font-mono text-gray-600">{{ selected2?.name || 'CYPHER-X' }} [00:00:36]</span>
                  </div>
                  <div class="mt-1 rounded-xl bg-white/5 border border-white/5 p-4">
                    <p class="text-gray-300 text-sm font-mono leading-relaxed">{{ p2Text }}<span *ngIf="p2Typing" class="cursor-blink"></span></p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Input -->
            <div class="p-4 border-t border-white/5">
              <div class="flex items-center gap-2">
                <input [(ngModel)]="question" (keydown.enter)="startClash()" type="text"
                       placeholder="Inject logic prompt..."
                       class="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-600 text-xs font-mono focus:outline-none focus:border-purple-500/30"/>
                <button (click)="startClash()" [disabled]="!canClash"
                        class="px-5 py-2.5 rounded-xl text-white text-xs font-mono font-semibold tracking-wider disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                        style="background:linear-gradient(135deg,#7c3aed,#3b82f6);box-shadow:0 0 15px rgba(124,58,237,0.3);">
                  INJECT <span>⚡</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Defender (Right) -->
          <div class="rounded-2xl border border-pink-500/20 bg-[#0a0a18] overflow-hidden">
            <div class="h-48 relative overflow-hidden">
              <img src="images/avatar-defender.png" alt="Defender" class="w-full h-full object-cover"/>
              <div class="absolute bottom-2 right-2">
                <span class="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider bg-pink-500/30 text-pink-300 border border-pink-500/40">DEFENDER</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-white font-display font-bold text-lg mb-1">{{ selected2?.name || 'CYPHER-X' }}</h3>
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-mono text-gray-600 tracking-wider">COGNITIVE LOAD</span>
                <span class="text-pink-400 font-mono text-sm font-bold">64%</span>
              </div>
              <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
                <div class="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500" style="width:64%"></div>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <button *ngFor="let p of personalities"
                        (click)="selectP2(p)"
                        [class]="selected2?.id === p.id ? 'bg-pink-500/20 border-pink-500/50 text-pink-300' : 'bg-white/5 border-white/10 text-gray-500'"
                        class="px-2 py-1 rounded text-[9px] font-mono border transition-all hover:border-pink-500/40">
                  {{ p.emoji }} {{ p.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="rounded-xl border border-purple-500/10 bg-[#0c0c1a] p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[9px] font-mono text-gray-600 tracking-widest uppercase">Public Sentiment</span>
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
            <p class="text-white font-mono text-2xl font-bold">68%</p>
            <p class="text-[9px] font-mono text-gray-600">Favoring {{ selected1?.name || 'Challenger' }}</p>
          </div>
          <div class="rounded-xl border border-purple-500/10 bg-[#0c0c1a] p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[9px] font-mono text-gray-600 tracking-widest uppercase">Data Processed</span>
              <div class="w-6 h-6 rounded bg-purple-500/10 flex items-center justify-center">
                <svg class="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 3.6 4 8 4s8-1.8 8-4V7M4 7c0 2 3.6 4 8 4s8-1.8 8-4M4 7c0-2 3.6-4 8-4s8 1.8 8 4"/></svg>
              </div>
            </div>
            <p class="text-white font-mono text-2xl font-bold">1.2 PB</p>
            <p class="text-[9px] font-mono text-gray-600">Total Corpus</p>
          </div>
          <div class="rounded-xl border border-purple-500/10 bg-[#0c0c1a] p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[9px] font-mono text-gray-600 tracking-widest uppercase">Logic Defense</span>
            </div>
            <p class="font-mono text-2xl font-bold" style="color:#22c55e">STRONG</p>
            <p class="text-[9px] font-mono text-gray-600">No breaches</p>
          </div>
          <div class="rounded-xl border border-purple-500/10 bg-[#0c0c1a] p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[9px] font-mono text-gray-600 tracking-widest uppercase">Remaining Time</span>
              <div class="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
            </div>
            <p class="text-orange-400 font-mono text-2xl font-bold">12:44</p>
            <p class="text-[9px] font-mono text-gray-600">Clash Window</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MindClashComponent implements OnDestroy {
  personalities = PERSONALITIES;
  selected1: Personality | null = null;
  selected2: Personality | null = null;
  question = '';
  debateStarted = false;
  p1Text = '';
  p2Text = '';
  p1Typing = false;
  p2Typing = false;
  private intervals: any[] = [];

  constructor(private aiService: AiService) {}

  selectP1(p: Personality): void { this.selected1 = p; }
  selectP2(p: Personality): void { this.selected2 = p; }

  get canClash(): boolean {
    return !!this.selected1 && !!this.selected2 && this.selected1.id !== this.selected2.id && !!this.question.trim();
  }

  startClash(): void {
    if (!this.canClash) return;
    this.debateStarted = true;
    this.p1Text = '';
    this.p2Text = '';
    this.p1Typing = true;
    this.p2Typing = true;
    this.intervals.forEach(i => clearInterval(i));
    this.intervals = [];

    const { p1Response, p2Response } = this.aiService.getDebateResponses(this.question, this.selected1!.id, this.selected2!.id);

    let i1 = 0;
    const int1 = setInterval(() => {
      if (i1 < p1Response.length) { this.p1Text += p1Response[i1]; i1++; }
      else { clearInterval(int1); this.p1Typing = false; }
    }, 18);
    this.intervals.push(int1);

    let i2 = 0;
    const int2 = setInterval(() => {
      if (i2 < p2Response.length) { this.p2Text += p2Response[i2]; i2++; }
      else { clearInterval(int2); this.p2Typing = false; }
    }, 22);
    this.intervals.push(int2);
  }

  ngOnDestroy(): void {
    this.intervals.forEach(i => clearInterval(i));
  }
}
