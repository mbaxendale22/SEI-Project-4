import React, { useState } from 'react';
import { getRecentExpenses } from '../../lib/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { isResolved, reverseDate } from '../../helpers/rendering';
import { deleteExpense } from '../../lib/api';
import EditExpense from './EditExpense';
const Transactions = ({ setShowModal }) => {
  const queryClient = useQueryClient();
  const {
    data: recent,
    isError: errors,
    isLoading: loading,
  } = useQuery('recent', getRecentExpenses);

  const { mutate } = useMutation(
    (id) => {
      return deleteExpense(id);
    },
    {
      onSuccess: () => queryClient.invalidateQueries('recent'),
    }
  );

  const [editing, setEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  if (loading) return <p>loading...</p>;
  if (errors) return <p>Something has gone wrong please try again later</p>;
  if (editing)
    return <EditExpense setEditing={setEditing} item={currentItem} />;
  return (
    <section className="h-full flex flex-col justify-evenly relative">
      <h2 className="text-center py-3">Recent Expenses</h2>
      <div className="grid grid-cols-8 overflow-x-scroll gap-2 text-center">
        {recent?.map((item) => {
          return (
            <>
              <div key={recent.id}>{reverseDate(item.date)}</div>
              <div>{item.name}</div>
              <div>
                {item.category === 'entertainment' ? <p>ent</p> : item.category}
              </div>
              <div>£{item.amount}</div>
              <div
                className={
                  item.share
                    ? ' md:border-2 border-green-400 text-green-400  w-3/4 rounded-md'
                    : 'md:border-2 border-primary text-primary w-3/4 rounded-md'
                }
              >
                shared
              </div>
              {isResolved(item)}
              <div
                onClick={() => {
                  setCurrentItem(item);
                  setEditing(true);
                }}
                className="border-2 border-gray-400 hover:shadow-md w-3/4 rounded-md transform hover:-translate-x-1"
              >
                edit
              </div>
              <div
                onClick={() => mutate(item.id)}
                className="border-2 border-gray-400 hover:shadow-md w-3/4 rounded-md transform hover:-translate-x-1"
              >
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
