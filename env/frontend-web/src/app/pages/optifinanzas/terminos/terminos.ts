import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './terminos.html',
  styleUrl: './terminos.css',
})
export class Terminos {
  isLangMenuOpen = false;
  
  languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  currentLanguage = this.languages[0];

  constructor(private translate: TranslateService) { 
    const currentCode = this.translate.currentLang || this.translate.getDefaultLang() || 'es';
    this.currentLanguage = this.languages.find(l => l.code === currentCode) || this.languages[0];
  }

  toggleLangMenu(event: Event) {
    event.stopPropagation();
    this.isLangMenuOpen = !this.isLangMenuOpen;
  }

  changeLanguage(langCode: string) {
    this.translate.use(langCode);
    this.currentLanguage = this.languages.find(l => l.code === langCode) || this.languages[0];
    this.isLangMenuOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.isLangMenuOpen = false;
  }
}
