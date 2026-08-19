import { useEffect } from 'react';

import { useUIStore } from '@/store/uiStore';

const READABLE_CLASS = 'font-readable';

export function ReadableFontSync() {
  const useReadableFont = useUIStore((s) => s.settings.useReadableFont);

  useEffect(() => {
    document.body.classList.toggle(READABLE_CLASS, useReadableFont);
  }, [useReadableFont]);

  return null;
}
