import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 max-w-[1400px] mx-auto">
      <div *ngFor="let i of skeletons" class="glass rounded-2xl p-6 space-y-4 border border-purple-500/10">
        <div class="flex items-center gap-3">
          <div class="skeleton w-11 h-11 rounded-xl"></div>
          <div class="space-y-2 flex-1">
            <div class="skeleton h-4 w-24 rounded"></div>
            <div class="skeleton h-3 w-16 rounded"></div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="skeleton h-3 w-full rounded"></div>
          <div class="skeleton h-3 w-5/6 rounded"></div>
          <div class="skeleton h-3 w-4/6 rounded"></div>
          <div class="skeleton h-3 w-3/4 rounded"></div>
        </div>
        <div class="flex justify-between pt-3 border-t border-white/5">
          <div class="skeleton h-3 w-16 rounded"></div>
          <div class="skeleton h-3 w-12 rounded"></div>
        </div>
      </div>
    </div>
  `,
})
export class LoadingSpinnerComponent {
  @Input() count = 6;
  get skeletons(): number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }
}
