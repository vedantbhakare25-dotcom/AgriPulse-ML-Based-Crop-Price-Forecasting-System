import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
function Navbar() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageMenuOpen(false);
    setMobileMenuOpen(false); // also close mobile menu when selecting language on mobile
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-green-700">
                {t("app_name")}
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? "border-green-500 text-green-700"
                      : "border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700"
                  }`
                }
              >
                {t("nav.home")}
              </NavLink>
              <NavLink
                to="/markets"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? "border-green-500 text-green-700"
                      : "border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700"
                  }`
                }
              >
                {t("nav.markets")}
              </NavLink>
              <NavLink
                to="/forecast"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? "border-green-500 text-green-700"
                      : "border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700"
                  }`
                }
              >
                {t("nav.forecast")}
              </NavLink>
              <NavLink
                to="/crops"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? "border-green-500 text-green-700"
                      : "border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700"
                  }`
                }
              >
                {t("nav.crops")}
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={languageMenuOpen}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="sr-only">Open language menu</span>
                <svg
                  className="h-6 w-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {languageMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="language-menu"
                  >
                    <button
                      onClick={() => changeLanguage("en")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage("hi")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      हिन्दी
                    </button>
                    <button
                      onClick={() => changeLanguage("mr")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      मराठी
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on mobileMenuOpen state. */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-green-500 text-base font-medium text-green-700 bg-green-50"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/markets"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:border-green-500 hover:bg-gray-50 hover:text-gray-800"
            >
              {t("nav.markets")}
            </Link>
            <Link
              to="/forecast"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:border-green-500 hover:bg-gray-50 hover:text-gray-800"
            >
              {t("nav.forecast")}
            </Link>
            <Link
              to="/crops"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:border-green-500 hover:bg-gray-50 hover:text-gray-800"
            >
              {t("nav.crops")}
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              <button
                onClick={() => changeLanguage("en")}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("hi")}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
              >
                हिन्दी
              </button>
              <button
                onClick={() => changeLanguage("mr")}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
