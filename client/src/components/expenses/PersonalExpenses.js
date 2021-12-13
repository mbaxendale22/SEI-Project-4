import React, { useState } from 'react';
import Transactions from '../UI/Transactions';
import AddExpense from './AddExpense';
import { doubleChevDown } from '../../assets/doublechev';

const PersonalExpenses = ({ user, move }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col items-center gap-10 pt-12">
        <div>
          <p>{user?.username}'s Expenses</p>
        </div>
        <div className=" w-full h-3/4 text-xs md:text-sm sm:h-1/3 lg:text-base md:w-10/12 lg:w-3/4 md:h-2/3 border-primary border-2">
          {showModal ? (
            <AddExpense setShowModal={setShowModal} />
          ) : (
            <Transactions setShowModal={setShowModal} user={user} />
          )}
        </div>
        <p>See An Overview of This Month's Expenses</p>
        <span onClick={move} className="transform hover:scale-150">
          {doubleChevDown}
        </span>
      </div>
    </>
  );
};
export default PersonalExpenses;
