import { set } from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { checkBalance, createSavingsPot, deletePot } from '../../lib/api/SA';
import CreatePot from './CreatePot';

const SavingsPot = ({ user, pot, setRender }) => {
  const today = new Date();
  const startDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDay()}`;
  const [seeTransactions, setSeeTransactions] = useState(false);
  const { data: balance, isLoading: loadingBalance } = useQuery(
    ['balance', pot],
    () => checkBalance(pot)
  );
  const queryClient = useQueryClient(['balance', pot]);
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
        queryClient.invalidateQueries('balance', pot);
        return setRender((render) => !render);
      },
    }
  );

  const handleDeposit = () => {
    setDepositButton(true);
    mutate(deposit);
  };
  const handleWithdraw = () => {
    setWithdrawButton(true);
    mutate(withdraw);
  };

  const { mutate: deleteCurrentPot } = useMutation(deletePot);

  if (!pot)
    return (
      <CreatePot setRender={setRender} startDate={startDate} user={user} />
    );
  if (loadingBalance) return <p>loading your savings pot...</p>;

  return (
    <div className="flex flex-col gap-5 items-center">
      {seeTransactions ? (
        <>
          <p>Hello</p>
          <div
            onClick={() => setSeeTransactions(false)}
            className="dashboard-btn px-4 text-center"
          >
            Back
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg">{pot}</h2>
          <p>Current Balance:</p>
          <p>£{balance}</p>
          <div className="flex flex-col items-center gap-2">
            <input
              onChange={watchDeposit}
              className="border-b-4 rounded-md border-primary focus:outline-none"
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
          <div className="flex flex-col items-center gap-2">
            <input
              onChange={watchWithdraw}
              className="border-b-4 rounded-md border-primary focus:outline-none"
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
              onClick={() => deleteCurrentPot(pot)}
              className="dashboard-btn px-4 mt-4"
            >
              delete pot
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SavingsPot;
