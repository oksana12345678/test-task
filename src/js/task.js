const expenses = {
  "2023-01": {
    "01": {
      food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
      fuel: [210.22],
    },
    "09": {
      food: [11.9],
      fuel: [190.22],
    },
  },
  "2023-03": {
    "07": {
      food: [20, 11.9, 30.2, 11.9],
    },
    "04": {
      food: [10.2, 11.5, 2.5],
      fuel: [],
    },
  },
  "2023-04": {},
};
// function getFirstDay calculates the first Sunday of the given  month and year
function getFirstDay(year, month) {
  // create a date object for the first day of the month
  const date = new Date(year, month - 1, 1);
  // loop runs until the day of the week is 0 (Sunday)
  while (date.getDay() !== 0) {
    //add one day to date
    date.setDate(date.getDate() + 1);
  }
  // return
  return date.getDate();
}

function getAllExpenses(daysData, firstSunday) {
  let allExpenses = [];
  for (const day in daysData) {
    const categories = daysData[day];
    if (parseInt(day, 10) <= firstSunday) {
      for (const category in categories) {
        allExpenses.push(...categories[category]);
      }
    }
  }
  allExpenses.sort((a, b) => a - b);
  return allExpenses;
}

function getMedian(expenses) {
  const count = expenses.length;
  if (count === 0) return null;

  const middle = Math.floor(count / 2);

  if (count % 2 === 0) {
    return (expenses[middle - 1] + expenses[middle]) / 2;
  } else {
    return expenses[middle];
  }
}

function getMonthExpenses(yearMonth, expensesData) {
  const [year, month] = yearMonth.split("-").map(Number);
  const firstSunday = getFirstDay(year, month);
  const daysData = expensesData[yearMonth];
  const allExpenses = getAllExpenses(daysData, firstSunday);

  return getMedian(allExpenses);
}

function getMedianOfMedian(expenses) {
  const medians = [];

  for (const yearMonth in expenses) {
    const median = getMonthExpenses(yearMonth, expenses);
    if (median !== null) {
      medians.push(median);
    }
  }
  return medians;
}
function medianOfAllMonth(medians) {
  const lengthOfMedian = medians.length;
  const middle = Math.floor(lengthOfMedian / 2);
  if (lengthOfMedian === 0) return null;
  if (lengthOfMedian % 2 === 0) {
    return (medians[middle - 1] + medians[middle]) / 2;
  } else {
    return medians[middle];
  }
}
// function take object with expenses
function solution(expenses) {
  let result = null;
  const medians = getMedianOfMedian(expenses);
  result = medianOfAllMonth(medians);
  return result;
}

console.log(solution(expenses));
export default solution;
