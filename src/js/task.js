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

function getFirstDay(year, month) {
  const date = new Date(year, month - 1, 1);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  return date.getDate();
}

function getAllExpenses(daysData, firstSunday) {
  let allExpenses = [];
  for (const day in daysData) {
    const categories = daysData[day];
    if (parseInt(day, 10) <= firstSunday) {
      for (const category in categories) {
        allExpenses = allExpenses.concat(categories[category]);
      }
    }
  }
  allExpenses.sort((a, b) => a - b);
  return allExpenses;
}

function getMedian(expensesCount, allExpenses) {
  let median = null;
  if (expensesCount > 0) {
    const sum = allExpenses.reduce(
      (total, currentValue) => total + currentValue,
      0
    );
    median = Math.round(sum / expensesCount);
  }

  return median;
}

function getMonthExpenses(yearMonth, expensesData) {
  const [year, month] = yearMonth.split("-").map(Number);
  const firstSunday = getFirstDay(year, month);
  const daysData = expensesData[yearMonth];
  const allExpenses = getAllExpenses(daysData, firstSunday);

  const { length } = allExpenses;
  const median = getMedian(length, allExpenses);

  return median;
}

function solution(expensesData) {
  const result = {};

  for (const yearMonth in expensesData) {
    result[yearMonth] = getMonthExpenses(yearMonth, expensesData);
  }

  return result;
}

console.log(solution(expenses));
export default solution;
