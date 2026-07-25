import { useEffect, useState } from 'react';

export function useCountdown(targetTimestamp: number | null | undefined) {
  const [remainingMs, setRemainingMs] = useState(() => Math.max(0, (targetTimestamp ?? 0) - Date.now()));

  useEffect(() => {
    if (!targetTimestamp) {
      setRemainingMs(0);
      return;
    }
    const tick = () => setRemainingMs(Math.max(0, targetTimestamp - Date.now()));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [targetTimestamp]);

  const totalSeconds = Math.ceil(remainingMs / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return { remainingMs, label: `${minutes}:${seconds}`, expired: remainingMs <= 0 };
}
