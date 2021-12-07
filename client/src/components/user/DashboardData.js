import React from 'react';
import { Link } from 'react-router-dom';
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
          <>
            <div>Your unique household number is {user?.household}</div>
            <Link to="/manage-household">
              <div className="dashboard-btn">Manage your household details</div>
            </Link>
          </>
        ) : (
          <Link to="/manage-household">
            <div className="dashboard-btn">Join or create a household</div>
          </Link>
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
