import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateExpense, updateSharedExpense } from '../../lib/api/PE.js';

const EditExpense = ({ setEditing, item }) => {
  const queryClient = useQueryClient();
  //access the userdata from the cache
  const user = queryClient.getQueryData(['userData']);

  const [expense, setExpense] = useState({
    name: item.name,
    category: item.category,
    amount: item.amount,
    date: item.date,
    share: item.share,
    resolved: item.resolved,
    household: user.household,
    owner: user.id,
    creator: user.id,
  });

  const resolve = {
    name: item.name,
    category: item.category,
    amount: parseFloat(item.amount),
    date: item.date,
    share: item.share,
    resolved: true,
    household: user.household,
    owner: user.id,
    creator: user.id,
  };

  const { mutate: notShared } = useMutation(
    () => updateExpense(item.id, expense),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('recent');
        queryClient.invalidateQueries('largest');
        setEditing(false);
      },
    }
  );
  const { mutate: shared } = useMutation(
    () => updateSharedExpense(item.id, expense),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('recent');
        queryClient.invalidateQueries('largest');
        setEditing(false);
      },
    }
  );

  const { mutate: resolveExpense } = useMutation(
    () => updateSharedExpense(item.id, resolve),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('recent');
        queryClient.invalidateQueries('largest');
        setEditing(false);
      },
    }
  );

  const handleChange = (e) => {
    let newExpense = {};
    if (e.target.name === 'amount') {
      newExpense = {
        ...expense,
        [e.target.name]: parseFloat(e.target.value),
      };
      setExpense(newExpense);
    } else {
      let newExpense = { ...expense, [e.target.name]: e.target.value };
      setExpense(newExpense);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    expense.share === false ? notShared(expense) : shared(expense);
  };

  return (
    <div className="h-full flex flex-col gap-10 items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 mt-10 w-2/3">
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder={item.name}
          className="border-primary border-b-2 focus:outline-none"
        ></input>
        <select
          onChange={handleChange}
          type="text"
          name="category"
          placeholder="category"
          className="border-primary border-b-2 focus:outline-none"
        >
          <option>{item.category}</option>
          <option value="bills">Bills</option>
          <option value="dining">Eating Out</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="grocery">Grocery</option>
          <option value="retail">Retail</option>
          <option value="transport">Transport</option>
          <option value="travel">Travel & Leisure</option>
        </select>
        <input
          onChange={handleChange}
          type="text"
          name="amount"
          placeholder={item.amount}
          className="border-primary border-b-2 focus:outline-none"
        ></input>
        <input
          onChange={handleChange}
          type="date"
          name="date"
          value={item.date}
          className="border-primary border-b-2 focus:outline-none"
        ></input>
        <div className="flex items-center justify-around my-4">
          <button className="transaction-btn w-1/4 text-center">Save</button>
          <div
            onClick={() => resolveExpense(resolve)}
            className="md:border-2 md:border-green-400 text-green-400 px-4 py-2 rounded-md transform hover:-translate-x-1 hover:-translate-y-1 duration-300 ease-in-out"
          >
            Resolve This Expense
          </div>
          <div
            className="transaction-btn w-1/4 text-center"
            onClick={() => setEditing(false)}
          >
            Go Back
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
