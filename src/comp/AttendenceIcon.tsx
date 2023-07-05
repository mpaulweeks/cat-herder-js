import { Attendence, AttendenceOrder } from "../lib";
import { useCallback } from "react";
import { CssClass } from "./display";

export function AttendenceIcon(props: {
  attendence: Attendence;
  isEditing: boolean;
  onUpdate(attendence: Attendence): void;
}) {
  const icon = {
    [Attendence.No]: '✗',
    [Attendence.Yes]: '✔',
    [Attendence.Maybe]: '???',
    [Attendence.Undefined]: '-',
  }[props.attendence];
  const style: React.CSSProperties = {
    [Attendence.No]: {
      color: 'red',
      fontSize: '1.2em',
    },
    [Attendence.Yes]: {
      color: 'green',
    },
    [Attendence.Maybe]: {
      color: 'blue',
    },
    [Attendence.Undefined]: {
      color: 'grey',
    },
  }[props.attendence];

  const onClick = useCallback(() => {
    if (!props.isEditing) { return; }
    const next = AttendenceOrder[(AttendenceOrder.indexOf(props.attendence) + 1) % AttendenceOrder.length];
    props.onUpdate(next);
  }, [props]);

  const className = [
    CssClass.Attendence,
    ...(props.isEditing ? [CssClass.Clickable] : []),
  ].join(' ');
  return (
    <div className={className} onClick={onClick}>
      <div style={style}>{icon}</div>
    </div>
  );
}
