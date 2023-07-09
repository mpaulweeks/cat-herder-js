import { useState } from "react";
import { EventLookup, generateUrl } from "../lib";
import { useTitle } from "./hooks/useTitle";
import styles from './App.module.css';

export function WelcomeView(props: {
  setEventLookup(newLookup: Partial<EventLookup>): void;

}) {
  const [input, setInput] = useState('');

  useTitle();

  return (
    <div className={styles.Main}>
      <h1>Cat Herder</h1>
      <div>a tool for herding cats</div>
      <br/>
      <form onSubmit={evt => {
        evt.preventDefault();
        const lookup: Partial<EventLookup> = { category: input, };
        window.history.pushState(null, '', generateUrl(lookup));
        props.setEventLookup(lookup);
      }}>
        <input
          placeholder="enter group name"
          value={input}
          onChange={evt => setInput(evt.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
