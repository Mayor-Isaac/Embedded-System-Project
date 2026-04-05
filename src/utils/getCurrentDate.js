const getCurrentDate = (inputDate = new Date()) => {
  const datePart = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(inputDate);

  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(inputDate);

  return `${datePart}. ${timePart}`;
};

export { getCurrentDate };