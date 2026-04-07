import { AppLayout } from '../components/AppLayout';
import { Header } from '../components/Header.tsx';

export function LandingPage({
  error,
  searchQuery,
}: {
  error?: string;
  searchQuery?: string;
}) {
  return (
    <AppLayout title="Admin Dashboard">
      <div class="min-h-screen bg-surface-50 text-surface-900">
        <Header userName="First Name Last Name" />

        <main class="mx-auto w-full max-w-6xl px-4 py-6">
          <section class="grid gap-4 border-b border-surface-200 pb-6 md:grid-cols-[280px_1fr] md:items-center">
            <div>
              <img
                src="/assets/images/project-init.png"
                alt="Project Init"
                class="h-auto w-full max-w-65"
              />
            </div>

            <div>
              <form
                method="get"
                action="/find-user"
                class="flex items-center gap-2"
              >
                <input
                  type="search"
                  name="q"
                  value={searchQuery ?? ''}
                  placeholder="Find User..."
                  class="h-12 w-full rounded-md border border-surface-200 bg-white px-4 text-lg text-surface-700 ring-brand-300 outline-none placeholder:text-surface-700/50 focus:ring-2"
                />
                <button
                  type="submit"
                  class="h-12 cursor-pointer rounded-md bg-brand-500 px-7 text-lg font-semibold text-white hover:bg-brand-400"
                >
                  Find
                </button>
              </form>
              {error && <p class="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </section>

          <section class="mt-12 grid gap-6 md:grid-cols-2">
            <article class="rounded-card border border-surface-200 bg-white shadow-card">
              <div class="border-b border-surface-200 px-8 py-6">
                <h2 class="text-3xl font-semibold text-surface-700">
                  User Management
                </h2>
              </div>
              <div class="px-8 py-6">
                <ul class="space-y-3 text-xl text-surface-700">
                  <li>• Manage Accounts & Permissions</li>
                  <li>• View User Activity Logs</li>
                  <li>• Invite New Users</li>
                </ul>
                <div class="mt-8 flex justify-end" id="main-content">
                  <a
                    hx-get="/users"
                    hx-target="#main-content"
                    hx-push-url="true"
                    class="inline-flex rounded-md bg-brand-500 px-6 py-3 text-xl font-semibold text-white hover:bg-brand-400"
                  >
                    Manage Users
                  </a>
                </div>
              </div>
            </article>

            <article class="rounded-card border border-surface-200 bg-white shadow-card">
              <div class="border-b border-surface-200 px-8 py-6">
                <h2 class="text-3xl font-semibold text-surface-700">
                  Analytics & Reports
                </h2>
              </div>
              <div class="px-8 py-6">
                <ul class="space-y-3 text-xl text-surface-700">
                  <li>• View Usage Statistics</li>
                  <li>• Generate Reports</li>
                  <li>• Track Performance</li>
                </ul>
                <div class="mt-8 flex justify-end">
                  <a
                    href="/analytics"
                    class="inline-flex rounded-md bg-brand-500 px-6 py-3 text-xl font-semibold text-white hover:bg-brand-400"
                  >
                    View Analytics
                  </a>
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>
    </AppLayout>
  );
}
