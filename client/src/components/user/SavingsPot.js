import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { checkBalance, getPotTransactions } from '../../lib/api/SA';
import { getIndividualPots } from '../../lib/api/SA';
import savingsTransactions from './savingsTransactions';

const SavingsPot = ({ user, pot }) => {
  const today = new Date();
  const startDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDay()}`;
  const [seeTransactions, setSeeTransactions] = useState(false);
  const { data: balance, isLoading: loadingBalance } = useQuery('balance', () =>
    checkBalance(pot)
  );
  // console.log(pots[index]);
  // const { data: pot, isLoading: loadingPot } = useQuery('savings', () =>
  //   getIndividualPots(pots[index])
  // );

  const watchDeposit = (e) => {
    const newDeposit = { ...deposit, [e.target.name]: e.target.value };
    setDeposit(newDeposit);
  };
  const watchWithdraw = (e) => {
    const newWithdraw = { ...withdraw, [e.target.name]: e.target.value };
    setWithdraw(newWithdraw);
    console.log();
  };

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

  if (loadingBalance) return <p>loading your data...</p>;

  return (
    <div className="border-black border-2 flex flex-col gap-5 items-center">
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
          <form className="flex flex-col items-center gap-2">
            <input
              onClick={watchDeposit}
              className="border-b-4 rounded-md border-primary focus:outline-none"
              type="text"
              name="name"
              placeholder="Enter amount..."
            ></input>
            <div className="transaction-btn text-center">Deposit</div>
          </form>
          <form className="flex flex-col items-center gap-2">
            <input
              onClick={watchWithdraw}
              className="border-b-4 rounded-md border-primary focus:outline-none"
              type="text"
              name="name"
              placeholder="Enter amount..."
            ></input>
            <div className="transaction-btn text-center">Withdraw</div>
          </form>
          <div
            onClick={() => setSeeTransactions(true)}
            className="dashboard-btn px-4 text-center"
          >
            See Transactions
          </div>
        </>
      )}
    </div>
  );
};

export default SavingsPot;
