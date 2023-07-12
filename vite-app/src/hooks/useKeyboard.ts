import { useEffect, useState } from "react";
import { usePrevious } from "./usePrevious";

export function useKeyboard(codes?: string[]) {
  const [holding, setHolding] = useState<string[]>([]);
  const previous = usePrevious(holding);

  useEffect(() => {
    const onPress = (evt: KeyboardEvent) => {
      if (!codes || codes.includes(evt.code)) {
        setHolding(arr => arr.filter(c => c !== evt.code).concat(evt.code));
      }
    };
    const onRelease = (evt: KeyboardEvent) => {
      if (!codes || codes.includes(evt.code)) {
        setHolding(arr => arr.filter(c => c !== evt.code));
      }
    };
    window.addEventListener('keydown', onPress);
    window.addEventListener('keyup', onRelease);
    return () => {
      window.removeEventListener('keydown', onPress);
      window.removeEventListener('keyup', onRelease);
    };
  }, [codes]);

  const pressed = holding.filter(code => !previous.includes(code));
  const released = previous.filter(code => !holding.includes(code));

  return {
    holding,
    pressed,
    released,
  };
}
