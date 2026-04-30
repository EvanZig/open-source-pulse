import { type IssueCardProps } from '@/components/layout/IssueCard';
import { HomeLayout } from '@/components/layout/HomeLayout';

/**
 * Opt this route into ISR at the segment level (1 hour).
 *
 * Must be a statically analyzable literal per Next.js route segment rules,
 * so we cannot reference `ISR_REVALIDATE_SECONDS` here. Keep this value in
 * sync with `src/lib/constants.ts` if it changes.
 *
 * Individual `fetch()` calls can still override via `{ next: { revalidate } }`.
 */
export const revalidate = 3600;

const issues: IssueCardProps[] = [
  {
    repo: 'vercel/next.js',
    title: 'Fix hydration error when using Suspense boundaries in App Router',
    description:
      'When implementing nested suspense boundaries, client-side navigation can mis-hydrate on slow networks.',
    tags: ['Good First Issue', 'TypeScript', 'Bug'],
    updated: '2 hours ago',
    comments: 14,
  },
  {
    repo: 'facebook/react',
    title: 'Improve error message for missing keys in list renders',
    description:
      'The current warning for missing keys in iterators is sometimes misleading for custom renderers.',
    tags: ['Help Wanted', 'Docs'],
    updated: '5 hours ago',
    comments: 3,
  },
  {
    repo: 'rust-lang/rust',
    title: 'Implement lint for redundant lifetime annotations',
    description:
      'Add a clippy rule to detect explicit lifetimes that can be elided without losing clarity.',
    tags: ['Help Wanted', 'Rust'],
    updated: '1 day ago',
    comments: 28,
  },
  {
    repo: 'vercel/turbo',
    title: 'Improve cache summary output formatting',
    description:
      'Surface cache hit summaries grouped by pipeline to make the report easier to scan.',
    tags: ['Good First Issue', 'TypeScript'],
    updated: '1 day ago',
    comments: 9,
  },
  {
    repo: 'denoland/deno',
    title: 'Add onboarding docs for task runner flags',
    description:
      'Write docs clarifying the differences between permission flags for the new task runner.',
    tags: ['Help Wanted', 'Docs'],
    updated: '2 days ago',
    comments: 6,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Validate readonly tuple inference in mapped types',
    description:
      'Add coverage to ensure readonly tuples preserve literal inference across mapped helpers.',
    tags: ['Help Wanted', 'TypeScript'],
    updated: '3 days ago',
    comments: 11,
  },
];

export default async function HomePage() {
  return <HomeLayout issues={issues} />;
}
