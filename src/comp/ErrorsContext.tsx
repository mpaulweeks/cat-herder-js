import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react";

// inspired by context + reducer but simplified
// https://react.dev/learn/scaling-up-with-reducer-and-context

export type ErrorMessage = string;
export type ErrorNotification = {
  created: number;
  message: ErrorMessage;
}
export type ErrorReporter = {
  reportError(err: ErrorMessage): void;
}
export type ErrorsApi = ErrorReporter & {
  errors: ErrorNotification[];
  remove(err: ErrorNotification): void;
}

export const ErrorReportContext = createContext<ErrorReporter>({
  reportError: console.log,
});
export const ErrorsApiContext = createContext<ErrorsApi>({
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

export function useErrorsProvider() {
  const [errors, setErrors] = useState<ErrorNotification[]>([]);
  const report = useCallback((err: ErrorMessage) => {
    setErrors(old => old.concat({
      created: Date.now(),
      message: err,
    }));
  }, [setErrors]);
  const remove = useCallback((err: ErrorNotification) => {
    setErrors(old => old.filter(elm => elm.created != err.created));
  }, [setErrors]);

  const reporter: ErrorReporter = { reportError: report };
  const api: ErrorsApi = { reportError: report, errors, remove };

  const ErrorReporterProvider = useMemo<React.FC<React.PropsWithChildren>>(() => (
    (props: React.PropsWithChildren) => (
      <ErrorReportContext.Provider value={reporter}>
        {props.children}
      </ErrorReportContext.Provider>
    )
  ), [reporter]);

  const ErrorsApiProvider = useMemo<React.FC<React.PropsWithChildren>>(() => (
    (props: React.PropsWithChildren) => (
      <ErrorsApiContext.Provider value={api}>
        {props.children}
      </ErrorsApiContext.Provider>
    )
  ), [api]);

  return { ErrorReporterProvider, ErrorsApiProvider };
}
