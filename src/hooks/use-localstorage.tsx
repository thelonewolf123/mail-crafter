import { EmailPreferenceData } from "@/app/(app)/dashboard/types";
import { OnboardingTypes } from "@/app/(app)/onboarding/page";
import { useState, useEffect } from "react";

function useLocalStorage<T extends object | string | number | boolean>(
  key: string,
  initialValue: T
) {
  // Initialize from localStorage synchronously
  const getInitial = () => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  };
  const [storedValue, setStoredValue] = useState<T>(getInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error writing localStorage:", error);
    }
  };

  const removeValue = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error removing localStorage:", error);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  return [storedValue, setValue, removeValue] as const;
}

export default useLocalStorage;

export type User = {
  name: string;
  try: number;
  emailPreference?: EmailPreferenceData;
  onboarding?: OnboardingTypes;
};
