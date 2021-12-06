import React from 'react';
import { getRecentExpenses } from '../../lib/api';
import { useQuery } from 'react-query';
const Transactions = ({ setShowModal }) => {
  const {
    data: recent,
    isError: errors,
    isLoading: loading,
  } = useQuery('recent', getRecentExpenses);

  const isResolved = (item) => {
    if (item.shared && item.resolved) {
      return 'md:border-2 md:border-green-200 text-green-200  w-3/4 rounded-md';
    } else if (item.shared && !item.resolved) {
      return 'md:border-2 md:border-primary text-primary w-3/4 rounded-md';
    } else {
      return '';
    }
  };

  console.log(recent);

  return (
    <section className="h-full flex flex-col justify-evenly relative">
      <h2 className="text-center py-3">Recent Expenses</h2>
      <div className="grid grid-cols-7 overflow-x-scroll gap-2 text-center">
        {recent?.map((item) => {
          return (
            <>
              <div>{item.name}</div>
              <div>
                {item.category === 'entertainment' ? <p>ent</p> : item.category}
              </div>
              <div>£{item.amount}</div>
              <div
                className={
                  item.shared
                    ? ' md:border-2 border-green-200 text-green-200  w-3/4 rounded-md'
                    : 'md:border-2 border-primary text-primary w-3/4 rounded-md'
                }
              >
                shared
              </div>
              <div className={isResolved(item)}>resolved</div>
              <div className="border-2 border-gray-400 hover:shadow-md w-3/4 rounded-md transform hover:-translate-x-1">
                edit
              </div>
              <div className="border-2 border-gray-400 hover:shadow-md w-3/4 rounded-md transform hover:-translate-x-1">
                delete
              </div>
            </>
          );
        })}
      </div>
      <div
        onClick={() => setShowModal(true)}
        className="border-2 m-auto my-2 border-gray-400 rounded-md hover:shadow-md transform hover:-translate-x-1 p-2 text-center w-1/6"
      >
        Add Expense
      </div>
    </section>
  );
};

export default Transactions;
