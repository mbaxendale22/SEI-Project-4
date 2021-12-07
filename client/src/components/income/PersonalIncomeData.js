import React from 'react';
import { useQuery } from 'react-query';
import { getCategories } from '../../lib/api/PE.js';
import { Doughnut } from 'react-chartjs-2';
import IncomeDonut from '../charts/IncomeDonut';
import { reverseDate } from '../../helpers/rendering';
import { doubleChevUp } from '../../assets/doublechev';
import { getTotalExpenses } from '../../lib/api/PE.js';
import { getIncomeCategories, getLargestIncome } from '../../lib/api/PI.js';

const PersonalIncomeData = ({ move }) => {
  const { data: cat, isLoading } = useQuery(
    'incomeCategories',
    getIncomeCategories
  );
  const { data: total } = useQuery('total', getTotalExpenses);
  const { data: largest, isLoading: loadingLargest } = useQuery(
    'largestIncome',
    getLargestIncome
  );

  const moveBack = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  console.log(largest);

  if (loadingLargest) return <p>Loading...</p>;

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
          {!isLoading && (
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
          )}
        </div>
      </div>
      <p>Your Spending by category this month</p>
      <div className=" w-3/4 sm:w-1/3">
        {isLoading ? (
          <p>Loading your data...</p>
        ) : (
          <Doughnut
            data={IncomeDonut(cat.Salary, cat.Selling, cat.Passive, cat.Misc)}
          />
        )}
      </div>
    </>
  );
};

export default PersonalIncomeData;
