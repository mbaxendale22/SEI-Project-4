import React from 'react';
import { useQuery } from 'react-query';
import SavingsPot from './SavingsPot';
const PersonalAssets = ({ user }) => {
  return (
    <div className="h-screen w-full flex flex-col justify-center">
      <h2 className="text-center">{user.username}'s savings</h2>
      <div className="dashboard-btn">Create a New Savings Pot</div>
      <div className="flex">
        <SavingsPot />
      </div>
    </div>
  );
};

export default PersonalAssets;
