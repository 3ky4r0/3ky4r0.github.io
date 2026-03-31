import { useState, useEffect } from 'react';

/**
 * Custom Hook: useTotp
 * Manages TOTP codes using a Web Worker.
 */
export const useTotp = (keys) => {
  const [totpCodes, setTotpCodes] = useState({ key1: '------', key2: '------', key3: '------' });

  useEffect(() => {
    // Ensure Web Worker exists
    const worker = new Worker(new URL('../totpWorker.js', import.meta.url));

    worker.onmessage = (e) => {
      setTotpCodes(e.data.codes);
    };

    const update = () => {
      worker.postMessage({ keys });
    };

    update();
    const interval = setInterval(update, 1000);

    return () => {
      clearInterval(interval);
      worker.terminate();
    };
  }, [keys]);

  return totpCodes;
};
