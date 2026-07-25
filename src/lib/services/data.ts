import PcImage1 from '@public/pc-1.webp';
import PcImage2 from '@public/pc-2.webp';
import WebImage1 from '@public/web-1.jpg';
import HelpImage1 from '@public/help-1.webp';
import type { Service } from './types';

export const services: Service[] = [
  {
    slug: 'doradztwo-sprzetowe',
    title: 'Doradztwo w doborze sprzętu',
    shortDescription: 'Skład komponentów dopasowany do Ciebie',
    description:
      'Pomagam wybrać komponenty idealnie dopasowane do Twoich potrzeb i budżetu. Nie przepłacasz za zbędną moc ani nie kupujesz sprzętu poniżej swoich wymagań.',
    longDescription:
      'Każdy komputer powinien być dopasowany do konkretnego użytkownika - nie odwrotnie. Zaczynamy od krótkiej rozmowy o tym, do czego sprzęt ma służyć (gry, praca, montaż wideo, programowanie, biuro), jakim budżetem dysponujesz i jakie masz preferencje. Następnie dobieram komponenty tak, aby każda złotówka pracowała na Twoją wydajność, a sprzęt miał przestrzeń na sensowną rozbudowę za 2-3 lata.',
    features: [
      'Analiza potrzeb i budżetu',
      'Dobór komponentów PC lub laptopa',
      'Porównanie ofert i sklepów',
      'Konsultacja',
    ],
    process: [
      [
        '01',
        'Rozmowa',
        'Krótki wywiad o Twoich potrzebach, oprogramowaniu, budżecie i preferencjach.',
      ],
      [
        '02',
        'Propozycja',
        'Otrzymujesz 1-3 zestawienia komponentów z uzasadnieniem każdego wyboru.',
      ],
      [
        '03',
        'Korekta',
        'Dopinamy listę razem - wymieniamy części, dostosowujemy budżet, wybieramy estetykę.',
      ],
      [
        '04',
        'Lista zakupowa',
        'Przygotowuję gotową listę z linkami do najtańszych ofert w zaufanych sklepach.',
      ],
    ],
    deliverables: [
      'Dokument z konfiguracją + uzasadnieniem',
      'Linki do sklepów z najniższymi cenami',
      'Sugestie alternatyw na wypadek braku magazynowego',
      'Plan rozbudowy na 2-3 lata',
    ],
    pricingNote:
      'Jeśli zdecydujesz się na składanie komputera u mnie - nie ponosisz kosztu konsultacji.',
    timeNote: '2-4 dni',
    designation: 'PROC-01',
    glyph: '⌬',
    image: PcImage1,
    imageAlt: 'Zestaw komputerowy',
  },
  {
    slug: 'skladanie-komputerow',
    title: 'Składanie komputerów',
    seoDescription:
      'Składanie komputerów na zamówienie w Krakowie - montaż, konfiguracja systemu, testy stabilności. Komputer gotowy do pracy bez stresu i bez błędów.',
    shortDescription:
      'Składam komputery na gotowo i ogarniam całą konfigurację',
    description:
      'Składam zestawy komputerowe od podstaw - od doboru komponentów, przez montaż, po pełną konfigurację systemu i oprogramowania. Efekt: gotowy do pracy sprzęt bez stresu.',
    longDescription:
      'Dostajesz komputer „pod klucz" - w pełni zmontowany, skonfigurowany i przetestowany. Dbam o staranne ułożenie kabli, stabilną termikę, cichą pracę i poprawnie ustawione profile XMP/EXPO. Po montażu spędzam kilka godzin testując wydajność (CPU, GPU, RAM, dyski) i stabilność pod obciążeniem, żebyś nie odkrył problemu po dwóch tygodniach.',
    features: [
      'Montaż komponentów',
      'Instalacja systemu i sterowników',
      'Konfiguracja BIOS/UEFI',
      'Testy wydajności i stabilności',
    ],
    process: [
      [
        '01',
        'Odbiór części',
        'Odbieram od Ciebie komponenty lub kupuję je sam, jeśli się tak umówimy.',
      ],
      [
        '02',
        'Montaż',
        'Składam komputer dbając o cable management, termikę i estetykę.',
      ],
      [
        '03',
        'Konfiguracja',
        'BIOS, profile pamięci, instalacja Windows / Linuxa, sterowniki, podstawowe oprogramowanie.',
      ],
      [
        '04',
        'Testy',
        'Cinebench, FurMark, Prime95, MemTest - kilkugodzinny stress-test pod kontrolą temperatur.',
      ],
      [
        '05',
        'Dostawa',
        'Przekazuję sprzęt z raportem testów i krótkim instruktażem obsługi.',
      ],
    ],
    deliverables: [
      'Złożony i przetestowany komputer',
      'Czysta instalacja systemu z aktualizacjami',
      'Raport z testów wydajności i temperatur',
      'Krótka instrukcja co dalej (aktualizacje, backupy, kopie)',
    ],
    pricingNote: 'Koszt zależy od złożoności - wycena indywidualna.',
    timeNote: '2-5 dni roboczych',
    designation: 'BUILD-02',
    glyph: '◈',
    image: PcImage2,
    imageAlt: 'Zestaw komputerowy',
  },
  {
    slug: 'tworzenie-stron-internetowych',
    title: 'Tworzenie stron internetowych',
    seoDescription:
      'Tworzenie nowoczesnych stron internetowych w Krakowie - szybkie, responsywne, zoptymalizowane pod kątem SEO i Core Web Vitals. Sprawdź ofertę.',
    shortDescription: 'Strony, które są szybkie, czytelne i skuteczne',
    description:
      'Tworzę nowoczesne strony internetowe zoptymalizowane pod kątem szybkości, SEO i użyteczności. Każda strona jest responsywna i dostosowana do urządzeń mobilnych.',
    longDescription:
      'Buduję strony, które naprawdę działają - szybkie, czytelne, dobrze zaindeksowane przez Google i wygodne na telefonie. Pracuję w nowoczesnym stacku (Next.js, React, TypeScript, TailwindCSS) i traktuję wydajność jako wymóg, nie miły dodatek. Każda strona przechodzi audyt Lighthouse, ma dopiętą podstawową analitykę i jest gotowa do rozwoju.',
    features: [
      'Responsywny design (mobile-first)',
      'Optymalizacja SEO',
      'Wysoka wydajność (Core Web Vitals)',
      'Nowoczesne i intuicyjne UI/UX',
    ],
    process: [
      [
        '01',
        'Brief',
        'Spisujemy cele strony, grupę docelową, treści i preferencje wizualne.',
      ],
      [
        '02',
        'Projekt',
        'Przygotowuję makietę i dwie propozycje wizualne - wybierasz kierunek.',
      ],
      [
        '03',
        'Implementacja',
        'Koduję stronę: komponenty, animacje, nowoczesny interfejs i dopracowany UX.',
      ],
      [
        '04',
        'Testy + SEO',
        'Lighthouse, dostępność, meta tagi, sitemap, Open Graph, sitemap.xml, robots.txt.',
      ],
      [
        '05',
        'Wdrożenie',
        'Konfiguracja domeny, hostingu (Vercel/Netlify), analityki i monitoringu.',
      ],
    ],
    deliverables: [
      'Gotowa strona pod własną domeną',
      'Pełny kod źródłowy w repozytorium',
      'Optymalizacja szybkości i SEO',
      'Dokumentacja + 30 dni wsparcia po wdrożeniu',
    ],
    pricingNote: 'Wycena indywidualna.',
    timeNote: '2-6 tygodni',
    designation: 'WEB-03',
    glyph: '◐',
    image: WebImage1,
    imageAlt: 'Ekran z programowania strony internetowej',
  },
  {
    slug: 'pomoc-techniczna',
    title: 'Pomoc techniczna',
    seoTitle: 'Pomoc techniczna PC',
    shortDescription:
      'Gdy komputer sprawia problemy, zajmuję się tym za Ciebie',
    description:
      'Diagnozuję i rozwiązuję problemy z komputerem - od wirusów, przez awarie systemu, po optymalizację i konfigurację sprzętu. Działam szybko i skutecznie.',
    longDescription:
      'Gdy komputer działa wolno, pojawiają się błędy albo system nie działa tak jak powinien - pomagam rozwiązać problemy związane z oprogramowaniem. Zajmuję się konfiguracją systemu, instalacją programów, optymalizacją działania oraz usuwaniem problemów systemowych. Zawsze tłumaczę co powoduje problem i jakie rozwiązanie będzie najlepsze.',
    features: [
      'Diagnoza usterek oprogramowania',
      'Usuwanie wirusów i złośliwego oprogramowania',
      'Reinstalacja i konfiguracja systemu',
      'Optymalizacja działania komputera',
    ],
    process: [
      [
        '01',
        'Zgłoszenie',
        'Opisujesz problem - telefonicznie, mailem lub przez WhatsApp.',
      ],
      ['02', 'Diagnoza', 'Sprawdzam system, identyfikuję źródło problemu.'],
      ['03', 'Naprawa', 'Naprawiam, czyszczę, optymalizuję.'],
      [
        '04',
        'Raport',
        'Dostajesz krótki raport z tego, co zostało zrobione i co warto zmienić w nawykach.',
      ],
    ],
    deliverables: [
      'Działający, czysty system',
      'Backup ważnych plików (jeśli ryzyko ich utraty)',
      'Raport z naprawy + rekomendacje',
      'Krótki przewodnik jak nie wpaść w to ponownie',
    ],
    pricingNote:
      'Diagnozuję problem, wyjaśniam jego przyczynę i proponuję najlepsze rozwiązanie. Większość zleceń realizuję szybko i bez zbędnego przeciągania pracy.',
    timeNote: 'Często tego samego dnia',
    designation: 'AID-04',
    glyph: '✦',
    image: HelpImage1,
    imageAlt: 'Sfrustrowana osoba z problemem na laptopie',
  },
];
