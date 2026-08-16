import type { IssueCardProps } from '@/components/layout/IssueCard';

const issueSeed: Omit<IssueCardProps, 'id'>[] = [
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
    repo: 'facebook/react',
    title: 'Document concurrent mode opt-in for third-party routers',
    description:
      'Third-party routers lack clear guidance on enabling concurrent features without breaking transitions.',
    tags: ['Good First Issue', 'Docs'],
    updated: '3 days ago',
    comments: 7,
  },
  {
    repo: 'vercel/next.js',
    title: 'Add middleware examples for multi-tenant routing',
    description:
      'Provide cookbook-style examples showing how to use middleware for subdomain-based tenant routing.',
    tags: ['Help Wanted', 'TypeScript', 'Docs'],
    updated: '4 days ago',
    comments: 19,
  },
  {
    repo: 'rust-lang/rust',
    title: 'Improve diagnostic for mismatched async trait bounds',
    description:
      'When an async trait method fails to satisfy Send bounds, the error message should point to the offending future.',
    tags: ['Good First Issue', 'Rust', 'Bug'],
    updated: '4 days ago',
    comments: 22,
  },
  {
    repo: 'denoland/deno',
    title: 'Support import maps in deno compile',
    description:
      'Import maps are silently ignored when using deno compile, leading to confusing module resolution failures.',
    tags: ['Help Wanted', 'TypeScript', 'Bug'],
    updated: '5 days ago',
    comments: 15,
  },
  {
    repo: 'vercel/turbo',
    title: 'Add JSON output format for turbo run --dry',
    description:
      'Allow CI scripts to parse dry-run output programmatically by adding a --output=json flag.',
    tags: ['Good First Issue', 'TypeScript'],
    updated: '5 days ago',
    comments: 4,
  },
  {
    repo: 'microsoft/TypeScript',
    title: 'Improve auto-import suggestions for re-exported types',
    description:
      'Auto-import sometimes suggests the internal module path instead of the public re-export barrel.',
    tags: ['Help Wanted', 'TypeScript', 'Bug'],
    updated: '6 days ago',
    comments: 33,
  },
];

export const issues: IssueCardProps[] = issueSeed.map((issue, index) => ({
  ...issue,
  id: `${issue.repo}-${issue.title}-${index}`,
}));
