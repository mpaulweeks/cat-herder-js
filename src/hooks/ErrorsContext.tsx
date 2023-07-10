import { createContext } from "react";
import { ErrorMessage, ErrorNotification } from "../lib";

// inspired by context + reducer but simplified
// https://react.dev/learn/scaling-up-with-reducer-and-context

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
