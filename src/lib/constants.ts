export const SUPPORTED_LANGUAGES = ['TypeScript', 'Rust', 'JavaScript', 'Python'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
