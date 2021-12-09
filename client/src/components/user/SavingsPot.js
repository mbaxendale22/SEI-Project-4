import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { checkBalance, createSavingsPot } from '../../lib/api/SA';

const SavingsPot = ({ user, pot }) => {
  const today = new Date();
  const startDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDay()}`;
  const [seeTransactions, setSeeTransactions] = useState(false);
  const { data: balance, isLoading: loadingBalance } = useQuery(
    ['balance', pot],
    () => checkBalance(pot)
  );

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

  const { mutate, isLoading: savingTransaction } =
    useMutation(createSavingsPot);

  const handleDeposit = () => {
    setDepositButton(true);
    mutate(deposit);
  };
  const handleWithdraw = () => {
    setWithdrawButton(true);
    mutate(withdraw);
  };

  if (loadingBalance) return <p>loading your data...</p>;

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
          </div>

          {/* <div
            onClick={() => setSeeTransactions(true)}
            className="dashboard-btn px-4 text-center"
          >
            See Transactions
          </div> */}
        </>
      )}
    </div>
  );
};

export default SavingsPot;
