import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, Link } from 'react-router-dom';
import { postHousehold, updateUserHousehold } from '../../lib/api/household';

const Manage = () => {
  const queryClient = useQueryClient();

  const history = useHistory();
  const [createToggle, setCreateToggle] = useState(false);
  const [joinToggle, setJoinToggle] = useState(false);
  const [houseName, setHouseName] = useState({
    name: '',
  });

  const [id, setId] = useState(null);

  //************ Functions for handling the create new household form *************//

  // create new household and return its primary key for assigning to the user
  const { mutate, data } = useMutation(postHousehold, {
    onSuccess: (data) => {
      setCreateToggle(true);
      setId({ household: data.id });
    },
  });
  // update the user with newly created household primary key
  const { mutate: updateUser } = useMutation(() => updateUserHousehold(id));

  // handle the submission of creating a household form
  const createHousehold = (e) => {
    e.preventDefault();
    mutate(houseName);
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
      <h2 className="text-white text-3xl">Manage your Household</h2>
      <div onClick={() => history.push('/dashboard')} className="alt-btn">
        Back to Dashboard
      </div>
      <div className="flex gap-32 justify-center w-3/4 ">
        <div className="flex flex-col gap-10 w-1/3">
          <div onClick={showCreateForm} className="alt-btn text-center ">
            Create a new household
          </div>
          {createToggle ? (
            <div className="h-64">
              <div className="text-center text-lg">Confirm new household?</div>
              <div
                onClick={() => updateUser(id)}
                className="alt-btn mt-8 text-center"
              >
                Confirm
              </div>
            </div>
          ) : (
            <div className="show-create-form h-64 opacity-0 transition duration-500 ease-in-out">
              <p className="text-lg">All you have to do is pick a name:</p>
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
        <div className="flex flex-col gap-10 w-1/3">
          <div onClick={showJoinForm} className="alt-btn text-center ">
            Join a household or update yours
          </div>
          {joinToggle ? (
            <div className="h-64">
              <div className="text-center text-lg">Success!</div>
              <Link to="/dashboard">
                <div className="alt-btn mt-8 text-center">
                  back to Dashboard
                </div>
              </Link>
            </div>
          ) : (
            <div className="show-join-form h-64 opacity-0 transition duration-500 ease-in-out">
              <p className="text-lg text-center">
                Enter the unique{' '}
                <span className="text-white">household ID</span> of the
                household you'd like to join or change to
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
