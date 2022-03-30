import { Attendence, AttendenceOrder } from "@mpaulweeks/cat-shared";
import { useCallback } from "react";
import { CssClass } from "./display";

export function AttendenceIcon(props: {
  attendence: Attendence;
  isEditing: boolean;
  onUpdate(attendence: Attendence): void;
}) {
  const icon = {
    [Attendence.No]: '❌',
    [Attendence.Yes]: '✔',
    [Attendence.Maybe]: '???',
    [Attendence.Undefined]: '-',
  }[props.attendence];
  const color = {
    [Attendence.No]: 'red',
    [Attendence.Yes]: 'green',
    [Attendence.Maybe]: 'blue',
    [Attendence.Undefined]: 'grey',
  }[props.attendence];

  const onClick = useCallback(() => {
    const next = AttendenceOrder[(AttendenceOrder.indexOf(props.attendence) + 1) % AttendenceOrder.length];
    props.onUpdate(next);
  }, [props]);

  const className = [
    CssClass.Attendence,
    ...(props.isEditing ? [CssClass.Clickable] : []),
  ].join(' ');
  return (
    <div className={className} style={{ color, }} onClick={onClick}>
      <div>{icon}</div>
    </div>
  );
}
