import axios from 'axios';

const BASE_URL = "https://api.pusb.or.id/v1";

export const getPUSBNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/news`);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};
