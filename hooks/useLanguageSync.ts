"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguageStore } from "@/stores/languageStore";
import i18n from "@/utils/i18n";

export function useLanguageSync(urlLocale: string) {
  const { language, setLanguage } = useLanguageStore();
  const router = useRouter();
  const pathname = usePathname();

  // Track synchronization state
  const isInitialMount = useRef(true);
  const syncInProgress = useRef(false);
  const [lastUrlLocale, setLastUrlLocale] = useState(urlLocale);

  // On initial mount, URL has precedence
  useEffect(() => {
    if (isInitialMount.current) {
      const validLocales = ["en", "vi"];
      const locale = validLocales.includes(urlLocale) ? urlLocale : "en";

      i18n.changeLanguage(locale);
      setLanguage(locale as "en" | "vi");

      // Save this URL locale to detect real changes
      setLastUrlLocale(urlLocale);

      // Mark initial mount as completed
      isInitialMount.current = false;

      if (process.env.NODE_ENV === "development") {
        console.log("Initial language set from URL:", { locale });
      }
    }
  }, [urlLocale, setLanguage]);

  // URL → Store: When URL changes after initial mount
  useEffect(() => {
    if (
      !isInitialMount.current &&
      !syncInProgress.current &&
      urlLocale !== lastUrlLocale
    ) {
      const validLocales = ["en", "vi"];
      const locale = validLocales.includes(urlLocale) ? urlLocale : "en";

      // Only update if really different
      if (locale !== language) {
        syncInProgress.current = true;

        try {
          i18n.changeLanguage(locale);
          setLanguage(locale as "en" | "vi");
          setLastUrlLocale(urlLocale);

          if (process.env.NODE_ENV === "development") {
            console.log("Language updated from URL change:", {
              from: language,
              to: locale,
            });
          }
        } finally {
          // Release lock after a small delay to ensure changes propagate
          setTimeout(() => {
            syncInProgress.current = false;
          }, 100);
        }
      } else {
        // Even if no change needed, update the lastUrlLocale
        setLastUrlLocale(urlLocale);
      }
    }
  }, [urlLocale, language, setLanguage, lastUrlLocale]);

  // Store → URL: When language store changes
  useEffect(() => {
    if (
      !isInitialMount.current &&
      !syncInProgress.current &&
      language &&
      language !== lastUrlLocale
    ) {
      syncInProgress.current = true;

      try {
        // Update URL without adding to history or scrolling
        const segments = pathname.split("/");
        segments[1] = language; // Replace locale segment
        const newPath = segments.join("/");

        if (process.env.NODE_ENV === "development") {
          console.log("Updating URL from language store:", {
            from: lastUrlLocale,
            to: language,
            newPath,
          });
        }

        router.replace(newPath, { scroll: false });
        setLastUrlLocale(language);
      } finally {
        // Release lock after a delay
        setTimeout(() => {
          syncInProgress.current = false;
        }, 100);
      }
    }
  }, [language, pathname, router, lastUrlLocale]);

  // Public API for language changes
  const changeLanguage = (newLanguage: "en" | "vi") => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
      // URL update happens via the effect

      if (process.env.NODE_ENV === "development") {
        console.log("Language change requested:", {
          from: language,
          to: newLanguage,
        });
      }
    }
  };

  return { currentLanguage: language || urlLocale, changeLanguage };
}
