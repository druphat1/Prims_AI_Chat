import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { TrendingQuestionsComponent } from '../../components/trending-questions/trending-questions.component';
import { AiResponseCardComponent } from '../../components/ai-response-card/ai-response-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { QuestionBoxComponent } from '../../components/question-box/question-box.component';
import { AiService } from '../../services/ai.service';
import { AiResponse } from '../../models/ai-response.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, TrendingQuestionsComponent, AiResponseCardComponent, LoadingSpinnerComponent, QuestionBoxComponent],
  template: `
    <div class="home-dashboard min-h-screen text-slate-100">
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,140,255,0.16),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.14),transparent_20%)] pointer-events-none"></div>
        <div class="absolute left-1/2 top-14 h-72 w-72 -translate-x-1/2 rounded-full bg-[#4f8cff]/10 blur-3xl opacity-70 pointer-events-none"></div>
        <div class="absolute right-10 top-52 h-60 w-60 rounded-full bg-[#c084fc]/10 blur-3xl opacity-70 pointer-events-none"></div>

        <div class="relative z-10 max-w-[1600px] mx-auto px-4 py-6">
          <app-hero-section *ngIf="!hasResponses" (askQuestion)="onAsk($event)"></app-hero-section>

          <div *ngIf="hasResponses" class="space-y-6">
            <header class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_40px_-24px_rgba(79,140,255,0.55)]">
                  <span class="text-2xl font-semibold text-white">N</span>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.45em] text-slate-400">NEURAL CONTROL CENTER</p>
                  <h1 class="mt-2 text-3xl font-semibold text-white font-display tracking-tight">NEURO_CORE</h1>
                </div>
              </div>
              <div class="flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
                <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2">CORE_INIT</span>
                <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2">NODES</span>
                <span class="rounded-full border border-white/10 bg-[#4f8cff]/10 px-4 py-2 text-white">SYSTEM: ONLINE</span>
              </div>
            </header>

            <div class="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_360px]">
              <aside class="space-y-6">
                <section class="glass-card border border-white/10 p-5">
                  <div class="flex items-center justify-between mb-5">
                    <div>
                      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Navigation</p>
                    </div>
                    <span class="text-[11px] uppercase tracking-[0.35em] text-slate-400">v4.2</span>
                  </div>
                  <nav class="space-y-3">
                    <button type="button" class="sidebar-link sidebar-link-active">
                      <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4f8cff]/10 text-[#4f8cff]">⌁</span>
                      <div class="text-left">
                        <p class="text-sm font-semibold text-white">Home</p>
                        <p class="text-[11px] text-slate-400">Control hub</p>
                      </div>
                    </button>
                    <button type="button" class="sidebar-link">
                      <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-[#c084fc]">🧠</span>
                      <div class="text-left">
                        <p class="text-sm font-semibold text-slate-100">Minds</p>
                        <p class="text-[11px] text-slate-500">Cognitive streams</p>
                      </div>
                    </button>
                    <button type="button" class="sidebar-link">
                      <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-[#4f8cff]">⚔</span>
                      <div class="text-left">
                        <p class="text-sm font-semibold text-slate-100">Clash</p>
                        <p class="text-[11px] text-slate-500">Battle matrix</p>
                      </div>
                    </button>
                    <button type="button" class="sidebar-link">
                      <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-[#c084fc]">⟳</span>
                      <div class="text-left">
                        <p class="text-sm font-semibold text-slate-100">History</p>
                        <p class="text-[11px] text-slate-500">Trace logs</p>
                      </div>
                    </button>
                  </nav>

                  <div class="mt-6 rounded-3xl border border-white/10 bg-[#111827]/75 p-4">
                    <p class="text-xs uppercase tracking-[0.35em] text-slate-400 mb-4">Node Health</p>
                    <div class="space-y-4">
                      <div>
                        <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span>CPU Affinity</span>
                          <span>98.4%</span>
                        </div>
                        <div class="progress-track"><div class="progress-fill w-[98.4%]"></div></div>
                      </div>
                      <div>
                        <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span>Latency</span>
                          <span>0.4ms</span>
                        </div>
                        <div class="progress-track secondary"><div class="progress-fill w-[24%]"></div></div>
                      </div>
                    </div>
                  </div>
                </section>

                <section class="glass-card border border-white/10 p-5">
                  <div class="flex items-center gap-4">
                    <div class="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#4f8cff]/10 text-[#4f8cff] shadow-[0_0_30px_rgba(79,140,255,0.22)]">
                      ⚡
                    </div>
                    <div>
                      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Premium Active</p>
                      <p class="mt-2 text-white text-sm font-semibold">Access granted to tier 3 clusters</p>
                    </div>
                  </div>
                </section>
              </aside>

              <main class="space-y-6">
                <section class="glass-card border border-white/10 p-5">
                  <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div class="flex items-center gap-4">
                      <div class="grid h-14 w-14 place-items-center rounded-3xl bg-[#111827]/85 border border-white/10 shadow-[0_0_40px_-24px_rgba(79,140,255,0.35)]">
                        <span class="text-lg font-semibold text-white">AI</span>
                      </div>
                      <div>
                        <p class="text-[11px] uppercase tracking-[0.4em] text-slate-400">ascend_to_synthetic_intel.exe</p>
                        <p class="mt-2 text-slate-200">Establishing secure command feed through the neural mesh.</p>
                      </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                      <button type="button" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-slate-100 transition hover:bg-[#4f8cff]/10">View</button>
                      <button type="button" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-slate-100 transition hover:bg-[#c084fc]/10">Config</button>
                    </div>
                  </div>

                  <div class="space-y-4 font-terminal text-[12px] text-slate-400">
                    <div class="flex flex-wrap gap-3 items-center rounded-3xl border border-white/10 bg-white/5 p-4">
                      <span class="text-slate-400">{{ getTime() }}</span>
                      <span class="rounded-full bg-[#4f8cff]/10 px-2 py-1 text-[#4f8cff]">[INIT]</span>
                      <span class="text-slate-200">Establishing secure handshake with Neural-Link. Status: Success</span>
                    </div>
                    <div class="flex flex-wrap gap-3 items-center rounded-3xl border border-white/10 bg-white/5 p-4">
                      <span class="text-slate-400">{{ getTime() }}</span>
                      <span class="rounded-full bg-[#c084fc]/10 px-2 py-1 text-[#c084fc]">[QUERY]</span>
                      <span class="text-slate-200">"{{ currentQuestion }}"</span>
                    </div>
                    <div class="flex flex-wrap gap-3 items-center rounded-3xl border border-white/10 bg-white/5 p-4">
                      <span class="text-slate-400">{{ getTime() }}</span>
                      <span class="rounded-full bg-[#4f8cff]/10 px-2 py-1 text-[#4f8cff]">[DATA]</span>
                      <span class="text-slate-200">Dispatching to {{ responses.length }} neural modules... Processing complete.</span>
                    </div>
                  </div>

                  <div class="mt-6 rounded-[26px] border border-[#4f8cff]/15 bg-[#111827]/75 p-6 shadow-[0_20px_60px_rgba(79,140,255,0.14)]">
                    <p class="text-lg italic text-slate-100 font-display">"Cognition is no longer a biological monopoly."</p>
                  </div>
                </section>

                <section class="glass-card border border-white/10 p-5">
                  <app-question-box (askQuestion)="onAsk($event)"></app-question-box>
                </section>

                <section *ngIf="responses.length > 0" class="glass-card border border-white/10 p-5">
                  <div class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div class="flex items-center gap-4">
                      <span class="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#4f8cff]/10 text-[#4f8cff]">🧠</span>
                      <div>
                        <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Neural Perspectives</p>
                        <h2 class="text-2xl font-semibold text-white">{{ responses.length }} Nodes</h2>
                      </div>
                    </div>
                    <span class="pill">AI Flow</span>
                  </div>
                  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <app-ai-response-card
                      *ngFor="let r of responses; let i = index"
                      [response]="r"
                      [delay]="i * 200"
                      class="slide-up"
                      [style.animation-delay.ms]="i * 150"
                    ></app-ai-response-card>
                  </div>
                </section>
              </main>

              <aside class="space-y-6">
                <section class="glass-card relative overflow-hidden border border-white/10 p-5">
                  <div class="absolute inset-x-0 top-0 h-16 bg-[#4f8cff]/5 blur-3xl opacity-60"></div>
                  <div class="relative z-10">
                    <div class="mb-5 flex items-center justify-between">
                      <div>
                        <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Neural Visualizer</p>
                        <h3 class="text-lg font-semibold text-white">Visual Cortex</h3>
                      </div>
                      <span class="rounded-full bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.35em] text-slate-100">92% sync</span>
                    </div>
                    <div class="relative flex h-[260px] items-center justify-center overflow-hidden rounded-[28px] border border-[#4f8cff]/15 bg-[#111827]/85">
                      <div class="neural-glow"></div>
                      <div class="neural-brain"></div>
                    </div>
                  </div>
                </section>

                <section class="glass-card border border-white/10 p-5">
                  <div class="mb-5 flex items-center justify-between">
                    <div>
                      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Cluster Integrity</p>
                      <h3 class="text-lg font-semibold text-white">System overview</h3>
                    </div>
                    <span class="text-sm font-semibold text-white">Live</span>
                  </div>
                  <div class="space-y-5">
                    <div>
                      <div class="mb-2 flex items-center justify-between text-xs text-slate-400">
                        <span>Cognitive Load</span>
                        <span>64%</span>
                      </div>
                      <div class="progress-track"><div class="progress-fill w-[64%]"></div></div>
                    </div>
                    <div>
                      <div class="mb-2 flex items-center justify-between text-xs text-slate-400">
                        <span>Entropy Level</span>
                        <span>0.002 ϟ</span>
                      </div>
                      <div class="progress-track secondary"><div class="progress-fill w-[32%]"></div></div>
                    </div>
                    <div class="rounded-3xl border border-[#ffffff0d] bg-[#111827]/80 p-4 text-sm text-slate-300">
                      <span class="font-semibold text-[#c084fc]">Warning:</span> Sub-system 402 reported minor temporal drift. Auto-correction in progress.
                    </div>
                  </div>
                </section>

                <section class="glass-card border border-white/10 p-5">
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div class="rounded-3xl border border-white/10 bg-[#111827]/75 p-4">
                      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Latency</p>
                      <p class="mt-3 text-3xl font-semibold text-white">12ms</p>
                    </div>
                    <div class="rounded-3xl border border-white/10 bg-[#111827]/75 p-4">
                      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Storage</p>
                      <p class="mt-3 text-3xl font-semibold text-white">2.4 PB</p>
                    </div>
                    <div class="rounded-3xl border border-white/10 bg-[#111827]/75 p-4">
                      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Active Synapse</p>
                      <p class="mt-3 text-3xl font-semibold text-white">14.8k</p>
                    </div>
                    <div class="rounded-3xl border border-white/10 bg-[#111827]/75 p-4">
                      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Tier</p>
                      <p class="mt-3 text-3xl font-semibold text-white">Tier 3</p>
                    </div>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>

      <app-loading-spinner *ngIf="isLoading" [count]="6"></app-loading-spinner>

      <app-trending-questions *ngIf="!hasResponses && !isLoading" (selectQuestion)="onAsk($event)"></app-trending-questions>
    </div>
  `,
})
export class HomeComponent {
  responses: AiResponse[] = [];
  isLoading = false;
  hasResponses = false;
  currentQuestion = '';

  constructor(private aiService: AiService) {
    this.aiService.responses$.subscribe(r => {
      this.responses = r;
      if (r.length > 0) this.hasResponses = true;
    });
    this.aiService.loading$.subscribe(l => this.isLoading = l);
  }

  onAsk(question: string): void {
    this.currentQuestion = question;
    this.hasResponses = false;
    this.aiService.askQuestion(question);
  }

  getTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}
