import App from "./App";
function countingDeadline(
  date: any,
  hoursShiftInitial: number,
  MINS_GAP: number
) {
  const WORKING_HOURS_PER_DAY = 9;
  const WORKING_HOURS_DAY_START = 10;
  const WORKING_HOURS_DAY_END = 19;
  const SATURDAY_INDEX = 6;
  const SUNDAY_INDEX = 7;
  const DAYS_IN_WEEK = 7;
  const hoursShift = hoursShiftInitial % WORKING_HOURS_PER_DAY;
  const daysShift = Math.floor(hoursShiftInitial / WORKING_HOURS_PER_DAY);

  function normalizeHours(date: any) {
    const h = date.getHours();
    if (h < WORKING_HOURS_DAY_START) {
      date.setHours(WORKING_HOURS_DAY_START);
      date.setMinutes(0);
    } else if (WORKING_HOURS_DAY_END <= h) {
      date.setDate(date.getDate() + 1);
      date.setHours(WORKING_HOURS_DAY_START);
      date.setMinutes(0);
    }
  }

  function normalizeDays(date: any) {
    const d = date.getDay();
    switch (d) {
      case SATURDAY_INDEX:
        date.setDate(date.getDate() + DAYS_IN_WEEK - SATURDAY_INDEX + 1);
        break;
      case SUNDAY_INDEX:
        date.setDate(date.getDate() + DAYS_IN_WEEK - SUNDAY_INDEX + 1);
        break;
      default:
        break;
    }
  }

  normalizeHours(date);
  normalizeDays(date);

  for (let index = 0; index < hoursShift; index++) {
    date.setHours(date.getHours() + 1);
  }
  date.setMinutes(date.getMinutes() + MINS_GAP);
  normalizeHours(date);
  normalizeDays(date);

  for (let index = 0; index < daysShift; index++) {
    date.setDate(date.getDate() + 1);
    normalizeDays(date);
  }

  date.setSeconds(0);
  return date.toLocaleString();
}

const coutingPriceAndDeadline = (value: string, symbols: number) => {
  let price = 0;

  if (value === "Українська" || value === "Російська") {
    price = symbols * 0.05;
    price > 50 ? (price = price) : (price = 50);
    let hours = Math.ceil(symbols / 1333);
    if (hours === 1) {
      countingDeadline(new Date(), hours, 30);
    } else {
      countingDeadline(new Date(), hours, 0);
    }
    return [price, hours];
  } else {
    price = symbols * 0.12;
    price > 50 ? (price = price) : (price = 120);
    let hours = Math.ceil(symbols / 333);
    if (hours === 1) {
      countingDeadline(new Date(), hours, 30);
    } else {
      countingDeadline(new Date(), hours, 60);
    }
    return [price, hours];
  }
};

describe("validateValue", () => {
  test("Counting hours", () => {
    expect(coutingPriceAndDeadline("осійська", 4444)).toStrictEqual([
      533.28, 14,
    ]);
  });
  test("Counting hours", () => {
    expect(coutingPriceAndDeadline("Українська", 543)).toStrictEqual([50, 1]);
  });
});
