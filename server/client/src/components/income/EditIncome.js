import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateIncome } from '../../lib/api/PI.js';

const EditIncome = ({ setEditing, item }) => {
  const queryClient = useQueryClient();
  //access the userdata from the cache
  const user = queryClient.getQueryData(['userData']);

  const [income, setIncome] = useState({
    name: item.name,
    category: item.category,
    amount: item.amount,
    date: item.date,
    user: user.id,
  });

  const { mutate } = useMutation(() => updateIncome(item.id, income), {
    onSuccess: () => {
      queryClient.invalidateQueries('income');
      queryClient.invalidateQueries('incomeCategories');
      queryClient.invalidateQueries('largestIncome');
      queryClient.invalidateQueries('total');
      setEditing(false);
    },
  });

  const handleChange = (e) => {
    const newIncome = { ...income, [e.target.name]: e.target.value };
    setIncome(newIncome);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(income);
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
          <option value="Paycheck">Paycheck</option>
          <option value="Selling">Selling</option>
          <option value="Passive">Passive</option>
          <option value="Misc">Misc</option>
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
        <div className="flex items-center justify-around">
          <button className="transaction-btn w-1/4 text-center">Save</button>
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

export default EditIncome;
