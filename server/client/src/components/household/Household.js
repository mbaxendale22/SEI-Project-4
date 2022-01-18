import React from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { doubleChevDown } from '../../assets/doublechev';
import HouseholdTransactions from './HouseholdTransactions';

const Household = ({ user, move }) => {
  const queryClient = useQueryClient();
  const householdInfo = queryClient.getQueryData(['householdInfo', user.id]);

  return (
    <>
      {user.household !== null ? (
        <div className="w-full flex flex-col items-center gap-10 pt-12">
          <div>
            <p>{householdInfo?.name}</p>
          </div>
          <div className=" w-full h-3/4 text-xs md:text-sm sm:h-1/3 lg:text-base md:w-10/12 lg:w-3/4 md:h-1/3 border-primary border-2">
            <HouseholdTransactions householdInfo={householdInfo} />
          </div>
          <p>See An Overview of This Month's Expenses</p>
          <span onClick={move} className="transform hover:scale-150">
            {doubleChevDown}
          </span>
        </div>
      ) : (
        <div className="h-3/4 gap-8 flex flex-col justify-center items-center">
          <h2 className="text-sm sm:text-base">
            Looks like you are not part of a household yet
          </h2>
          <Link to="/manage-household">
            <div className="dashboard-btn text-sm sm:text-base px-4">
              Join or create a household
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Household;
