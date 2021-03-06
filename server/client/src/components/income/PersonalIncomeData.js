import React from 'react';
import { useQuery } from 'react-query';
import { Doughnut } from 'react-chartjs-2';
import IncomeDonut from '../charts/IncomeDonut';
import { reverseDate } from '../../helpers/rendering';
import { doubleChevUp } from '../../assets/doublechev';
import {
  getIncomeCategories,
  getLargestIncome,
  getTotalIncome,
} from '../../lib/api/PI.js';

const PersonalIncomeData = ({ move }) => {
  const {
    data: cat,
    isLoading,
    isError,
  } = useQuery('incomeCategories', getIncomeCategories);
  const { data: total } = useQuery('total', getTotalIncome);
  const {
    data: largest,
    isLoading: loadingLargest,
    isError: errorLargest,
  } = useQuery('largestIncome', getLargestIncome);

  const moveBack = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  if (loadingLargest || isLoading) return <p>Loading...</p>;
  if (errorLargest || isError) return <p>No data to display</p>;

  return (
    <>
      <span onClick={moveBack} className=" mt-10 transform hover:scale-150">
        {doubleChevUp}
      </span>
      <div>
        <div>
          <p className="text-center">Your total income this month</p>
          <p className="bg-primary w-1/3 text-center m-auto text-white shadow-sm rounded-md p-2">
            £{total}
          </p>
        </div>
        <div className="p-4">
          <p>Your largest income this month:</p>
          {largest.length && (
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
            data={IncomeDonut(cat.Paycheck, cat.Selling, cat.Passive, cat.Misc)}
          />
        )}
      </div>
    </>
  );
};

export default PersonalIncomeData;
