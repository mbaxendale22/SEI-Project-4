import React from 'react';
import { useQuery } from 'react-query';
import { Doughnut } from 'react-chartjs-2';
import ExpensesDonut from '../charts/ExpensesDonut';
import { reverseDate } from '../../helpers/rendering';
import { doubleChevUp } from '../../assets/doublechev';
import {
  getHouseTotalExpenses,
  getHouseLargestExpense,
  getHouseCategories,
} from '../../lib/api/household';

const HouseholdExpensesData = ({ move }) => {
  const { data: cat, isLoading } = useQuery(
    'categoriesHousehold',
    getHouseCategories
  );
  const { data: total } = useQuery('totalHousehold', getHouseTotalExpenses);
  const { data: largest, isLoading: stillLoading } = useQuery(
    'largestHoushold',
    getHouseLargestExpense
  );

  const moveBack = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  console.log(largest);

  if (stillLoading) return <p>Loading...</p>;

  return (
    <>
      <span onClick={moveBack} className=" mt-10 transform hover:scale-150">
        {doubleChevUp}
      </span>
      <div>
        <div>
          <p>Your total expenses this month so far:</p>
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
            {largest.length && (
              <p className="bg-primary text-white shadow-sm rounded-md p-2">
                {reverseDate(largest[0]?.date)}
              </p>
            )}
          </div>
        </div>
      </div>
      <p>Your Spending by category this month</p>
      <div className=" w-3/4 sm:w-1/3">
        {isLoading ? (
          <p>Loading your data...</p>
        ) : (
          <Doughnut
            data={ExpensesDonut(
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

export default HouseholdExpensesData;
