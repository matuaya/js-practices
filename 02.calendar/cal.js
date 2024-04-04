#!/usr/bin/env node

import * as dateFns from "date-fns";
import minimist from "minimist";

const displayDates = (firstDateOfMonth) => {
  const lastOfMonth = dateFns.endOfMonth(firstDateOfMonth);

  process.stdout.write("   ".repeat(firstDateOfMonth.getDay()));
  for (
    let date = firstDateOfMonth;
    date <= lastOfMonth;
    date = dateFns.addDays(date, 1)
  ) {
    let paddedDate = String(date.getDate()).padStart(2, " ");
    if (dateFns.isSaturday(date) || date.getDate() === lastOfMonth.getDate()) {
      console.log(paddedDate);
    } else {
      process.stdout.write(`${paddedDate} `);
    }
  }
};

const displayCalendar = (year, month) => {
  console.log(`      ${month}月 ${year}`);
  console.log(`日 月 火 水 木 金 土`);

  const firstDateOfMonth = new Date(year, month - 1);
  displayDates(firstDateOfMonth);
};

const main = () => {
  const argv = minimist(process.argv.slice(2));

  const today = new Date();
  const year = argv.y ?? today.getFullYear();
  const month = argv.m ?? today.getMonth() + 1;

  displayCalendar(year, month);
};

main();
