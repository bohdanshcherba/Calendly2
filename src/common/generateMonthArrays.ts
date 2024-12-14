export function generateMonthArrays() {
  const today = new Date();
  const currentYear = today.getFullYear();

  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const daysInMonth = new Date(currentYear, month, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, j) => {
      const day = j + 1;
      const date = new Date(currentYear, month - 1, day);
      const formattedDate = `${day}/${month}/${currentYear}`;
      return { day: formattedDate, color: 'white' };
    });
  });
}

export function getCurrentMonthDays(yearDays: any, selectedDate: Date) {
  const currentDate = new Date(selectedDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const firstDay = new Date(year, month, 1);

  // Determine the day of the week for the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const startDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday (0) to 6, Monday (1) to 0, etc.

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = [];

  for (let i = 0; i < startDayOfWeek; i++) {
    daysArray.push(null); // Add null values for empty spaces before the first day
  }

  return [...daysArray, ...yearDays[month]];
}
