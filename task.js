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
  // we return the first Sunday of the month
  return date.getDate();
}

// this function calculates all expenses until the first Sunday of the month
function getAllExpenses(daysData, firstSunday) {
  let allExpenses = [];
  // We iterate through all expense categories.
  for (const day in daysData) {
    const categories = daysData[day];
    // If the day is less than or equal to the first Sunday, we collect expenses.
    if (parseInt(day, 10) <= firstSunday) {
      // We iterate through all day in daysData.
      for (const category in categories) {
        //We combine expenses from each category into allExpenses.
        allExpenses.push(...categories[category]);
      }
    }
  }
  //sort all expenses
  allExpenses.sort((a, b) => a - b);
  //return sorted expenses
  return allExpenses;
}
//function getMedian calculate median of expenses
function getMedian(expenses) {
  //we get the length of the array with sorted costs
  const count = expenses.length;
  //if array empty return null
  if (count === 0) return null;
  // Calculate the middle index in the sorted array.
  const middle = Math.floor(count / 2);
  // If the number of expenses is even, we return the average of the two middle values.
  if (count % 2 === 0) {
    return (expenses[middle - 1] + expenses[middle]) / 2;
  } else {
    // If the number of expenses is odd, we return the middle value.
    return expenses[middle];
  }
}
// The get Month Expenses function calculates the median expenses up to the first Sunday for a given month.
function getMonthExpenses(yearMonth, expensesData) {
  // We separate the year and month from the yearMonth
  const [year, month] = yearMonth.split("-").map(Number);
  //We calculate the day of the first Sunday.
  const firstSunday = getFirstDay(year, month);
  // We retrieve data for the days of a given month.
  const daysData = expensesData[yearMonth];
  //We collect all expenses by the first Sunday.
  const allExpenses = getAllExpenses(daysData, firstSunday);
  //return the median of all collected expenses
  return getMedian(allExpenses);
}
// Function to calculate medians for all months in the expenses object
function getMedianOfMedian(expenses) {
  const medians = [];
  // Iterate through each yearMonth in the expenses object
  for (const yearMonth in expenses) {
    // Calculate the median expenses for the month
    const median = getMonthExpenses(yearMonth, expenses);
    // If median is not null, add it to the medians array
    if (median !== null) {
      medians.push(median);
    }
  }
  // Return array of medians for all months
  return medians;
}

// Function to calculate the median of all monthly medians
function medianOfAllMonth(medians) {
  const lengthOfMedian = medians.length;
  const middle = Math.floor(lengthOfMedian / 2);
  // If there are no medians, return null
  if (lengthOfMedian === 0) return null;
  // If the number of medians is even, return the average of the two middle values
  if (lengthOfMedian % 2 === 0) {
    return (medians[middle - 1] + medians[middle]) / 2;
  } else {
    // If the number of medians is odd, return the middle value
    return medians[middle];
  }
}
// Main function that uses the above helper functions to solve the problem
function solution(expenses) {
  let result = null;
  // Get an array of all monthly medians
  const medians = getMedianOfMedian(expenses);
  // Calculate the median of all monthly medians
  result = medianOfAllMonth(medians);
  // Return the final result
  return result;
}

console.log(solution(expenses));
export default solution;
