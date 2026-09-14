import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelector } from '../language-selector/language-selector';
import { CONTACT_EMAIL, LegalApp, LegalDocument, LegalItem, LegalSection } from './legal.models';

// Página única para la Política de Privacidad y los Términos de todas las apps.
// La app y el documento llegan por la data de la ruta (ver app.routes.ts).
@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [RouterModule, TranslateModule, LanguageSelector],
  templateUrl: './legal-page.html',
})
export class LegalPage {
  private data = inject(ActivatedRoute).snapshot.data;

  app: LegalApp = this.data['app'];
  document: LegalDocument = this.data['document'];
  contactEmail = CONTACT_EMAIL;

  key(key: string, section?: LegalSection) {
    const sectionPrefix = section?.key ? section.key + '.' : '';
    return `${this.app.namespace}.${this.document.key}.${sectionPrefix}${key}`;
  }

  isPlain(item: LegalItem): item is string {
    return typeof item === 'string';
  }
}
