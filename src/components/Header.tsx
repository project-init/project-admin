export function Header({ userName }: { userName: string }) {
  return (
    <header class="border-b border-surface-200 bg-white">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <nav aria-label="Primary navigation">
          <ul class="text-3 flex items-center gap-6 font-medium text-surface-700">
            <li>
              <a
                class="font-semibold text-surface-900 hover:text-brand-600"
                href="/home"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a class="hover:text-brand-600" href="/users">
                Users
              </a>
            </li>
            <li>
              <a class="hover:text-brand-600" href="/analytics">
                Analytics
              </a>
            </li>
          </ul>
        </nav>

        <details class="group relative">
          <summary class="flex cursor-pointer list-none items-center gap-2 rounded-md px-3 py-2 font-semibold text-surface-900 hover:bg-surface-100">
            <span safe>{userName}</span>
            <span class="text-xs text-surface-700">▾</span>
          </summary>
          <div class="invisible absolute right-0 z-10 mt-2 w-48 rounded-lg border border-surface-200 bg-white p-2 opacity-0 shadow-card transition group-open:visible group-open:opacity-100">
            <div
              class="rounded-md px-3 py-2 text-sm font-medium text-surface-700"
              safe
            >
              {userName}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
