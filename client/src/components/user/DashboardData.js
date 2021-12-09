import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getHouseholdInfo } from '../../lib/api/household.js';
import ExpensesDonut from '../charts/ExpensesDonut';

const DashboardData = ({ user }) => {
  const {
    data: houseName,
    isError,
    isLoading,
  } = useQuery('householdInfo', () => getHouseholdInfo(user.household));

  return (
    <div className="h-full w-full relative border-2 border-black flex flex-col gap-10 pt-12 items-center">
      <div>
        <p className="text-3xl font-semibold">Welcome back {user?.username}</p>
      </div>
      <div className="border-black border-2 flex flex-col items-center gap-5 w-full sm:w-2/3">
        {houseName ? (
          <>
            <div>Your a member of {houseName?.name}</div>
            <div>Your unique household ID is {user?.household}</div>
            <Link to="/manage-household">
              <div className="dashboard-btn px-8">
                Manage your household details
              </div>
            </Link>
          </>
        ) : (
          <>
            <p>
              You're not yet a member of household click below to get started
            </p>
            <Link to="/manage-household">
              <div className="dashboard-btn">Join or create a household</div>
            </Link>
          </>
        )}
      </div>
      <div className=" w-full px-4 sm:w-2/3 sm:px-0 flex flex-col gap-10 transition-opacity">
        <div className="text-center">
          <h2 className="text-2xl pb-4">How does household work?</h2>
          <p>
            If you want to use household for your personal finances simply click
            the menu icon to get started. Track your income, expenses and
            savings, and get up-to-date feedback on your spending habits and
            income streams
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl pb-4">Sharing is caring</h2>
          <p>
            To get the most out of Household, join or create a household. Simply
            mark an expense as shared and let Household take care of the rest.
          </p>
          <p>
            When you've settled up with your household members, mark the expense
            as resolved to update everyone's personal finances
          </p>
          <p>
            Finally, keep track of household expenses in the dedicated household
            dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;
