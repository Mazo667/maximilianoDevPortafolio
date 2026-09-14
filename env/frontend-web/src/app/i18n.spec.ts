import { TRANSLATIONS } from '../testing/translate-testing';

function flatten(obj: object, prefix = ''): Record<string, unknown> {
  return Object.entries(obj).reduce<Record<string, unknown>>((acc, [key, value]) => {
    const path = prefix + key;
    if (value && typeof value === 'object') {
      Object.assign(acc, flatten(value, path + '.'));
    } else {
      acc[path] = value;
    }
    return acc;
  }, {});
}

describe('Traducciones (src/i18n)', () => {
  const [es, en, pt] = ['es', 'en', 'pt'].map(lang => flatten(TRANSLATIONS[lang]));

  it('en.json tiene exactamente las mismas claves que es.json', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort());
  });

  it('pt.json tiene exactamente las mismas claves que es.json', () => {
    expect(Object.keys(pt).sort()).toEqual(Object.keys(es).sort());
  });

  it('no hay textos vacíos', () => {
    for (const [lang, flat] of Object.entries({ es, en, pt })) {
      const empty = Object.entries(flat).filter(([, value]) => typeof value !== 'string' || value.trim() === '');
      expect(empty.map(([key]) => `${lang}: ${key}`)).toEqual([]);
    }
  });
});
