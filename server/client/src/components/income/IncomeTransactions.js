import React, { useState } from 'react';
import { getIncome } from '../../lib/api/PI.js';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { reverseDate } from '../../helpers/rendering';
import { deleteIncome } from '../../lib/api/PI';
import EditIncome from './EditIncome.js';

const IncomeTransactions = ({ setShowModal }) => {
  const queryClient = useQueryClient();
  const {
    data: recent,
    isError: errors,
    isLoading: loading,
  } = useQuery('income', getIncome);

  const { mutate } = useMutation(
    (id) => {
      return deleteIncome(id);
    },
    {
      onSuccess: () => queryClient.invalidateQueries('income'),
    }
  );

  const [editing, setEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  if (loading) return <p>loading...</p>;
  if (errors) return <p>Something has gone wrong please try again later</p>;
  if (editing) return <EditIncome setEditing={setEditing} item={currentItem} />;
  return (
    <section className="h-full flex flex-col justify-evenly">
      <h2 className="text-center py-3">Recent Income</h2>
      <div className="grid grid-cols-1 gap-1 justify-items-center sm:grid-cols-6 h-48 sm:max-h-64 sm:h-full overflow-x-scroll sm:gap-2 text-center border-2 border-b">
        {recent.map((item) => {
          return (
            <>
              <div key={recent.id}>{reverseDate(item.date)}</div>
              <div>{item.name}</div>
              <div>
                {item.category === 'entertainment' ? <p>ent</p> : item.category}
              </div>
              <div>£{item.amount}</div>
              <div
                onClick={() => {
                  setCurrentItem(item);
                  setEditing(true);
                }}
                className="border-2 border-gray-400 hover:shadow-md w-1/4 sm:w-3/4 rounded-md transform hover:-translate-x-1"
              >
                edit
              </div>
              <div
                onClick={() => mutate(item.id)}
                className="border-2 border-gray-400 hover:shadow-md w-1/4 sm:w-3/4 rounded-md transform hover:-translate-x-1"
              >
                delete
              </div>
              <hr className="border-t-2 border-dotted w-3/4 border-primary rounded-3xl my-4 sm:hidden" />
            </>
          );
        })}
      </div>
      <div
        onClick={() => setShowModal(true)}
        className="border-2 m-auto my-2 border-gray-400 rounded-md hover:shadow-md transform hover:-translate-x-1 p-2 text-center w-3/4 sm:w-1/6"
      >
        Add Income
      </div>
    </section>
  );
};

export default IncomeTransactions;
