import axios from 'axios';

const BaseUrl = 'https://your-api-base-url.com';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BaseUrl}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const getProfileUser = async (token) => {
  try {
    const response = await axios.get(`${BaseUrl}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const getPUSBUsers = async (token) => {
  try {
    const response = await axios.get(`${BaseUrl}/user`, {
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
  }
  return null;
};

export const getPUSBUserById = async (id, token) => {
  try {
    const response = await axios.get(`${BaseUrl}/user/${id}`, {
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

export const createPUSBUser = async (data, token) => {
  try {
    const response = await axios.post(`${BaseUrl}/user`, data, {
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
