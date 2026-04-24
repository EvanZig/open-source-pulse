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

export default async function HomePage() {
  // ---------------------------------------------------------------------------
  // TODO: Server-side ISR fetch for the initial dashboard payload.
  //
  // Example (to be implemented in the next step):
  //
  //   const issues = await api.get<Paginated<Issue>>('/issues/explore', {
  //     next: { revalidate: ISR_REVALIDATE_SECONDS, tags: ['issues'] },
  //   });
  //
  // The result will be passed to a client `<IssueExplorer />` component that
  // hydrates TanStack Query for subsequent interactive filtering/search.
  // ---------------------------------------------------------------------------

  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Open Source Pulse</h1>
        <p className="text-muted-foreground">
          Scaffold ready. Dashboard UI will be added in the next step.
        </p>
      </header>
    </main>
  );
}
