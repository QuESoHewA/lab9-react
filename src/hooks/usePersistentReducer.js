import { useEffect, useReducer } from "react";
import { readStorage, removeStorage, writeStorage } from "@utils/storage";

// useReducer a cărui stare se salvează în localStorage la fiecare modificare
// și se restaurează la reîncărcarea paginii. `shouldPersist` decide dacă starea
// curentă merită păstrată; altfel cheia este ștearsă.
export function usePersistentReducer(reducer, key, initialState, shouldPersist) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const saved = readStorage(key, null);
    return saved && shouldPersist(saved) ? saved : initial;
  });

  useEffect(() => {
    if (shouldPersist(state)) writeStorage(key, state);
    else removeStorage(key);
  }, [key, state, shouldPersist]);

  return [state, dispatch];
}
