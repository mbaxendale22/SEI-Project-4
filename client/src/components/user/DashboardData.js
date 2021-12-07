import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { getCategories } from '../../lib/api/PE.js';
import ExpensesDonut from '../charts/ExpensesDonut';

const DashboardData = ({ user }) => {
  const { data, isError, isLoading } = useQuery('categories', getCategories);

  if (isError) return <p>Something has gone wrong, please try again later</p>;

  return (
    <div className="h-full w-full border-2 border-black flex flex-col gap-10 pt-12 items-center">
      <div>
        <p>Welcome back {user?.username}</p>
      </div>
      <div className="w-1/4">
        {user?.household ? (
          <div>Your household number is {user?.household}</div>
        ) : (
          <div className=" border-primary border-2 p-1 rounded-md shadow-sm text-center text-black">
            Join or create a household
          </div>
        )}
      </div>
      <div>
        <p>An Overview of This Month's Expenses</p>
        {isLoading ? (
          <p>Loading your data...</p>
        ) : (
          <Doughnut
            data={ExpensesDonut(
              data.bills,
              data.dining,
              data.entertainment,
              data.general,
              data.grocery,
              data.retail,
              data.transport,
              data.travel
            )}
          />
        )}
      </div>
      <div>Averages maybe?</div>
    </div>
  );
};

export default DashboardData;
