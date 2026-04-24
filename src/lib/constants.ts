/**
 * Shared cache / ISR constants used when fetching from the Spring Boot backend.
 */
export const ISR_REVALIDATE_SECONDS = 3600; // 1 hour

export const SUPPORTED_LANGUAGES = ['TypeScript', 'Rust', 'JavaScript', 'Python'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
