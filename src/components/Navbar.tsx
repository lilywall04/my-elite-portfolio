import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const baseLink =
    "rounded-full px-4 py-2 text-sm font-semibold transition";

  const activeLink =
    "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm";

  const inactiveLink =
    "text-slate-700 hover:bg-black/5 hover:text-slate-900";

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
    <Link
    to="/"
    className="flex items-center gap-3 text-base font-extrabold tracking-tight sm:text-lg"
    >
    <img
        src="/Favicon.png"
        alt="Logo"
        className="h-7 w-7 rounded-md"
    />

    <span>Lily Wallace</span>

    <span className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-2 py-1 text-xs font-semibold text-white">
        Portfolio
    </span>
    </Link>


        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cats"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Cat 2048
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
