import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { createSavingsPot } from '../../lib/api/SA';
import { useQueryClient } from 'react-query';

const CreatePot = ({ startDate, user }) => {
  const queryClient = useQueryClient('savings');

  const [newPot, setNewPot] = useState({
    name: '',
    amount: 0,
    date: startDate,
    user: user.id,
  });

  const [toggle, setToggle] = useState(false);

  const { mutate } = useMutation(createSavingsPot, {
    onSuccess: () => setToggle(false),
  });

  const watchCreatePot = (e) => {
    const newName = {
      ...newPot,
      [e.target.name]: e.target.value,
    };
    setNewPot(newName);
  };

  const handleCreatePot = () => {
    mutate(newPot);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-center">Looks like you have a spare savings pot</p>
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
