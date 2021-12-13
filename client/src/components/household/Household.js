import React from 'react';
import { useQueryClient } from 'react-query';
import { doubleChevDown } from '../../assets/doublechev';
import HouseholdTransactions from './HouseholdTransactions';

const Household = ({ user, move }) => {
  const queryClient = useQueryClient();
  const householdInfo = queryClient.getQueryData('householdInfo');

  return (
    <>
      {householdInfo && (
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
      )}
    </>
  );
};

export default Household;
