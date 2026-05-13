"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") {
      return;
    }

    const registerWorker = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js");
      } catch {
        // The app still works without offline caching.
      }
    };

    void registerWorker();
  }, []);

  return null;
}
