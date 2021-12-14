import React from 'react';
import { Link } from 'react-router-dom';
import { email, github, linkedin } from '../../assets/icons';

const LandingPage = () => {
  return (
    <div className="bg-primary bg-opacity-90 flex flex-col justify-evenly items-center h-screen">
      <div className="text-6xl text-white">Household</div>
      <div className="flex w-3/4 justify-around">
        <Link to="/login" className="pr-btn">
          Login
        </Link>
        <Link to="/register" className="pr-btn">
          Sign up
        </Link>
      </div>
      <div className="text-white mx-6 text-lg text-center">
        Handle your household finances with the push of a button
      </div>
      <div className="grid grid-cols-3 grid-rows-3 text-center place-items-center w-1/2">
        <div className=" pb-2 text-center col-span-3">
          Developed by Matthew Baxendale
        </div>
        <div className="hidden sm:block">Check out the Code</div>
        <div className="hidden sm:block">Check out the Developer</div>
        <div className="hidden sm:block">Get in Touch</div>
        <div>
          <a
            href="https://github.com/mbaxendale22/SEI-Project-4"
            target="_blank"
            rel="noreferrer"
          >
            {github}
          </a>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/matthew-baxendale/"
            target="_blank"
            rel="noreferrer"
          >
            {linkedin}
          </a>
        </div>
        <div>
          <a
            href="mailto:mdbaxendale1@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            {email}
          </a>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default LandingPage;
