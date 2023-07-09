import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

// inspired by context + reducer but simplified
// https://react.dev/learn/scaling-up-with-reducer-and-context

type ErrorMessage = string;
type ErrorNotification = {
  created: number;
  message: ErrorMessage;
}
type ErrorReporter = {
  reportError(err: ErrorMessage): void;
}
type ErrorsApi = ErrorReporter & {
  errors: ErrorNotification[];
  remove(err: ErrorNotification): void;
}

const ErrorReportContext = createContext<ErrorReporter>({
  reportError: console.log,
});
const ErrorsApiContext = createContext<ErrorsApi>({
  reportError: console.log,
  errors: [],
  remove: console.log,
});

export function useErrorReporter() {
  return useContext(ErrorReportContext);
}
export function useErrorsApi() {
  return useContext(ErrorsApiContext);
}

export function ErrorsProvider(props: React.PropsWithChildren) {
  const [errors, setErrors] = useState<ErrorNotification[]>([]);

  const reportError = useCallback((err: ErrorMessage) => {
    setErrors(old => old.concat({
      created: Date.now(),
      message: err,
    }));
  }, [setErrors]);
  const remove = useCallback((err: ErrorNotification) => {
    setErrors(old => old.filter(elm => elm.created != err.created));
  }, [setErrors]);

  const reporter = useMemo<ErrorReporter>(() => ({
    reportError,
  }), [reportError]);
  const api: ErrorsApi = { reportError, errors, remove };

  return (
    <ErrorsApiContext.Provider value={api}>
      <ErrorReportContext.Provider value={reporter}>
        {props.children}
      </ErrorReportContext.Provider>
    </ErrorsApiContext.Provider>
  );
}
