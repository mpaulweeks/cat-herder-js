import { useEffect, useState } from "react";

export function useKeyboard() {
  const [pressed, setPressed] = useState<string[]>([]);

  useEffect(() => {
    const onPress = (evt: KeyboardEvent) => setPressed(pressed.filter(c => c !== evt.code).concat(evt.code));
    const onRelease = (evt: KeyboardEvent) => setPressed(pressed.filter(c => c !== evt.code));
    window.addEventListener('keydown', onPress);
    window.addEventListener('keyup', onRelease);
    return () => {
      window.removeEventListener('keydown', onPress);
      window.removeEventListener('keyup', onRelease);
    };
  });

  return pressed;
}
