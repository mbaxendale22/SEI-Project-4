import axios from 'axios';
import { getPayload } from '../../helpers/auth.js';
import { headers } from '../headers';

const { common } = headers;
const today = new Date();
const startDate = `${today.getFullYear()}-${today.getMonth() + 1}-01`;
const endDate = `${today.getFullYear()}-${today.getMonth() + 1}-31`;

export const getIncome = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/personal-income/transactions/${sub}/`,
    {
      headers: {
        common,
      },
    }
  );
  return data;
};

export const postIncome = async (x) => {
  const { data } = await axios.post('/api/personal-income/', x, {
    headers: {
      common,
    },
  });
  return data;
};

export const deleteIncome = async (id) => {
  const { data } = await axios.delete(`/api/personal-income/${id}/`, {
    headers: {
      common,
    },
  });
  return data;
};

export const updateIncome = async (id, x) => {
  const { data } = await axios.put(`/api/personal-income/${id}/`, x, {
    headers: {
      common,
    },
  });
  return data;
};

export const getIncomeCategories = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(`/api/personal-income/category/${sub}/`, {
    headers: {
      common,
    },
  });
  return data;
};

export const getLargestIncome = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/personal-income/largest/?start=${startDate}&end=${endDate}&user=${sub}`,
    {
      headers: {
        common,
      },
    }
  );

  return data;
};

export const getTotalIncome = async () => {
  const { sub } = getPayload();
  const { data } = await axios.get(
    `/api/personal-income/monthly/?start=${startDate}&end=${endDate}&user=${sub}`,
    {
      headers: {
        common,
      },
    }
  );
  return data;
};
