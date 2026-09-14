import { Component, HostListener, computed, inject, input } from '@angular/core';
import { LanguageService } from '../language.service';

// Las clases están escritas completas para que Tailwind las detecte
const VARIANTS = {
  light: {
    button: 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 focus:ring-emerald-500',
    chevron: 'text-slate-400',
    menu: 'bg-white border-slate-200',
    item: 'hover:bg-slate-50',
    active: 'text-emerald-600',
    inactive: 'text-slate-600',
  },
  green: {
    button: 'bg-opti-dark-card border-gray-700 text-white hover:border-opti-green focus:ring-opti-green',
    chevron: 'text-gray-400',
    menu: 'bg-opti-dark-card border-gray-700',
    item: 'hover:bg-gray-800',
    active: 'text-opti-green',
    inactive: 'text-gray-300',
  },
  blue: {
    button: 'bg-scan-card border-slate-700 text-white hover:border-scan-accent focus:ring-scan-accent',
    chevron: 'text-slate-400',
    menu: 'bg-scan-card border-slate-700',
    item: 'hover:bg-slate-800',
    active: 'text-scan-accent',
    inactive: 'text-slate-300',
  },
};

export type LanguageSelectorVariant = keyof typeof VARIANTS;

@Component({
  selector: 'app-language-selector',
  standalone: true,
  templateUrl: './language-selector.html',
})
export class LanguageSelector {
  private languageService = inject(LanguageService);

  variant = input<LanguageSelectorVariant>('blue');
  styles = computed(() => VARIANTS[this.variant()]);

  languages = this.languageService.languages;
  currentLanguage = this.languageService.current;
  isLangMenuOpen = false;

  toggleLangMenu(event: Event) {
    event.stopPropagation();
    this.isLangMenuOpen = !this.isLangMenuOpen;
  }

  changeLanguage(langCode: string) {
    this.languageService.use(langCode);
    this.isLangMenuOpen = false;
  }

  // Cierra el menú al hacer clic por fuera
  @HostListener('document:click')
  onDocumentClick() {
    this.isLangMenuOpen = false;
  }
}
