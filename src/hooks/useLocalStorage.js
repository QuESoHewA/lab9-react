import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "@utils/storage";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =>
    readStorage(key, typeof initialValue === "function" ? initialValue() : initialValue)
  );

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  const update = useCallback((next) => setValue(next), []);

  return [value, update];
}
