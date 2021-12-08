import React from 'react';
import { useHistory } from 'react-router-dom';
import { RemoveTokenFromLocalStorage } from '../../helpers/auth';

const Sidebar = ({ setNavigate, showSideBar }) => {
  const history = useHistory();
  const handleSignOut = () => {
    RemoveTokenFromLocalStorage();
    history.push('/');
  };
  const handleClick = (nav) => {
    setNavigate(nav);
    showSideBar();
  };

  return (
    <>
      <nav className="z-20 flex flex-col items-center space-y-5 text-white w-full">
        <div
          onClick={() => handleClick(0)}
          className="hover:bg-red-300 w-full p-2 text-center"
        >
          Dashboard
        </div>
        <div
          onClick={() => handleClick(1)}
          className="hover:bg-red-300 w-full p-2 text-center"
        >
          Income
        </div>
        <div
          onClick={() => handleClick(2)}
          className="hover:bg-red-300 w-full p-2 text-center"
        >
          Expenses
        </div>
        <div
          onClick={() => handleClick(3)}
          className="hover:bg-red-300 w-full p-2 text-center"
        >
          Assets
        </div>
        <div
          onClick={() => handleClick(4)}
          className="hover:bg-red-300 w-full p-2 text-center"
        >
          Household
        </div>
      </nav>
      <div
        onClick={handleSignOut}
        className="text-center alt-btn mx-4 cursor-pointer transform hover:-translate-y-1"
      >
        Sign out
      </div>
    </>
  );
};

export default Sidebar;
