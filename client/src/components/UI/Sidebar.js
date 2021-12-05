import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      <nav className="flex flex-col items-center space-y-5 text-white w-full">
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
      <div className="text-center alt-btn mx-4">Sign out</div>
    </>
  );
};

export default Sidebar;
