import React, { useState } from 'react';
import { getRecentExpenses } from '../../lib/api/PE.js';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { isResolved, reverseDate } from '../../helpers/rendering';
import { deleteExpense, deleteSharedExpense } from '../../lib/api/PE.js';
import EditExpense from '../expenses/EditExpense';

const Transactions = ({ setShowModal, user }) => {
  const [expenseToDelete, setExpenseToDelete] = useState();
  const [confirmation, setConfirmation] = useState(true);
  const queryClient = useQueryClient();
  const {
    data: recent,
    isError: errors,
    isLoading: loading,
  } = useQuery(['recent'], getRecentExpenses);

  const { mutate: notShared } = useMutation(
    (id) => {
      return deleteExpense(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('recent');
        queryClient.invalidateQueries('largest');
        queryClient.invalidateQueries('categories');
        queryClient.invalidateQueries('total');
      },
    }
  );
  const { mutate: shared } = useMutation(
    () => {
      deleteSharedExpense(user, expenseToDelete);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('recent');
        queryClient.invalidateQueries('largest');
        queryClient.invalidateQueries('categories');
        queryClient.invalidateQueries('total');
      },
    }
  );

  const deleteThisExpense = (item) => {
    setConfirmation(false);
    setExpenseToDelete(item);
  };
  const confirmThisExpense = () => {
    expenseToDelete.share === 'true'
      ? shared(user, expenseToDelete)
      : notShared(expenseToDelete.id);
    setConfirmation(true);
  };

  const [editing, setEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  if (loading) return <p>loading...</p>;
  if (errors) return <p>Something has gone wrong please try again later</p>;
  if (editing)
    return <EditExpense setEditing={setEditing} item={currentItem} />;
  return (
    <section className="h-full flex flex-col justify-evenly">
      <h2 className="text-center py-3">Recent Expenses</h2>
      <div className="grid grid-cols-1 gap-1 justify-items-center sm:grid-cols-8 h-48 sm:max-h-64 sm:h-full overflow-x-scroll sm:gap-2 text-center border-2 border-b">
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
                    ? ' lg:border-2 border-green-400 text-green-400  w-3/4 rounded-md'
                    : 'lg:border-2 border-primary text-primary w-3/4 rounded-md'
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
                className="border-2 border-gray-400 hover:shadow-md w-1/4  sm:w-3/4 rounded-md transform hover:-translate-x-1"
              >
                edit
              </div>
              {confirmation ? (
                <>
                  <div
                    onClick={() => deleteThisExpense(item)}
                    className="border-2 border-gray-400 hover:shadow-md w-1/4 sm:w-3/4 rounded-md transform hover:-translate-x-1"
                  >
                    delete
                  </div>
                  <hr className="border-t-2 border-dotted w-3/4 border-primary rounded-3xl my-4 sm:hidden" />
                </>
              ) : (
                <div
                  onClick={confirmThisExpense}
                  className="border-2 border-primary hover:shadow-md w-3/4 rounded-md transform hover:-translate-x-1"
                >
                  confirm
                </div>
              )}
            </>
          );
        })}
      </div>
      <div
        onClick={() => setShowModal(true)}
        className="border-2 m-auto my-2 border-gray-400 rounded-md hover:shadow-md transform hover:-translate-x-1 p-2 text-center w-1/2 sm:w-1/6"
      >
        Add Expense
      </div>
    </section>
  );
};

export default Transactions;
