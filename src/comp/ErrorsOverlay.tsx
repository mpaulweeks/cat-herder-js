import { useErrors } from "./ErrorsContext";
import styles from './ErrorsOverlay.module.css';

export function ErrorsOverlay() {
  const errorsApi = useErrors();

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
          onClick={() => errorsApi.remove(err)}
        >
          {err.message}
        </div>
      ))}
    </div>
  );
}
