import axios from 'axios';

const BaseUrl = 'https://your-api-base-url.com';

export const getPUSBNews = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/news`);
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

export const getPUSBNewsBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BaseUrl}/news/${slug}`);
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

export const getPUSBNewsById = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/news/${id}`);
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

export const createPUSBNews = async (data, token) => {
  try {
    const response = await axios.post(`${BaseUrl}/news`, data, {
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

export const updatePUSBNews = async (data, token, id) => {
  try {
    const response = await axios.patch(`${BaseUrl}/news/${id}`, data, {
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
