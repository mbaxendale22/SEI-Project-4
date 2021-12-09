import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesDonut = (
  bill,
  dining,
  ent,
  general,
  grocery,
  retail,
  trans,
  travel
) => {
  const donut = {
    labels: [
      'Bills',
      'Dining Out',
      'Entertainment',
      'General',
      'Grocery',
      'Retail',
      'Transport',
      'Travel & Leisure',
    ],
    datasets: [
      {
        label: '# of Votes',
        data: [bill, dining, ent, general, grocery, retail, trans, travel],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return donut;
};

export default ExpensesDonut;
