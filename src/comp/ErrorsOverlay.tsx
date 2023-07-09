import { useErrors } from "./ErrorsContext";

export function ErrorsOverlay() {
  const errorsApi = useErrors();

  return errorsApi.errors.map(e => <div>{e}</div>);
}
