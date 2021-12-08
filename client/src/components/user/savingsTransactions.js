import React from 'react';

const savingsTransactions = ({ setSeeTransactions }) => {
  return (
    <>
      <p>Hello</p>
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
