import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { isHouseholdResolved, reverseDate } from '../../helpers/rendering';
import { getRecentHouseExpenses } from '../../lib/api/household.js';
const HouseholdTransactions = ({ householdInfo }) => {
  const [showUnresolved, setShowUnresolved] = useState(false);

  const {
    data: recent,
    isError: errors,
    isLoading: loading,
  } = useQuery('houseExpenses', () => getRecentHouseExpenses(householdInfo.id));
  console.log(recent);

  if (loading) return <p>loading household expenses...</p>;
  if (errors) return <p>Something has gone wrong please try again later</p>;
  const onlyUnresolved = recent.filter((ex) => !ex.resolved);

  return (
    <section className="h-full flex flex-col justify-evenly">
      {!showUnresolved ? (
        <>
          <h2 className="text-center py-3">Recent Household Expenses</h2>
          <div className="grid grid-cols-1 gap-1 justify-items-center sm:grid-cols-5 h-48 sm:max-h-64 sm:h-full overflow-x-scroll sm:gap-2 text-center border-2 border-b">
            {recent?.map((item) => {
              return (
                <>
                  <div key={recent.id}>{reverseDate(item.date)}</div>
                  <div>{item.name}</div>
                  <div>
                    {item.category === 'entertainment' ? (
                      <p>ent</p>
                    ) : (
                      item.category
                    )}
                  </div>
                  <div>£{item.amount}</div>

                  {isHouseholdResolved(item)}
                  <hr className="border-t-2 border-dotted w-3/4 border-primary rounded-3xl my-4 sm:hidden" />
                </>
              );
            })}
          </div>
          <div
            onClick={() => setShowUnresolved(true)}
            className="border-2 m-auto my-2 border-gray-400 rounded-md hover:shadow-md transform duration-300 ease-in-out hover:-translate-x-1 p-2 text-center w-3/4 sm:w-1/4"
          >
            show only unresolved expenses
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center py-3">Recent Household Expenses</h2>
          <div className="grid grid-cols-1 gap-1 justify-items-center sm:grid-cols-5 h-48 sm:max-h-64 sm:h-full overflow-x-scroll sm:gap-2 text-center border-2 border-b">
            {onlyUnresolved?.map((item) => {
              return (
                <>
                  <div key={recent.id}>{reverseDate(item.date)}</div>
                  <div>{item.name}</div>
                  <div>
                    {item.category === 'entertainment' ? (
                      <p>ent</p>
                    ) : (
                      item.category
                    )}
                  </div>
                  <div>£{item.amount}</div>

                  {isHouseholdResolved(item)}
                  <hr className="border-t-2 border-dotted w-3/4 border-primary rounded-3xl my-4 sm:hidden" />
                </>
              );
            })}
          </div>
          <div
            onClick={() => setShowUnresolved(false)}
            className="border-2 m-auto my-2 border-gray-400 rounded-md hover:shadow-md transform duration-300 ease-in-out hover:-translate-x-1 p-2 text-center w-3/4 sm:w-1/4"
          >
            show all expenses
          </div>
        </>
      )}
    </section>
  );
};

export default HouseholdTransactions;
