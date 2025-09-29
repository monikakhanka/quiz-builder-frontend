import { useEffect, useState } from "react";
import { ZodType } from "zod";

export function useLocalStorage<T>(key: string, initial: T, schema?: ZodType<T>) {
  const [value, setValue] = useState<T>(initial);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === 0) {
          setValue(initial);
        } else {
          setValue(schema ? schema.parse(parsed) : parsed);
        }
      } else {
        setValue(initial);
      }
    } catch {
      localStorage.removeItem(key);
      setValue(initial);
    }
    setIsHydrated(true);
  }, [key, schema, initial]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isHydrated, key, value]);

  return [value, setValue] as const;
}
