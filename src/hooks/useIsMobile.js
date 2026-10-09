import { useCallback, useSyncExternalStore } from 'react';

// Re-renders when the window crosses the breakpoint (unlike reading window.innerWidth once)
const useIsMobile = (breakpoint = 768) => {
  const query = `(max-width: ${breakpoint}px)`;

  const subscribe = useCallback((onChange) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
};

export default useIsMobile;
