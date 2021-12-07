import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postLogin } from '../../lib/api/PE';

const Login = () => {
  const history = useHistory();

  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const { mutate } = useMutation(postLogin, {
    onSuccess: () => {
      history.push('/dashboard');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(login);
  };

  const handleChange = (e) => {
    const newLogin = { ...login, [e.target.name]: e.target.value };
    setLogin(newLogin);
  };

  return (
    <div className="bg-primary bg-opacity-100 h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" border-r-2 border-t-2 border-white shadow-md h-3/6 w-7/12 flex items-center justify-evenly flex-col"
      >
        <div className="w-3/4 flex flex-col">
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="email..."
            className=" rounded-md mt-3 p-1 bg-primary border-b-2 focus:outline-none placeholder-white"
          ></input>
        </div>
        <div className="w-3/4 flex flex-col">
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password..."
            className="rounded-md mt-3 p-1 bg-primary border-b-2 focus:outline-none placeholder-white"
          ></input>
        </div>
        <button className="pr-btn bg-opacity-95 w-3/4 ">Sign In</button>
      </form>
      <div className="mt-8 w-full flex flex-col items-center space-y-3">
        <p className="text-white">Not signed up?</p>
        <Link to="/register" className="alt-btn">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
