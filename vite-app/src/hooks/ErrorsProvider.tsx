import React, { useCallback, useMemo, useState } from "react";
import { ErrorMessage, ErrorNotification } from "../lib";
import { ErrorReportContext, ErrorReporter, ErrorsApi, ErrorsApiContext } from "./ErrorsContext";

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
