import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      setValue(JSON.parse(stored));
    }

    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, hydrated]);

  return [value, setValue] as const;
}
