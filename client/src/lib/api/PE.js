import axios from 'axios';
import { getPayload, setTokenToLocalStorage } from '../../helpers/auth';
import { headers } from '../headers.js';

const { common } = headers;
const today = new Date();
const startDate = `${today.getFullYear()}-${today.getMonth() + 1}-01`;
const endDate = `${today.getFullYear()}-${today.getMonth() + 1}-31`;
const previousStartDate = `${today.getFullYear()}-${today.getMonth()}-01`;
const previousEndDate = `${today.getFullYear()}-${today.getMonth()}-31`;

export const postLogin = async (login) => {
  const { data } = await axios.post('/api/users/login/', login, {
    headers: {
      common,
    },
  });
  setTokenToLocalStorage(data.token);
};
export const postRegister = async (register) => {
  await axios.post('/api/users/register/', register, {
    headers: {
      common,
    },
  });
};

export const getUser = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(`/api/users/${sub}/`, {
    headers: {
      common,
    },
  });
  return data;
};

export const getCategories = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/personal-expenses/category/?start=${startDate}&end=${endDate}&owner=${sub}`,
    {
      headers: {
        common,
      },
    }
  );
  return data;
};

export const getRecentExpenses = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/personal-expenses/dates/?start=${startDate}&end=${endDate}&owner=${sub}`,
    {
      headers: {
        common,
      },
    }
  );
  return data;
};
export const getTotalExpenses = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/personal-expenses/monthly/?start=${startDate}&end=${endDate}&owner=${sub}`,
    {
      headers: {
        common,
      },
    }
  );
  return data;
};

export const getPreviousTotalExpenses = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/personal-expenses/monthly/?start=${previousStartDate}&end=${previousEndDate}&owner=${sub}/`,
    {
      headers: {
        common,
      },
    }
  );
  return data;
};
export const getLargestExpense = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/personal-expenses/largest/?start=${startDate}&end=${endDate}&owner=${sub}`,
    {
      headers: {
        common,
      },
    }
  );

  return data;
};

export const postExpenses = async (x) => {
  const { data } = await axios.post('/api/personal-expenses/', x, {
    headers: {
      common,
    },
  });
  return data;
};

export const postSharedExpenses = async (x) => {
  const { data } = await axios.post('/api/shared-expenses/', x, {
    headers: {
      common,
    },
  });
  return data;
};

export const deleteExpense = async (id) => {
  const { data } = await axios.delete(`/api/personal-expenses/${id}/`, {
    headers: {
      common,
    },
  });
  return data;
};
export const deleteSharedExpense = async (user, item) => {
  const { data } = await axios.delete(`/api/shared-expenses/${item.id}/`, {
    data: {
      creator: item.creator,
      name: item.name,
      category: item.category,
      date: item.date,
      household: user.household,
    },
    headers: {
      common,
    },
  });
  return data;
};

export const updateExpense = async (id, x) => {
  const { data } = await axios.put(`/api/personal-expenses/${id}/`, x, {
    headers: {
      common,
    },
  });
  return data;
};

export const updateSharedExpense = async (id, x) => {
  const { data } = await axios.put(`/api/shared-expenses/resolve/${id}/`, x, {
    headers: {
      common,
    },
  });
  return data;
};
