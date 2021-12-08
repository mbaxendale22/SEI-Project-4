import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postExpenses, postSharedExpenses } from '../../lib/api/PE.js';

const AddExpense = ({ setShowModal }) => {
  const queryClient = useQueryClient();
  //access the userdata from the cache
  const user = queryClient.getQueryData(['userData']);

  const [expense, setExpense] = useState({
    name: '',
    category: '',
    amount: '',
    date: '',
    share: 'false',
    resolved: 'false',
    household: user.household,
    owner: user.id,
    creator: user.id,
  });

  const { mutate: notShared } = useMutation(postExpenses, {
    onSuccess: () => {
      queryClient.invalidateQueries('recent');
      setShowModal(false);
    },
  });

  const { mutate: shared } = useMutation(postSharedExpenses, {
    onSuccess: () => {
      queryClient.invalidateQueries('recent');
      setShowModal(false);
    },
  });

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
          placeholder="name"
          className="border-primary border-b-2 focus:outline-none"
        ></input>
        <select
          onChange={handleChange}
          type="text"
          name="category"
          placeholder="category"
          className="border-primary border-b-2 focus:outline-none"
        >
          <option>choose category</option>
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
          placeholder="amount"
          className="border-primary border-b-2 focus:outline-none"
        ></input>
        <input
          onChange={handleChange}
          type="date"
          name="date"
          placeholder="date"
          className="border-primary border-b-2 focus:outline-none"
        ></input>
        <div className="flex items-center justify-between">
          <p>Share with household?</p>
          <label htmlFor="true">Yes</label>
          <input
            onChange={handleChange}
            type="radio"
            value="true"
            name="share"
          ></input>
          <label htmlFor="no">No</label>
          <input
            onChange={handleChange}
            type="radio"
            value="false"
            name="share"
          ></input>
        </div>
        <div className="flex items-center justify-around">
          <button className="transaction-btn w-1/4 text-center">Save</button>
          <div
            className="transaction-btn w-1/4 text-center"
            onClick={() => setShowModal(false)}
          >
            Go Back
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
