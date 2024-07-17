import solution from "./task";

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

document.addEventListener("DOMContentLoaded", () => {
  const expensesContainer = document.querySelector(".list-Container");

  const results = solution(expenses);

  function createMarkup(results) {
    return Object.entries(results)
      .map(
        ([yearMonth, median]) =>
         `
        <li class="list-item">
         <h3 class="expense-title">Median expenses for ${yearMonth}:</h3>
         <p class="count-of-expense"> ${
           median !== null ? median : "No data available"
         } $</p>
       </li>`
      )
      .join("");
  }

  expensesContainer.innerHTML = `<ul>${createMarkup(results)}</ul>`;
});
