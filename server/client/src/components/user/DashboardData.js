import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getHouseholdInfo } from '../../lib/api/household.js';
import { deleteUser } from '../../lib/api/PE';

const DashboardData = ({ user }) => {
  const [deleteToogle, setDeleteToogle] = useState(false);
  const { data: houseName } = useQuery(['householdInfo', user.id], () =>
    getHouseholdInfo(user.household)
  );

  const queryClient = useQueryClient();
  const history = useHistory();
  const newHouseName = queryClient.getQueryData(['householdInfo', user.id]);
  const { mutate: deleteCurrentUser } = useMutation(deleteUser, {
    onSuccess: () => history.push('/'),
  });

  return (
    <div className="h-full w-full flex flex-col gap-5 sm:gap-10 pt-12 items-center">
      <div>
        <p className=" text-xl sm:text-3xl font-semibold">
          Welcome back {user?.username}
        </p>
      </div>
      <div className="flex flex-col items-center gap-5 w-full sm:w-2/3">
        {houseName ? (
          <>
            <div>Your a member of {newHouseName?.name}</div>
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
      <div className=" w-full px-4 sm:w-2/3 sm:px-0 flex flex-col items-center gap-10 transition-opacity">
        <div className="text-center">
          <h2 className=" text-xl sm:text-2xl pb-4">
            How does household work?
          </h2>
          <p className="text-sm sm:text-base">
            If you want to use household for your personal finances simply click
            the menu icon to get started. Track your income, expenses and
            savings, and get up-to-date feedback on your spending habits and
            income streams
          </p>
        </div>
        <div className="text-center">
          <h2 className=" text-xl sm:text-2xl pb-4">Sharing is caring</h2>
          <p className="text-sm sm:text-base">
            To get the most out of Household, join or create a household. Simply
            mark an expense as shared and let Household take care of the rest.
          </p>
          <p className="text-sm sm:text-base">
            When you've settled up with your household members, mark the expense
            as resolved to update everyone's personal finances.
          </p>
          <p className="text-sm sm:text-base">
            Finally, keep track of household expenses in the dedicated household
            dashboard
          </p>
        </div>
        <div
          onClick={() => setDeleteToogle(true)}
          className="dashboard-btn w-3/4 sm:w-1/3 "
        >
          Delete my Account
        </div>
        {deleteToogle && (
          <div className="flex w-full sm:w-3/4 justify-center gap-4 -mt-4">
            <div
              onClick={() => deleteCurrentUser()}
              className=" dashboard-btn bg-red-700 text-white border-white shadow-md"
            >
              CONFIRM
            </div>
            <div
              onClick={() => setDeleteToogle(false)}
              className=" dashboard-btn bg-green-700 text-white border-white shadow-md"
            >
              CANCEL
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardData;
