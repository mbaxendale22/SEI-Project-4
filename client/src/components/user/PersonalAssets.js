import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SavingsPot from './SavingsPot';
import { getPotTransactions, getIndividualPots } from '../../lib/api/SA';
const PersonalAssets = ({ user }) => {
  const [savings, setSavings] = useState();
  const { data: transactions, isLoading: loadingTransactions } = useQuery(
    'savings',
    getPotTransactions
  );
  const [render, setRender] = useState(true);

  if (loadingTransactions) return <p>loading your savings...</p>;
  const names = transactions?.map((el) => el.name);
  const pots = new Set(names);
  const [pots1, pots2, pots3] = pots;
  const pot1 = transactions.filter((x) => x.name === pots1);
  const pot2 = transactions.filter((x) => x.name === pots2);
  const pot3 = transactions.filter((x) => x.name === pots3);

  return (
    <div className="h-screen w-full flex flex-col gap-20 items-center justify-center">
      <h2 className="text-center text-2xl">{user.username}'s savings</h2>
      <div className="grid w-full sm:w-3/4 h-1/2 grid-cols-1 overflow-x-scroll md:grid-cols-3 border-b-2 border-t-2 border-primary rounded-2xl">
        <SavingsPot pot={pots1} user={user} setRender={setRender} />
        <SavingsPot pot={pots2} user={user} setRender={setRender} />
        <SavingsPot pot={pots3} user={user} setRender={setRender} />
      </div>
    </div>
  );
};

export default PersonalAssets;
