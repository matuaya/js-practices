#!/usr/bin/env node

import { endOfMonth, isSaturday, addDays } from "date-fns";
import minimist from "minimist";

const displayDates = (firstOfMonth) => {
  const lastOfMonth = endOfMonth(firstOfMonth);

  process.stdout.write("   ".repeat(firstOfMonth.getDay()));
  for (let date = firstOfMonth; date <= lastOfMonth; date = addDays(date, 1)) {
    let paddedDate = String(date.getDate()).padStart(2, " ");
    if (isSaturday(date) || date.getDate() === lastOfMonth.getDate()) {
      console.log(paddedDate);
    } else {
      process.stdout.write(`${paddedDate} `);
    }
  }
};

const displayCalendar = (year, month) => {
  console.log(`      ${month}月 ${year}\n日 月 火 水 木 金 土`);

  const firstOfMonth = new Date(year, month - 1);
  displayDates(firstOfMonth);
};

const main = () => {
  const argv = minimist(process.argv.slice(2));

  const today = new Date();
  const year = argv.y ?? today.getFullYear();
  const month = argv.m ?? today.getMonth() + 1;

  displayCalendar(year, month);
};

main();
