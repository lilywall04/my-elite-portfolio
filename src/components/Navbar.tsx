import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          to="/"
          className="text-base font-extrabold tracking-tight sm:text-lg"
        >
          Lily Wallace
          <span className="ml-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-2 py-1 text-xs font-semibold text-white">
            Portfolio
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-black/5 hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            to="/cats"
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
          >
            Cat 2048
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
