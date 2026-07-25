export const homeContent = {
  carousel: {
    code: '// 01',
    title: 'Co buduję',
    kicker: 'Wybrane usługi w transmisji na żywo',
    label: 'Wybrane usługi',
    controls: {
      prev: 'Poprzedni slajd',
      next: 'Następny slajd',
      pause: 'Wstrzymaj automatyczne przewijanie',
      play: 'Wznów automatyczne przewijanie',
    },
    slideOf: (i: number, total: number, label: string) =>
      `${i} z ${total}: ${label}`,
  },
  oferta: {
    code: '// 02',
    title: 'Pełna oferta',
    kicker: 'Cztery moduły',
  },
  callout: {
    imageAlt: 'PC z RGB',
    heading: { before: 'Nie kupuj gotowców', em: 'PC' },
    body1:
      'Gotowe zestawy komputerowe to często strata pieniędzy. Sklepy montują w nich źle dobrane komponenty, a bardzo często wykorzystują części, które zalegają na magazynie. Efekt? Słabsza wydajność i brak sensownej rozbudowy.',
    body2:
      'Za cenę gotowca złożę komputer znacznie wydajniejszy, idealnie dopasowany do Twoich potrzeb i budżetu. Napisz - doradzę i złożę lepszy zestaw.',
    cta: 'Napisz do mnie',
  },
} as const;
