import axios from 'axios';
import { getPayload } from '../../helpers/auth';
import { headers } from '../headers.js';
const { common } = headers;

const today = new Date();
const startDate = `${today.getFullYear()}-${today.getMonth() + 1}-01`;
const endDate = `${today.getFullYear()}-${today.getMonth() + 1}-31`;

export const postHousehold = async (x) => {
  const { data } = await axios.post('/api/household/', x, {
    headers: {
      common,
    },
  });
  return data;
};

export const updateUserHousehold = async (updatedUser) => {
  const { sub } = getPayload();
  await axios.put(`/api/users/update/${sub}/`, updatedUser, {
    headers: {
      common,
    },
  });
};

export const getHouseholdInfo = async (house) => {
  const { data } = await axios.get(`/api/household/${house}/`, {
    headers: {
      common,
    },
  });
  return data;
};

export const getRecentHouseExpenses = async (house) => {
  const { data } = await axios.get(`/api/household-expenses/recent/${house}/`, {
    headers: {
      common,
    },
  });
  return data;
};

export const getHouseCategories = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/household-expenses/category/?start=${startDate}&end=${endDate}&owner=${sub}`,
    {
      headers: {
        common,
      },
    }
  );
  return data;
};

export const getHouseTotalExpenses = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/household-expenses/monthly/?start=${startDate}&end=${endDate}&owner=${sub}`,
    {
      headers: {
        common,
      },
    }
  );
  return data;
};

export const getHouseLargestExpense = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/household-expenses/largest/?start=${startDate}&end=${endDate}&owner=${sub}`,
    {
      headers: {
        common,
      },
    }
  );

  return data;
};
