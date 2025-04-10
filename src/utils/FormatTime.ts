export function formatTime(time: string): string {
  const date = new Date(time);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);

  return formattedDate;
}
