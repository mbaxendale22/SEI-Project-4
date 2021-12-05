import React from 'react';
import { useQuery } from 'react-query';
import { menuIcon } from '../../assets/menuIcon';
import { getUser } from '../../lib/api';
import Sidebar from '../UI/Sidebar';

const Dashboard = () => {
  // const { data, isError, isLoading } = useQuery('userData', getUser);
  // console.log(data);

  // if (isLoading) return <p>Loading...</p>;
  // if (isError)
  //   return <p>Sorry, we're experiencing a problem, please try again later</p>;

  return (
    <div className="h-screen">
      <div className="fixed border-2 border-primary top-2 right-2">
        {menuIcon}
      </div>
      <div className="h-screen bg-primary w-1/3 flex flex-col justify-around">
        <Sidebar />
      </div>

      <div>Main Content</div>
    </div>
  );
};

export default Dashboard;
