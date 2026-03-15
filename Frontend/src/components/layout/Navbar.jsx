import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const getLanguageLabel = () => {
    switch (i18n.language) {
      case "hi":
        return "HI";
      case "mr":
        return "MR";
      default:
        return "EN";
    }
  };

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition ${
      isActive
        ? "border-green-600 text-green-700"
        : "border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition ${
      isActive
        ? "border-green-500 text-green-700 bg-green-50"
        : "border-transparent text-gray-600 hover:border-green-500 hover:bg-gray-50 hover:text-gray-800"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-green-100 flex items-center justify-center">
              <span className="text-green-700 text-lg">🌿</span>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{t("app_name")}</p>
              <p className="text-xs text-gray-500 -mt-0.5">
                {t("navbar.tagline")}
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <NavLink to="/" className={navLinkClass}>
                {t("nav.home")}
              </NavLink>
              <NavLink to="/markets" className={navLinkClass}>
                {t("nav.markets")}
              </NavLink>
              <NavLink to="/forecast" className={navLinkClass}>
                {t("nav.forecast")}
              </NavLink>
              <NavLink to="/crops" className={navLinkClass}>
                {t("nav.crops")}
              </NavLink>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageMenuOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={languageMenuOpen}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <span>{getLanguageLabel()}</span>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage("hi")}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => changeLanguage("mr")}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    मराठी
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="space-y-1 px-4 py-4">
            <NavLink
              to="/"
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.home")}
            </NavLink>
            <NavLink
              to="/markets"
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.markets")}
            </NavLink>
            <NavLink
              to="/forecast"
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.forecast")}
            </NavLink>
            <NavLink
              to="/crops"
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.crops")}
            </NavLink>
          </div>

          <div className="border-t border-gray-100 px-4 py-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {t("common.language")}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => changeLanguage("en")}
                className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("hi")}
                className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                HI
              </button>
              <button
                onClick={() => changeLanguage("mr")}
                className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                MR
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
