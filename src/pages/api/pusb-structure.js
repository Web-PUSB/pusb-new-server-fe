import axios from 'axios';

import { BaseUrl } from "../../config/config";

export const getPUSBRole = async (token) => {
  try {
    const response = await axios.get(`${BaseUrl}/role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const getPUSBRoleById = async (id, token) => {
  try {
    const response = await axios.get(`${BaseUrl}/role/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const createPUSBRole = async (data, token) => {
  try {
    const response = await axios.post(`${BaseUrl}/role`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const updatePUSBRoleById = async (id, data, token) => {
  try {
    const response = await axios.post(`${BaseUrl}/role/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const getPUSBRoleActivate = async (id, token) => {
  try {
    const response = await axios.get(`${BaseUrl}/role/${id}/activate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const getPUSBRoleDeactivate = async (id, token) => {
  try {
    const response = await axios.get(`${BaseUrl}/role/${id}/deactivate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};
