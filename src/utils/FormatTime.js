export function formatTime(time) {
  const date = new Date(time);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);

  return formattedDate;
}
