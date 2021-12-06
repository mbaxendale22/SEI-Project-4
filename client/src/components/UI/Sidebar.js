import React from 'react';
import { Link } from 'react-router-dom';
import { RemoveTokenFromLocalStorage } from '../../helpers/auth';

const Sidebar = () => {
  const handleSignOut = () => RemoveTokenFromLocalStorage();

  return (
    <>
      <nav className="z-20 flex flex-col items-center space-y-5 text-white w-full">
        <Link className="hover:bg-red-300 w-full p-2 text-center">
          Dashboard
        </Link>
        <Link className="hover:bg-red-300 w-full p-2 text-center">Income</Link>
        <Link className="hover:bg-red-300 w-full p-2 text-center">
          Expenses
        </Link>
        <Link className="hover:bg-red-300 w-full p-2 text-center">Assets</Link>
        <Link className="hover:bg-red-300 w-full p-2 text-center">
          Household
        </Link>
      </nav>
      <Link
        to="/"
        onClick={handleSignOut}
        className="text-center alt-btn mx-4 cursor-pointer transform hover:-translate-y-1"
      >
        Sign out
      </Link>
    </>
  );
};

export default Sidebar;
