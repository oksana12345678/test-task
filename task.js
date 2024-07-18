// function getFirstDay calculates the first Sunday of the given month and year
function getFirstDay(year, month) {
  // Create a date object for the first day of the month
  const date = new Date(year, month - 1, 1);
  // Loop until the day of the week is 0 (Sunday)
  while (date.getDay() !== 0) {
    // Add one day to date
    date.setDate(date.getDate() + 1);
  }
  // Return the first Sunday of the month
  return date.getDate();
}

// Function to collect all expenses until the first Sunday into one array
function collectExpensesUntilFirstSunday(daysData, firstSunday) {
  let allExpenses = [];
  // Iterate through all expense categories
  for (const day in daysData) {
    const categories = daysData[day];
    // If the day is less than or equal to the first Sunday, collect expenses
    if (parseInt(day, 10) <= firstSunday) {
      // Iterate through all categories
      for (const category in categories) {
        // Combine expenses from each category into allExpenses
        allExpenses.push(...categories[category]);
      }
    }
  }
  return allExpenses;
}
// Function to calculate the median of expenses
function getMedian(expenses) {
  // Get the length of the array with sorted expenses
  const count = expenses.length;
  // If array is empty, return null
  if (count === 0) return null;
  // Calculate the middle index in the sorted array
  const middle = Math.floor(count / 2);
  // If the number of expenses is even, return the average of the two middle values
  if (count % 2 === 0) {
    return (expenses[middle - 1] + expenses[middle]) / 2;
  } else {
    // If the number of expenses is odd, return the middle value
    return expenses[middle];
  }
}

// Main function to calculate the solution
function solution(expenses) {
  const allMonthlyExpenses = [];

  for (const yearMonth in expenses) {
    const [year, month] = yearMonth.split("-").map(Number);
    const firstSunday = getFirstDay(year, month);
    const daysData = expenses[yearMonth];
    const expensesUntilFirstSunday = collectExpensesUntilFirstSunday(
      daysData,
      firstSunday
    );
    allMonthlyExpenses.push(...expensesUntilFirstSunday);
  }
  allMonthlyExpenses.sort((a, b) => a - b);

  const result = getMedian(allMonthlyExpenses);
  return result;
}

// Example expenses object
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

console.log(solution(expenses));
