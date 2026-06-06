import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'explore-minds', loadComponent: () => import('./pages/explore-minds/explore-minds.component').then(m => m.ExploreMindsComponent) },
  { path: 'mind-clash', loadComponent: () => import('./pages/mind-clash/mind-clash.component').then(m => m.MindClashComponent) },
  { path: 'history', loadComponent: () => import('./pages/history/history.component').then(m => m.HistoryComponent) },
  { path: '**', redirectTo: '' },
];
