import { PropsWithChildren, createContext, useCallback, useContext, useState } from "react";

// inspired by context + reducer but simplified
// https://react.dev/learn/scaling-up-with-reducer-and-context

export type ErrorMessage = string;
export type ErrorNotification = {
  created: number;
  message: ErrorMessage;
}

type ErrorsApi = {
  errors: ErrorNotification[];
  add(err: ErrorMessage): void;
  remove(err: ErrorNotification): void;
}

const ErrorsContext = createContext<ErrorsApi>({
  errors: [],
  add: console.log,
  remove: console.log,
});

export function useErrors() {
  return useContext(ErrorsContext);
}

export function ErrorsProvider(props: PropsWithChildren) {
  const [errors, setErrors] = useState<ErrorNotification[]>([]);
  const add = useCallback((err: ErrorMessage) => {
    setErrors(old => old.concat({
      created: Date.now(),
      message: err,
    }));
  }, [setErrors]);
  const remove = useCallback((err: ErrorNotification) => {
    setErrors(old => old.filter(elm => elm.created != err.created));
  }, [setErrors]);

  const api: ErrorsApi = { errors, add, remove };

  return (
    <ErrorsContext.Provider value={api}>
        {props.children}
    </ErrorsContext.Provider>
  );
}
