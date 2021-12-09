import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { postRegister } from '../../lib/api/PE';

const Register = () => {
  const history = useHistory();

  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { mutate, isError } = useMutation(postRegister, {
    onSuccess: () => history.push('/login'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(register);
  };

  const handleChange = (e) => {
    const newRegister = { ...register, [e.target.name]: e.target.value };
    setRegister(newRegister);
    console.log(newRegister);
  };

  return (
    <div className="bg-primary bg-opacity-100 h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" border-r-2 border-t-2 border-white shadow-md h-4/6 w-7/12 flex items-center justify-evenly flex-col"
      >
        <div className="w-3/4 flex flex-col">
          <label htmlFor="username" className="">
            Username
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="username..."
            className="rounded-md mt-3 p-1 bg-primary border-b-2 focus:outline-none placeholder-white"
          ></input>
        </div>
        <div className="w-3/4 flex flex-col">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="email..."
            className=" rounded-md mt-3 p-1 bg-primary border-b-2 focus:outline-none placeholder-white"
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
            className="rrounded-md mt-3 p-1 bg-primary border-b-2 focus:outline-none placeholder-white"
          ></input>
        </div>
        <div className="w-3/4 flex flex-col">
          <label htmlFor="passwordConfirmation" className="">
            Confirm Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password_confirmation"
            placeholder="confirm password..."
            className="rounded-md mt-3 p-1 bg-primary border-b-2 focus:outline-none placeholder-white"
          ></input>
        </div>
        <button className="pr-btn bg-opacity-95 w-3/4 ">Sign Up</button>
        {isError && (
          <div className="pr-btn bg-opacity-95 w-3/4 bg-red-700 text-white">
            Check your passwords match
          </div>
        )}
      </form>
      <div className="mt-8 w-full flex flex-col gap-3 items-center">
        <p className="text-black">Already signed up?</p>
        <Link to="/login" className="alt-btn">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
