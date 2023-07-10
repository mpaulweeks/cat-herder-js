import { parseUrl } from '../lib';
import { useMemo } from "react";
import { ErrorsOverlay } from "./ErrorsOverlay";
import { ErrorsProvider } from "../hooks/ErrorsProvider";
import { AppRouter } from "./AppRouter";

export function App() {
  const initialEventLookup = useMemo(() => parseUrl(window.location.href), []);

  return (
    <ErrorsProvider>
      <AppRouter initialEventLookup={initialEventLookup} />
      <ErrorsOverlay />
    </ErrorsProvider>
  );
}
