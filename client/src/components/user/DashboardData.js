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
    <div className="h-full w-full border-2 border-black flex flex-col gap-10 pt-12 items-center">
      <div>
        <p>Welcome back {user?.username}</p>
      </div>
      <div className="w-1/4">
        {houseName ? (
          <>
            <div>Your a member of {houseName?.name}</div>
            <div>Your unique household ID is {user?.household}</div>
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
    </div>
  );
};

export default DashboardData;
