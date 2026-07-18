import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

export const AcceptedLanguages = ["en", "fr"] as const;
export type AcceptedLanguageType = (typeof AcceptedLanguages)[number];

interface LanguageContextType {
  locale: AcceptedLanguageType;
  setLocale: (lang: AcceptedLanguageType) => void;
}
const LanguageContext = React.createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const LanguageProvider = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const [locale, _setLocale] = React.useState<AcceptedLanguageType>("en");
  const router = useRouter();

  const setLocale = (lang: AcceptedLanguageType) => {
    if (!AcceptedLanguages.includes(lang)) {
      toast.error(`Language ${lang} is not supported`);
      return;
    }
    _setLocale(lang);
    document.cookie = `NEXT_LOCALE=${lang}; max-age=31536000;`;
    router.refresh();
  };

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1] as AcceptedLanguageType | undefined;

    if (cookieLocale) _setLocale(cookieLocale);
    else {
      const browserLocale = navigator.language.slice(
        0,
        2,
      ) as AcceptedLanguageType;
      _setLocale(browserLocale);
      document.cookie = `NEXT_LOCALE=${browserLocale}; max-age=31536000;`;
      router.refresh();
    }
  }, [router]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
