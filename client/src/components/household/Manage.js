import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { postHousehold, updateUserHousehold } from '../../lib/api/household';

const Manage = () => {
  const [toggle, setToggle] = useState(false);
  const [houseName, setHouseName] = useState({
    name: '',
  });
  const [id, setId] = useState(null);

  const history = useHistory();

  // create new household and return its primary key for assigning to the user
  const { mutate, data } = useMutation(postHousehold, {
    onSuccess: (data) => {
      setToggle(!toggle);
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
  // toggle showing the create a household form
  const showForm = () => {
    const el = document.querySelector('.show-form');
    el.classList.toggle('opacity-0');
  };

  // const handleConfirmation = () => {
  //   updateUser(id);
  // };

  return (
    <div className="bg-primary h-screen flex flex-col justify-evenly items-center">
      <h2 className="text-white text-3xl">Manage your Household</h2>
      <div className="flex gap-32 justify-center w-3/4 ">
        <div className="flex flex-col gap-10 w-1/3">
          <div onClick={showForm} className="alt-btn text-center ">
            Create a new household
          </div>
          {toggle && data ? (
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
            <div className="show-form h-64 opacity-0 transition duration-500 ease-in-out">
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
        <div className="flex flex-col gap-10 border-black border-2 w-1/3">
          <div className="alt-btn text-center">Join an existing household</div>
        </div>
      </div>
    </div>
  );
};

export default Manage;
