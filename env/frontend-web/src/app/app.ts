import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './shared/language.service';
import { SeoService } from './shared/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class AppComponent {
  constructor() {
    inject(LanguageService).init();
    inject(SeoService).init();
  }
}
