import axios from 'axios';
import { getPayload } from '../../helpers/auth';
import { headers } from '../headers.js';

const { common } = headers;

export const createSavingsPot = async (pot) => {
  axios.post('/api/personal-assets/saving-pots/', pot, {
    headers: {
      common,
    },
  });
};

export const makeDeposit = async (vars) => {
  const { id, pot } = vars;
  axios.put(`/api/personal-assets/deposit/${id}/`, pot, {
    headers: {
      common,
    },
  });
};
export const makeWithdrawl = async (vars) => {
  const { id, pot } = vars;
  console.log(pot);
  axios.put(`/api/personal-assets/withdraw/${id}/`, pot, {
    headers: {
      common,
    },
  });
};

export const checkBalance = async (name) => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/personal-assets/balance/${sub}/?name=${name}/`,
    {
      headers: {
        common,
      },
    }
  );
  return data;
};
export const getPotTransactions = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(`/api/personal-assets/saving-pots/${sub}/`, {
    headers: {
      common,
    },
  });
  return data;
};
export const getIndividualPots = async (name) => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/personal-assets/saving-pots/pots/${sub}/?name=${name}/`,
    {
      headers: {
        common,
      },
    }
  );
  return data;
};

export const deletePot = async (id) => {
  console.log(id);
  await axios.delete(`/api/personal-assets/${id}/`, {
    headers: {
      common,
    },
  });
};
export const getPot = async (id) => {
  const { data } = await axios.get(`/api/personal-assets/${id}/`, {
    headers: {
      common,
    },
  });
  return data;
};
