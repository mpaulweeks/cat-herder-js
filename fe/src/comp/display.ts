export function getDateStrings(date: Date) {
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = (date.getDate()).toString().padStart(2, '0');
  return { dayOfWeek, dd, mm, yyyy, };
}
