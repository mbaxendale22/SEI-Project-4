import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { menuIcon } from '../../assets/menuIcon';
import { getUser } from '../../lib/api/PE.js';
import DashboardData from './DashboardData';
import Sidebar from '../UI/Sidebar';
import PersonalExpenses from './PersonalExpenses';
import PersonalIncome from './PersonalIncome';
import PersonalAssets from './PersonalAssets';
import PersonalExpensesData from './PersonalExpensesData';
import PersonalIncomeData from './PersonalIncomeData';

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery('userData', getUser);

  const [navigate, setNavigate] = useState(0);

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p>Sorry, we're experiencing a problem, please try again later</p>;

  const showSideBar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('-translate-x-full');
  };

  const move = () => {
    const page = document.querySelector('.reveal-page');
    page.classList.remove('hide-page');
    page.classList.add('show-page');
    window.scroll({
      top: 950,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="h-screen w-full relative overflow-x-hidden ">
        <div
          onClick={showSideBar}
          className=" cursor-pointer z-10 fixed top-4 right-4 hover:bg-gray-200"
        >
          {menuIcon}
        </div>
        <div className=" sidebar z-10 absolute h-screen rounded-sm bg-primary bg-opacity-85 w-1/3 flex flex-col justify-around transform -translate-x-full transition duration-300 ease-in-out">
          <Sidebar setNavigate={setNavigate} showSideBar={showSideBar} />
        </div>

        <div className=" z-0 main-content h-screen w-full border-black border-2 absolute top-0 transform translate-x-0 transition duration-300 ease-in-out">
          {navigate === 0 && <DashboardData user={data} />}
          {navigate === 1 && <PersonalIncome user={data} move={move} />}
          {navigate === 2 && <PersonalExpenses user={data} move={move} />}
          {navigate === 3 && <PersonalAssets user={data} />}
        </div>
      </div>
      {navigate === 0 && (
        <div className="reveal-page hide-page">
          <PersonalExpensesData />
        </div>
      )}
      {navigate === 1 && (
        <div className="reveal-page hide-page">
          <PersonalIncomeData />
        </div>
      )}
    </>
  );
};

export default Dashboard;
