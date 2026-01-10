const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const getNextWorkingDay = (date: Date) => {
  const next = new Date(date);
  next.setDate(next.getDate() + 1);

  while (isWeekend(next)) {
    next.setDate(next.getDate() + 1);
  }

  return next;
};

export const ShippingDate = (workingDays = 5) => {
  const today = new Date();

  const startDate = getNextWorkingDay(today);

  const endDate = new Date(startDate);
  let addedDays = 1;

  while (addedDays < workingDays) {
    endDate.setDate(endDate.getDate() + 1);

    if (!isWeekend(endDate)) {
      addedDays++;
    }
  }

  return { startDate, endDate };
};

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
