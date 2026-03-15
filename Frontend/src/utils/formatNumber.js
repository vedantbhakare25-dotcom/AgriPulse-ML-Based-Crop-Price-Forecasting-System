export function formatNumber(value, language = "en") {
  const localeMap = {
    en: "en-IN",
    hi: "hi-IN",
    mr: "mr-IN",
  };

  const locale = localeMap[language] || "en-IN";

  return new Intl.NumberFormat(locale).format(value);
}

export function formatCurrency(value, language = "en") {
  const localeMap = {
    en: "en-IN",
    hi: "hi-IN",
    mr: "mr-IN",
  };

  const locale = localeMap[language] || "en-IN";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
