import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelector } from '../../../shared/language-selector/language-selector';
import { LanguageService } from '../../../shared/language.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [RouterModule, TranslateModule, LanguageSelector],
  templateUrl: './intro.html',
})
export class IntroComponent {
  currentLanguage = inject(LanguageService).current;
}
