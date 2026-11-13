import { useEffect, useRef, useState } from "react";

const TICK_MS = 100;

// Numărătoare inversă pentru `seconds` secunde. Rulează doar cât timp `active`
// este true; la expirare apelează `onExpire` o singură dată.
export function useTimer(seconds, { active, onExpire }) {
  const total = seconds * 1000;
  const [remaining, setRemaining] = useState(total);
  const remainingRef = useRef(total);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!active || total === 0 || remainingRef.current === 0) return undefined;
    const end = Date.now() + remainingRef.current;
    const id = setInterval(() => {
      const left = Math.max(0, end - Date.now());
      remainingRef.current = left;
      setRemaining(left);
      if (left === 0) {
        clearInterval(id);
        onExpireRef.current?.();
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [active, total]);

  return {
    remaining,
    secondsLeft: Math.ceil(remaining / 1000),
    progress: total === 0 ? 1 : remaining / total,
  };
}
