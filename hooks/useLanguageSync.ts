"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguageStore } from "@/stores/languageStore";
import i18n from "@/utils/i18n";

export function useLanguageSync(urlLocale: string) {
  const { language, setLanguage } = useLanguageStore();
  const router = useRouter();
  const pathname = usePathname();
  
  // Add hydration state tracking
  const [isHydrated, setIsHydrated] = useState(false);

  // Track synchronization state
  const isInitialMount = useRef(true);
  const syncInProgress = useRef(false);
  const userInitiatedChange = useRef(false); // NEW: Track user-initiated changes
  const [lastUrlLocale, setLastUrlLocale] = useState(urlLocale);

  // Set hydration state after component mounts
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // On initial mount, URL has precedence
  useEffect(() => {
    if (isInitialMount.current && isHydrated) {
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
  }, [urlLocale, setLanguage, isHydrated]);

  // URL → Store: When URL changes after initial mount
  useEffect(() => {
    if (
      !isInitialMount.current &&
      !syncInProgress.current &&
      !userInitiatedChange.current && // NEW: Skip if user-initiated
      urlLocale !== lastUrlLocale &&
      isHydrated
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
          // Release lock after a small delay
          setTimeout(() => {
            syncInProgress.current = false;
          }, 10); // Reduced timeout
        }
      } else {
        setLastUrlLocale(urlLocale);
      }
    }
  }, [urlLocale, language, setLanguage, lastUrlLocale, isHydrated]);

  // Store → URL: When language store changes (for non-user-initiated changes)
  useEffect(() => {
    if (
      !isInitialMount.current &&
      !syncInProgress.current &&
      language &&
      language !== lastUrlLocale &&
      isHydrated
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
        }, 10);
      }
    }
  }, [language, pathname, router, lastUrlLocale, isHydrated]);

  // Public API for language changes - NOW WITH IMMEDIATE URL UPDATE
  const changeLanguage = (newLanguage: "en" | "vi") => {
    if (newLanguage !== language && isHydrated) {
      // Mark as user-initiated change
      userInitiatedChange.current = true;
      syncInProgress.current = true;
      
      try {
        // IMMEDIATE URL UPDATE - This happens first for instant feedback
        const segments = pathname.split("/");
        segments[1] = newLanguage;
        const newPath = segments.join("/");
        
        // Update URL immediately
        router.replace(newPath, { scroll: false });
        
        // Then update store and i18n synchronously
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
        setLastUrlLocale(newLanguage);

        if (process.env.NODE_ENV === "development") {
          console.log("User-initiated language change:", {
            from: language,
            to: newLanguage,
            newPath
          });
        }
      } finally {
        // Reset flags after a short delay
        setTimeout(() => {
          userInitiatedChange.current = false;
          syncInProgress.current = false;
        }, 50);
      }
    }
  };

  return { 
    currentLanguage: language || urlLocale, 
    changeLanguage, 
    isHydrated 
  };
}