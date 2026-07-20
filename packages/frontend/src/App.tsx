import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-parchment flex flex-col">
      <header className="border-b border-brass/30 px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl tracking-wide text-brass-light"
        >
          WHERE'S WALDO
        </Link>
        <span className="text-parchment/60 text-sm align-top">
          — Find characters
        </span>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
