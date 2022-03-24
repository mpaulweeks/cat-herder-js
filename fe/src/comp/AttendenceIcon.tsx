import { Attendence } from "../lib/types";

export function AttendenceIcon(props: {
  attendence: Attendence,
}) {
  const icon = {
    [Attendence.No]: '❌',
    [Attendence.Yes]: '✔',
    [Attendence.Maybe]: '?',
    [Attendence.Undefined]: '-',
  }[props.attendence];
  const color = {
    [Attendence.No]: 'red',
    [Attendence.Yes]: 'green',
    [Attendence.Maybe]: 'blue',
    [Attendence.Undefined]: 'grey',
  }[props.attendence];

  return (
    <div style={{ color, }}>
      {icon}
    </div>
  );
}
