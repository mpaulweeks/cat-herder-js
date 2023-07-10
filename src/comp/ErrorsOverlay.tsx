import { ErrorNotification } from "../lib";
import { useErrorsApi } from "../hooks/useError";
import styles from './ErrorsOverlay.module.css';

function ErrorBoxClose(props: {
  err: ErrorNotification;
  onClose(): void;
}) {
  return (
    <div
      className={styles.ErrorBoxClose}
      onClick={props.onClose}
    >✖</div>
  );
}

export function ErrorsOverlay() {
  const errorsApi = useErrorsApi();

  const sorted = errorsApi.errors
    .concat()
    .sort((a,b) => a.created < b.created ? -1 : 1)
    .reverse();

  return (
    <div className={styles.ErrorOverlay}>
      {sorted.map(err => (
        <div
          key={err.created} // todo add id
          className={styles.ErrorBox}
        >
          <div><b>ERROR</b></div>
          <div>{err.message}</div>
          <ErrorBoxClose err={err} onClose={() => errorsApi.remove(err)} />
        </div>
      ))}
    </div>
  );
}
