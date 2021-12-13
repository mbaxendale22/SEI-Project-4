import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  makeDeposit,
  makeWithdrawl,
  deletePot,
  getPot,
} from '../../lib/api/SA';

const SavingsPot = ({ user, pot, setRender }) => {
  const today = new Date();
  const startDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const queryClient = useQueryClient(['savings']);

  const { data: balance, isLoading: loadingBalance } = useQuery(
    ['balance', pot[1]],
    () => getPot(pot[1])
  );

  const balanceClient = useQueryClient(['balance', pot[1]]);

  const [deposit, setDeposit] = useState({
    name: pot[0],
    amount: 0,
    date: startDate,
    user: user.id,
  });

  const [depositButton, setDepositButton] = useState(true);
  const [withdrawButton, setWithdrawButton] = useState(true);

  const { mutate: updateDeposit } = useMutation(makeDeposit, {
    onMutate: () => {
      const newPositiveBalance = deposit.amount + balance.amount;
      const data = {
        id: pot[1],
        name: pot[0],
        amount: newPositiveBalance,
        date: startDate,
        user: user.id,
      };
      balanceClient.setQueryData(['balance', pot[1]], data);
    },
  });
  const { mutate: updateWithdraw } = useMutation(makeWithdrawl, {
    onMutate: () => {
      const newNegativeBalance = balance.amount - deposit.amount;
      console.log(newNegativeBalance);
      const data = {
        id: pot[1],
        name: pot[0],
        amount: newNegativeBalance,
        date: startDate,
        user: user.id,
      };
      balanceClient.setQueryData(['balance', pot[1]], data);
    },
  });
  const watchDeposit = (e) => {
    const newDeposit = {
      ...deposit,
      [e.target.name]: parseInt(e.target.value),
    };
    setDeposit(newDeposit);
  };
  const watchWithdraw = (e) => {
    const newWithdraw = {
      ...deposit,
      [e.target.name]: parseInt(e.target.value),
    };
    setDeposit(newWithdraw);
  };

  const handleDeposit = () => {
    setDepositButton(true);
    updateDeposit({ id: pot[1], pot: deposit });
    setRender();
    const x = document.querySelector('.deposit');
    x.value = '';
  };
  const handleWithdraw = () => {
    setWithdrawButton(true);
    updateWithdraw({ id: pot[1], pot: deposit });
    const x = document.querySelector('.withdraw');
    x.value = '';
  };

  const { mutate: deleteCurrentPot } = useMutation(deletePot, {
    onSuccess: () => queryClient.invalidateQueries('savings'),
  });

  const handleDelete = (value) => {
    deleteCurrentPot(pot[1]);
    setRender();
  };

  if (loadingBalance) return <p>loading your savings pot...</p>;
  const newBalance = balanceClient.getQueryData(['balance', pot[1]]);

  return (
    <div className="flex flex-col gap-3 items-center">
      <>
        <h2 className="text-lg">{pot[0]}</h2>
        <p>Current Balance:</p>
        <p>{newBalance.amount}</p>
        <div className="flex flex-col items-center gap-2">
          <input
            onChange={watchDeposit}
            className=" deposit border-b-4 rounded-md border-primary focus:outline-none"
            type="text"
            name="amount"
            placeholder="Enter amount..."
          ></input>
          {depositButton ? (
            <div
              onClick={() => setDepositButton(false)}
              className="transaction-btn text-center"
            >
              Deposit
            </div>
          ) : (
            <div
              onClick={handleDeposit}
              className="transaction-btn text-green-300 border-green-300 font-bold text-center"
            >
              Confirm
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-3">
          <input
            onChange={watchWithdraw}
            className="withdraw border-b-4 rounded-md border-primary focus:outline-none"
            type="text"
            name="amount"
            placeholder="Enter amount..."
          ></input>
          {withdrawButton ? (
            <div
              onClick={() => setWithdrawButton(false)}
              className="transaction-btn text-center"
            >
              Withdraw
            </div>
          ) : (
            <div
              onClick={handleWithdraw}
              className="transaction-btn text-red-400 border-red-400 font-bold  text-center"
            >
              Confirm
            </div>
          )}
          <div
            onClick={() => handleDelete(false)}
            className="dashboard-btn px-4 mt-4"
          >
            delete pot
          </div>
        </div>
      </>
    </div>
  );
};

export default SavingsPot;
