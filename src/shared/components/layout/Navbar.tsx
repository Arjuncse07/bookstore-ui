import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

const navLinks = [
  { to: "/", label: "Products" },
  { to: "/orders", label: "Orders" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              BookStore
            </Link>
            <div className="hidden items-center gap-1 sm:flex">
              {navLinks.map((link) => {
                const isActive =
                  link.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors
                      ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Hi, <span className="font-medium text-gray-900">{user?.username}</span>
            </span>
            <button
              onClick={logout}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
