export function LoadingState() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
          role="status"
          aria-label="Loading projects"
        >
          <div className="flex items-start justify-between">
            <div className="h-4 w-2/5 rounded-md bg-slate-200" />
            <div className="h-4 w-10 rounded-md bg-slate-100" />
          </div>
          <div className="mt-2.5 h-3 w-4/5 rounded bg-slate-100" />
          <div className="mt-3 flex items-center gap-2">
            <div className="h-5 w-16 rounded-full bg-slate-100" />
            <div className="h-3 w-px bg-slate-100" />
            <div className="h-4 w-10 rounded-md bg-slate-100" />
            <div className="h-4 w-10 rounded-md bg-slate-100" />
            <div className="ml-auto h-3 w-24 rounded bg-slate-100" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading projects…</span>
    </div>
  );
}
