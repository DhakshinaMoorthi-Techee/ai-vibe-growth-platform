import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700 tracking-tight">
          AI Vibe <span className="text-blue-500">Growth Platform</span>
        </h1>

        <nav className="flex gap-6 text-gray-600 text-sm md:text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition-all duration-200 ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent hover:text-blue-500"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/prompt"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition-all duration-200 ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent hover:text-blue-500"
              }`
            }
          >
            Prompt Playground
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
