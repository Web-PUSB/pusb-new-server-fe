import axios from 'axios';
import { BaseUrl } from "../../config/config";
export const getPUSBWorkplan = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/workplan`);
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

export const getPUSBWorkplanById = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/workplan/${id}`);
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
    const response = await axios.post(`${BaseUrl}/workplan`, data, {
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
    const response = await axios.patch(`${BaseUrl}/workplan/${id}`, data, {
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

export const deletePUSBWorkplan = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/workplan/${id}`);
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

export const getPUSBWorkplanCategory = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/workplan_category`);
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

export const getPUSBWorkplanCategoryById = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/workplan_category/${id}`);
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

export const createPUSBWorkplanCategory = async (data, token) => {
  try {
    const response = await axios.post(`${BaseUrl}/workplan_category`, data, {
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

export const updatePUSBWorkplanCategory = async (data, token, id) => {
  try {
    const response = await axios.patch(
      `${BaseUrl}/workplan_category/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export const activatePUSBWorkplanCategory = async (token, id) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/workplan_category/${id}/activate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export const deactivatePUSBWorkplanCategory = async (token, id) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/workplan_category/${id}/deactivate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
