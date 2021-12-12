import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SavingsPot from './SavingsPot';
import CreatePot from './CreatePot';
import { getPotTransactions, getIndividualPots } from '../../lib/api/SA';
const PersonalAssets = ({ user }) => {
  const today = new Date();
  const startDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const [savings, setSavings] = useState();
  const { data: transactions, isLoading: loadingTransactions } = useQuery(
    'savings',
    getPotTransactions
  );
  const [render, setRender] = useState(true);

  // if (loadingTransactions) return <p>loading your savings...</p>;
  const names = transactions?.map((el) => [el.name, el.id]);
  const pots = new Set(names);
  const [pots1, pots2, pots3] = pots;

  return (
    <div className="h-screen w-full flex flex-col gap-20 items-center justify-center">
      <h2 className="text-center text-2xl">{user.username}'s savings</h2>
      <div className="grid w-full sm:w-3/4 h-1/2 grid-cols-1 overflow-x-scroll md:grid-cols-3 border-b-2 border-t-2 border-primary rounded-2xl">
        {pots1 ? (
          <SavingsPot pot={pots1} user={user} setRender={setRender} />
        ) : (
          <CreatePot startDate={startDate} user={user} />
        )}
        {pots2 ? (
          <SavingsPot pot={pots2} user={user} setRender={setRender} />
        ) : (
          <CreatePot startDate={startDate} user={user} />
        )}
        {pots3 ? (
          <SavingsPot pot={pots3} user={user} setRender={setRender} />
        ) : (
          <CreatePot startDate={startDate} user={user} />
        )}
      </div>
    </div>
  );
};

export default PersonalAssets;
