import { set } from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { checkBalance, createSavingsPot, deletePot } from '../../lib/api/SA';
import CreatePot from './CreatePot';

const SavingsPot = ({ user, pot, setRender }) => {
  const today = new Date();
  const startDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const { data: balance, isLoading: loadingBalance } = useQuery(
    ['balance', pot],
    () => checkBalance(pot)
  );
  const queryClient = useQueryClient(['savings']);
  const balanceClient = useQueryClient(['balance', pot]);
  const [deposit, setDeposit] = useState({
    name: pot,
    amount: 0,
    date: startDate,
    user: user.id,
  });
  const [withdraw, setWithdraw] = useState({
    name: pot,
    amount: 0,
    date: startDate,
    user: user.id,
  });

  const [depositButton, setDepositButton] = useState(true);
  const [withdrawButton, setWithdrawButton] = useState(true);

  const watchDeposit = (e) => {
    const newDeposit = {
      ...deposit,
      [e.target.name]: parseInt(e.target.value),
    };
    setDeposit(newDeposit);
  };
  const watchWithdraw = (e) => {
    const newWithdraw = {
      ...withdraw,
      [e.target.name]: -Math.abs(parseInt(e.target.value)),
    };
    setWithdraw(newWithdraw);
  };

  const { mutate, isLoading: savingTransaction } = useMutation(
    createSavingsPot,
    {
      onSuccess: () => {
        // queryClient.invalidateQueries('savings');
        balanceClient.invalidateQueries('balance', pot);
        // deposit['amount'] = 0;
      },
    }
  );

  const handleDeposit = () => {
    setDepositButton(true);
    mutate(deposit);
    setRender();
    const x = document.querySelector('.deposit');
    x.value = '';
  };
  const handleWithdraw = () => {
    setWithdrawButton(true);
    mutate(withdraw);
    const x = document.querySelector('.withdraw');
    x.value = '';
  };

  const { mutate: deleteCurrentPot } = useMutation(deletePot, {
    onSuccess: () => queryClient.invalidateQueries('savings'),
  });

  const handleDelete = (value) => {
    deleteCurrentPot(pot);
    setRender();
  };

  if (!pot) return <CreatePot startDate={startDate} user={user} />;
  if (loadingBalance) return <p>loading your savings pot...</p>;

  return (
    <div className="flex flex-col gap-3 items-center">
      <>
        <h2 className="text-lg">{pot}</h2>
        <p>Current Balance:</p>
        <p>£{balance}</p>
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
