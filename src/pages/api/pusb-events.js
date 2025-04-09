import axios from 'axios';

const BASE_URL = "https://api.pusb.or.id/v1";

export const getPUSBEvent = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/event_timeline`);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};
