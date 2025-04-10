import axios from 'axios';

import { BaseUrl } from "../../config/config";

export const getPUSBProfile = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/profile`);
    return response.data?.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
  }
  return null;
};

export const CreatePUSBProfile = async (data, token) => {
  try {
    const response = await axios.post(`${BaseUrl}/profile`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

export const getPUSBWorkplan = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/Workplan`);
    return response.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
  }
  return null;
};

export const getPUSBWorkplanById = async (id, token) => {
  try {
    const response = await axios.get(`${BaseUrl}/Workplan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const createPUSBWorkplan = async (data, token) => {
  try {
    const response = await axios.post(`${BaseUrl}/Workplan`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

export const updatePUSBWorkplan = async (data, token, id) => {
  try {
    const response = await axios.patch(`${BaseUrl}/Workplan/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
