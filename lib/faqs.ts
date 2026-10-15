import { faqSectionData } from "@/content/home";

/** FAQs from the database, or the built-in ones when the table is empty. */
export function faqsOrFallback<T extends { question: string; answer: string }>(faqs?: T[] | null) {
  return faqs && faqs.length > 0 ? faqs : faqSectionData.faqs;
}
