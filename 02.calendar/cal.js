#!/usr/bin/env node

import { endOfMonth, isSaturday, setDate, addDays } from "date-fns";
import minimist from "minimist";

const WEEK = ["日", "月", "火", "水", "木", "金", "土"];

let add_spaces = (target_date) => {
  let space_count = target_date.getDay();
  process.stdout.write("   ".repeat(space_count));
};

let display_dates = (target_date) => {
  let first_date = setDate(target_date, 1);
  let last_date = endOfMonth(target_date);

  for (let date = first_date; date <= last_date; date = addDays(date, 1)) {
    process.stdout.write(String(date.getDate()).padStart(2, " ") + " ");
    if (isSaturday(date) || date.getDate() == last_date.getDate()) {
      console.log();
    }
  }
};

let display_calendar = (year, month) => {
  console.log("      " + month + "月 " + year);
  console.log(WEEK.join(" "));

  let target_date = new Date(year, month - 1);
  add_spaces(target_date);
  display_dates(target_date);
};

let main = () => {
  let argv = minimist(process.argv.slice(2));

  let today = new Date();
  let year = argv.y || today.getFullYear();
  let month = argv.m || today.getMonth() + 1;

  display_calendar(year, month);
};

main();
