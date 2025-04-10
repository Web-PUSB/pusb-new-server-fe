import axios from 'axios';

const BaseUrl = "https://api.pusb.or.id/v1";

export const getPUSBEvent = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/event_timeline`);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};

export const getPUSBEventById = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/event_timeline/${id}`);
    return response.data?.data[0];
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};


export const createPUSBEvent = async () => {
  try {
    const response = await axios.post(`${BaseUrl}/event_timeline`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const updatePUSBEvent = async (data, token, id) => {
  try {
    const response = await axios.patch(
      `${BaseUrl}/event_timeline/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};

export const updateStatusPUSBEvent = async (status, token, id) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/event_timeline/${id}/change_status`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};

export const getPUSBEventTimeline = async (eventId) => {
  try {
    const response = await axios.get(`${BaseUrl}/event_timeline/${eventId}/detail`);
    return response.data?.data;
  } catch (error) {
    console.log(error.response || error);
    return null;
  }
};

export const getPUSBEventTimelineById = async (eventId, timelineId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/event_timeline/${eventId}/detail/${timelineId}`
    );
    return response.data?.data[0];
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};

export const createPUSBEventTimeline = async (data, token, eventId) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/event_timeline/${eventId}/detail`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};

export const updatePUSBEventTimeline = async (data, token, eventId, timelineId) => {
  try {
    const response = await axios.patch(
      `${BaseUrl}/event_timeline/${eventId}/detail/${timelineId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};

export const activatePUSBEventTimeline = async (token, eventId, timelineId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/event_timeline/${eventId}/detail/${timelineId}/activate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};

export const deactivatePUSBEventTimeline = async (token, eventId, timelineId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/event_timeline/${eventId}/detail/${timelineId}/deactivate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.response || error);
    throw error;
  }
};