#!/usr/bin/env node

import * as dateFns from "date-fns";
import minimist from "minimist";

const printDatesOfMonth = (year, month) => {
  const firstDateOfMonth = new Date(year, month - 1);
  const lastDateOfMonth = dateFns.endOfMonth(firstDateOfMonth);

  process.stdout.write("   ".repeat(firstDateOfMonth.getDay()));
  for (
    let date = firstDateOfMonth;
    date <= lastDateOfMonth;
    date = dateFns.addDays(date, 1)
  ) {
    const paddedDayString = String(date.getDate()).padStart(2, " ");
    process.stdout.write(paddedDayString);
    if (dateFns.isSaturday(date) || dateFns.isLastDayOfMonth(date)) {
      console.log();
    } else {
      process.stdout.write(" ");
    }
  }
};

const displayCalendar = (year, month) => {
  console.log(`      ${month}月 ${year}`);
  console.log(`日 月 火 水 木 金 土`);

  printDatesOfMonth(year, month);
};

const main = () => {
  const argv = minimist(process.argv.slice(2));

  const today = new Date();
  const year = argv.y ?? today.getFullYear();
  const month = argv.m ?? today.getMonth() + 1;

  displayCalendar(year, month);
};

main();
