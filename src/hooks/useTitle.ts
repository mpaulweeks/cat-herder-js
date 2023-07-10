import { useEffect } from "react";

export function useTitle(title?: string) {
  useEffect(() => {
    const newTitle = title ? ['CH', title].join(' | ') : 'Cat Herder';
    if (document.title != newTitle) {
      document.title = newTitle;
    }
  }, [title]);
}
