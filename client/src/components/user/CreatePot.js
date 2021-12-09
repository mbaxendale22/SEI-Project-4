import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { createSavingsPot } from '../../lib/api/SA';

const CreatePot = ({ setRender, startDate, user }) => {
  const [newPot, setNewPot] = useState({
    name: '',
    amount: 0,
    date: startDate,
    user: user.id,
  });

  const [toggle, setToggle] = useState(false);

  const { mutate } = useMutation(createSavingsPot);

  const watchCreatePot = (e) => {
    const newName = {
      ...newPot,
      [e.target.name]: e.target.value,
    };
    setNewPot(newName);
  };

  const handleCreatePot = () => {
    mutate(newPot);
    setRender((render) => !render);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p>Looks like you have a spare savings pot</p>
      <div onClick={() => setToggle(true)} className="dashboard-btn px-4">
        Create New Pot
      </div>
      {toggle && (
        <div className="flex flex-col gap-4">
          <label>Just pick a name to get started</label>
          <input
            onChange={watchCreatePot}
            className="border-b-4 rounded-md border-primary focus:outline-none"
            type="text"
            name="name"
            placeholder="my savings pot..."
          ></input>
          <div onClick={handleCreatePot} className="dashboard-btn px-4">
            Create
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePot;
