import { Button, Stack } from "@/ui-stub";
import { CopyLinkButton } from "@/components/CopyLinkButton";

interface AppHeaderProps {
  onCreateProject: () => void;
}

export function AppHeader({ onCreateProject }: AppHeaderProps) {
  return (
    <header className="z-30 shrink-0 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 px-3 sm:h-14 sm:gap-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 sm:h-8 sm:w-8">
            <svg className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </div>
          <h1 className="text-sm font-bold text-slate-900 tracking-tight sm:text-base">
            Project Hub
          </h1>
        </div>
        <Stack direction="row" className="!items-center !gap-2">
          <CopyLinkButton />
          <Button
            onClick={onCreateProject}
            className="!inline-flex !items-center !gap-1.5 !rounded-lg bg-indigo-600 !px-3 !py-1.5 !text-xs !font-medium !text-white !shadow-sm !border-indigo-600 hover:!bg-indigo-700 sm:!px-3.5 sm:!py-2"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="hidden sm:inline">New project</span>
            <span className="sm:hidden">New</span>
          </Button>
        </Stack>
      </div>
    </header>
  );
}
