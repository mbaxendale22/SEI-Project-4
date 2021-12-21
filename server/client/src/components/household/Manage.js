import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, Link } from 'react-router-dom';
import {
  removeUserHousehold,
  postHousehold,
  updateUserHousehold,
} from '../../lib/api/household';

const Manage = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('userData');
  const householdClient = useQueryClient();
  const history = useHistory();
  const [createToggle, setCreateToggle] = useState(false);
  const [successToggle, setSuccessToggle] = useState(false);
  const [joinToggle, setJoinToggle] = useState(false);
  const [houseName, setHouseName] = useState({
    name: '',
  });

  const [id, setId] = useState(null);

  //removing a user from a household
  const { mutate: removeHousehold } = useMutation(removeUserHousehold);

  //************ Functions for handling the create new household form *************//

  // create new household and return its primary key for assigning to the user
  const { mutate, data } = useMutation(postHousehold, {
    onSuccess: (data) => {
      setCreateToggle(true);
      setId({ household: data.id });
    },
  });

  // update the user with newly created household primary key
  const { mutate: updateUser } = useMutation(() => updateUserHousehold(id), {
    onSuccess: () =>
      householdClient.invalidateQueries(['householdInfo', user.id]),
  });

  // handle the submission of creating a household form
  const createHousehold = (e) => {
    e.preventDefault();
    mutate(houseName);
  };

  const confirmCreateHousehold = () => {
    updateUser(id);
    setSuccessToggle(true);
    householdClient.invalidateQueries(['householdInfo'], user.id);
  };

  // watch for changes in the create a household form
  const changeName = (e) => {
    const newHouseName = { ...houseName, [e.target.name]: e.target.value };
    setHouseName(newHouseName);
  };

  // Toggle showing the create a household form
  const showCreateForm = () => {
    const el = document.querySelector('.show-create-form');
    el.classList.toggle('opacity-0');
  };

  //********* functions for the join/update household form *********//

  const [newHousehold, setNewHousehold] = useState({
    household: '',
  });

  const { mutate: joinHoushold } = useMutation(updateUserHousehold, {
    onSuccess: () => {
      setJoinToggle(true);
      queryClient.invalidateQueries(['userData']);
    },
  });

  //handle the submission of updating/joining a household form
  const joinNewHousehold = (e) => {
    e.preventDefault();
    joinHoushold(newHousehold);
  };

  // watch for changes in the update/join a household form
  const changeHousehold = (e) => {
    const changeId = { ...newHousehold, [e.target.name]: e.target.value };
    setNewHousehold(changeId);
  };

  //toggle showing the update/join household form
  const showJoinForm = () => {
    const el = document.querySelector('.show-join-form');
    el.classList.toggle('opacity-0');
  };

  return (
    <div className="bg-primary h-screen flex flex-col justify-evenly items-center">
      <h2 className="text-white text-xl sm:text-3xl">Manage your Household</h2>
      <div onClick={() => history.push('/dashboard')} className="alt-btn">
        Back to Dashboard
      </div>
      <div
        className="text-xs sm:text-base alt-btn"
        onClick={() => removeHousehold()}
      >
        Leave Current Household
      </div>
      <div className="flex gap-4 sm:gap-32 justify-center w-full sm:w-3/4 h-1/2 text-xs sm:text-base">
        {!successToggle ? (
          <div className="flex flex-col gap-10 w-2/5 sm:w-1/3">
            <div onClick={showCreateForm} className="alt-btn text-center ">
              Create a household
            </div>
            {createToggle ? (
              <div className="h-64">
                <div className="text-center text-lg">
                  Confirm new household?
                </div>
                <div
                  onClick={confirmCreateHousehold}
                  className="alt-btn mt-8 text-center"
                >
                  Confirm
                </div>
              </div>
            ) : (
              <div className="show-create-form h-1/3 sm:h-64 opacity-0 transition duration-500 ease-in-out">
                <p className=" text-xs sm:text-lg">
                  All you have to do is pick a name:
                </p>
                <form
                  className="flex flex-col mt-5 gap-10"
                  onSubmit={createHousehold}
                >
                  <input
                    onChange={changeName}
                    type="text"
                    name="name"
                    placeholder="My household..."
                    className=" rounded-md mt-3 p-1 bg-primary border-b-2 focus:outline-none placeholder-white"
                  ></input>
                  <button className="alt-btn">Create</button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="h-64">
            <div className="text-center text-lg">Success!</div>
            <Link to="/dashboard">
              <div className="alt-btn mt-8 text-center">Back to Dashboard</div>
            </Link>
          </div>
        )}
        <div className="flex w-2/5 sm:w-1/3 flex-col gap-10">
          <div onClick={showJoinForm} className="alt-btn text-center ">
            Join a household
          </div>
          {joinToggle ? (
            <div className="h-64">
              <div className="text-center text-lg">Success!</div>
              <Link to="/dashboard">
                <div className="alt-btn mt-8 text-center">
                  Back to Dashboard
                </div>
              </Link>
            </div>
          ) : (
            <div className="show-join-form h-1/3 sm:h-64 opacity-0 transition duration-500 ease-in-out">
              <p className=" text-xs sm:text-lg text-center">
                Enter the unique{' '}
                <span className="text-white">household ID</span> of the
                household you'd like to join
              </p>
              <form
                className="flex flex-col mt-5 gap-10"
                onSubmit={joinNewHousehold}
              >
                <input
                  onChange={changeHousehold}
                  type="text"
                  name="household"
                  placeholder="Household ID..."
                  className=" rounded-md mt-3 p-1 bg-primary border-b-2 focus:outline-none placeholder-white"
                ></input>
                <button className="alt-btn">Join</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manage;
