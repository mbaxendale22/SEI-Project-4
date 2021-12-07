import React from 'react';
import { useQuery } from 'react-query';
import { getCategories } from '../../lib/api/PE.js';
import { Doughnut } from 'react-chartjs-2';
import donutChart from '../charts/Donut';
import { reverseDate } from '../../helpers/rendering';
import { doubleChevUp } from '../../assets/doublechev';
import {
  getTotalExpenses,
  getPreviousTotalExpenses,
  getLargestExpense,
} from '../../lib/api/PE.js';

const PersonalIncomeData = ({ move }) => {
  const { data: cat, isLoading } = useQuery('categories', getCategories);
  const { data: total } = useQuery('total', getTotalExpenses);
  // const { data: previous } = useQuery('previous', getPreviousTotalExpenses);
  const { data: largest } = useQuery('largest', getLargestExpense);

  const moveBack = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <span onClick={moveBack} className=" mt-10 transform hover:scale-150">
        {doubleChevUp}
      </span>
      <div>
        <div>
          <p>THIS IS A DIFFERENT PAGE BUT WITH THE SAME DATA FOR NOW</p>
          <p className="bg-primary w-1/3 text-center m-auto text-white shadow-sm rounded-md p-2">
            £{total}
          </p>
        </div>
        <div className="p-4">
          <p>Your largest expense this month:</p>
          <div className="flex gap-2 mt-4">
            <p className="bg-primary text-white shadow-sm rounded-md p-2">
              {largest[0]?.name}
            </p>
            <p className="bg-primary text-white shadow-sm rounded-md p-2">
              £{largest[0]?.amount}
            </p>
            <p className="bg-primary text-white shadow-sm rounded-md p-2">
              {reverseDate(largest[0]?.date)}
            </p>
          </div>
        </div>
      </div>
      <p>Your Spending by category this month</p>
      <div className=" w-3/4 sm:w-1/3">
        {isLoading ? (
          <p>Loading your data...</p>
        ) : (
          <Doughnut
            data={donutChart(
              cat.bills,
              cat.dining,
              cat.entertainment,
              cat.general,
              cat.grocery,
              cat.retail,
              cat.transport,
              cat.travel
            )}
          />
        )}
      </div>
    </>
  );
};

export default PersonalIncomeData;
