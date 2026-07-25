export const contactContent = {
  page: {
    inquiry: {
      code: '// MSG',
      title: 'Wyślij zapytanie',
      kicker: 'Opisz swój projekt - odpowiem w ciągu 24 godzin',
    },
    contact: {
      code: '// 04',
      title: 'Kontakt',
      kicker: 'Otwórz kanał komunikacji - odpowiem szybko',
    },
  },
  form: {
    fields: {
      name: { label: 'Imię i nazwisko', placeholder: 'Jan Kowalski' },
      email: { label: 'Adres e-mail', placeholder: 'jan@example.com' },
      service: { label: 'Usługa' },
      topic: { label: 'Temat', placeholder: 'Opisz czego dotyczy zapytanie…' },
      message: {
        label: 'Wiadomość',
        placeholder: 'Opisz swój projekt lub pytanie…',
      },
    },
    submit: {
      idle: 'Wyślij wiadomość',
      pending: 'Wysyłanie…',
    },
    dropdown: {
      placeholder: '- wybierz usługę -',
      other: 'Inne',
    },
  },
  successCard: {
    code: '// MSG_SENT ✓',
    title: 'Wiadomość wysłana',
    body: 'Odezwę się tak szybko, jak to możliwe - zazwyczaj w ciągu 24 godzin.',
  },
  channels: {
    email: { label: 'Email', actionLabel: 'NAPISZ' },
    phone: {
      label: 'Telefon / WhatsApp',
      actionLabel: 'ZADZWOŃ',
      whatsappLabel: 'WHATSAPP',
    },
    copy: 'KOPIUJ',
    copied: '✓ SKOPIOWANO',
    location: {
      code: '// LOKALIZACJA',
      city: 'Kraków, Polska',
    },
  },
} as const;
