import axios from "axios";
import { BaseUrl } from "../../config/config";


export const getPUSBNews = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/news`);
    console.log("Response from API:", response);
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.warn("Unexpected API format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching PUSB news:", error.response || error);
    return [];
  }
};

export const GetPUSBNewsBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BaseUrl}/news/${slug}`);
    return response.data?.data[0];
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};

export const GetPUSBNewsById = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/news/${id}`);
    return response.data?.data[0];
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};

export const CreatePUSBNews = async (data, token) => {
  try {
    const response = await axios.post(`${BaseUrl}/news`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};

export const UpdatePUSBNews = async (data, token, id) => {
  try {
    const response = await axios.patch(`${BaseUrl}/news/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};
