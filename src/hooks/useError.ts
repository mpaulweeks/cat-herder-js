import { useContext } from "react";
import { ErrorReportContext, ErrorsApiContext } from "./ErrorsContext";

export function useErrorReporter() {
  return useContext(ErrorReportContext);
}
export function useErrorsApi() {
  return useContext(ErrorsApiContext);
}
