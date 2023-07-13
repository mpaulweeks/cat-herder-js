export function getEventID(date: Date) {
  const [month, day, yyyy] = date.toLocaleDateString().split('/');
  return [
    yyyy,
    month.toString().padStart(2, '0'),
    day.toString().padStart(2, '0'),
  ].join('');
}

export function getPrettyDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
