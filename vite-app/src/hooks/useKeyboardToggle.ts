import { useEffect, useMemo, useState } from "react";
import { useKeyboard } from "./useKeyboard";

// track a keystroke toggle
export function useKeyboardToggle(toggleKeyCode: string, ...additionalKeyCodes: string[]) {
  const [admin, setAdmin] = useState(false);

  const keyCodes = useMemo(() => [toggleKeyCode, ...additionalKeyCodes], [toggleKeyCode, additionalKeyCodes]);
  const { pressed } = useKeyboard(keyCodes);

  useEffect(() => {
    if (pressed.filter(p => keyCodes.includes(p)).length === 1) {
      setAdmin(b => !b);
    }
  }, [pressed, keyCodes]);

  return { admin, setAdmin };
}
