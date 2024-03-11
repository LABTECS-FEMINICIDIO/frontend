export function formatDate(dateTimeString: string, includeTime: boolean = true) {
  const [datePart, timePart] = dateTimeString.split('T');
  const [year, month, day] = datePart.split('-');
  const formattedDate = `${day}/${month}/${year}`;

  if (includeTime) {
    const formattedTime = timePart ? ` - ${timePart.slice(0, 5)}` : '';
    return `${formattedDate}${formattedTime}`;
  }

  return formattedDate;
}