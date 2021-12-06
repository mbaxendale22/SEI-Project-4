import React, { useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { getCategories } from '../../lib/api';
// import donutChart from '../charts/Donut';
import Transactions from '../UI/Transactions';
import AddExpense from '../UI/AddExpense';

const PersonalExpenses = ({ user }) => {
  const {
    data: cat,
    isError,
    isLoading,
  } = useQuery('categories', getCategories);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-full w-full flex flex-col items-center gap-10 pt-12">
      <div>
        <p>{user?.username}'s Expenses</p>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something has gone wrong please try again later</p>}
      <div className=" w-full h-3/4 text-xs md:text-sm sm:h-1/3 lg:text-base md:w-10/12 lg:w-3/4 md:h-2/3 border-primary border-2">
        {showModal ? (
          <AddExpense setShowModal={setShowModal} />
        ) : (
          <Transactions setShowModal={setShowModal} />
        )}
      </div>
      <div>
        <p>An Overview of This Month's Expenses</p>
        {/* {isLoading ? (
          <p>Loading your data...</p>
        ) : (
          <Doughnut
            data={donutChart(
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
        )} */}
      </div>
      <div>Averages maybe?</div>
    </div>
  );
};
export default PersonalExpenses;
