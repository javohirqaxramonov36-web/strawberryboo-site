/** Owner-maintained static configuration. Keep links and event fields empty until confirmed. */
export const communityConfig = {
  telegramUrl: 'https://t.me/progression_go',
  feedbackTelegramUrl: '', // set only after confirming the recipient/channel accepts feedback
  webinar: null as null | { title: string; start: string; end: string; url?: string; description?: string },
  podcast: null as null | { title: string; audioUrl: string; transcriptUrl?: string },
};
