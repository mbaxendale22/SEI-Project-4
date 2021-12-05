import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postLogin } from '../../lib/api';

const Login = () => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const { mutate } = useMutation(postLogin, {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(login);
  };

  const handleChange = (e) => {
    const newLogin = { ...login, [e.target.name]: e.target.value };
    setLogin(newLogin);
  };

  return (
    <div className="bg-primary bg-opacity-90 h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" border-r-2 border-t-2 border-white shadow-md h-3/6 w-7/12 flex items-center justify-evenly flex-col"
      >
        <div className="w-3/4 flex flex-col">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="email..."
            className=" rounded-md mt-3 p-1"
          ></input>
        </div>
        <div className="w-3/4 flex flex-col">
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password..."
            className="rounded-md mt-3 p-1"
          ></input>
        </div>
        <button className="pr-btn bg-opacity-95 w-3/4 ">Sign In</button>
      </form>
      <div className="mt-8 w-full flex flex-col items-center">
        <p className="text-white">Not signed up?</p>
        <Link to="/register" className="pr-btn bg-opacity-95 w-1/4 mt-4">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
