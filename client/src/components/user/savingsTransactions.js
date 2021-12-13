import React from 'react';

const savingsTransactions = ({ setSeeTransactions }) => {
  return (
    <>
      <div
        onClick={() => setSeeTransactions(false)}
        className="dashboard-btn px-4 text-center"
      >
        Back
      </div>
    </>
  );
};

export default savingsTransactions;
