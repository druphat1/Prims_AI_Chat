import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(true);
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('prismmind_dark_mode');
    const isDark = stored !== null ? stored === 'true' : true;
    this.darkModeSubject.next(isDark);
  }

  toggleDarkMode(): void {
    const isDark = !this.darkModeSubject.value;
    this.darkModeSubject.next(isDark);
    localStorage.setItem('prismmind_dark_mode', String(isDark));
  }
}
