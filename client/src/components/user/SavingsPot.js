import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { checkBalance, getPotTransactions } from '../../lib/api/SA';
import savingsTransactions from './savingsTransactions';

const SavingsPot = ({ user }) => {
  const [name, setName] = useState('Car');
  const [seeTransactions, setSeeTransactions] = useState(false);
  const { data: balance, isLoading: loadingBalance } = useQuery('balance', () =>
    checkBalance(name)
  );
  const { data: transactions, isLoading: loadingTransactions } = useQuery(
    'savings',
    () => getPotTransactions(name)
  );

  console.log(seeTransactions);

  if (loadingBalance || loadingTransactions) return <p>loading your data...</p>;
  if (seeTransactions)
    return <savingsTransactions setSeeTransactions={setSeeTransactions} />;

  return (
    <div className="border-black border-2 flex flex-col gap-5 items-center">
      {seeTransactions ? (
        <p>Hello</p>
      ) : (
        <>
          <h2 className="text-lg">{transactions[0].name}</h2>
          <p>Current Balance:</p>
          <p>£{balance}</p>
          <form className="flex flex-col items-center gap-2">
            <input
              className="border-b-4 rounded-md border-primary"
              type="text"
              name="name"
              placeholder="Enter amount..."
            ></input>
            <div className="transaction-btn text-center">Deposit</div>
          </form>
          <form className="flex flex-col items-center gap-2">
            <input
              className="border-b-4 rounded-md border-primary"
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
