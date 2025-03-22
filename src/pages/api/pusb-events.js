const axios = require("axios");
const { BaseUrl } = require("../../config/config");

const GetPUSBEvent = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/event_timeline`);
    return response.data ? response.data.data : null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    return null;
  }
};

const GetPUSBEventById = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/event_timeline/${id}`);
    return response.data ? response.data.data[0] : null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

const CreatePUSBEvent = async (data, token) => {
  try {
    const response = await axios.post(`${BaseUrl}/event_timeline`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
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

const UpdatePUSBEvent = async (data, token, id) => {
  try {
    const response = await axios.patch(
      `${BaseUrl}/event_timeline/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },
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

const UpdateStatusPUSBEvent = async (status, token, id) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/event_timeline/${id}/change_status`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
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

const GetPUSBEventTimeline = async (eventId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/event_timeline/${eventId}/detail`,
    );
    return response.data ? response.data.data : null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    return null;
  }
};

const GetPUSBEventTimelineById = async (eventId, timelineId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/event_timeline/${eventId}/detail/${timelineId}`,
    );
    return response.data ? response.data.data[0] : null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

const CreatePUSBEventTimeline = async (data, token, eventId) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/event_timeline/${eventId}/detail`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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

const UpdatePUSBEventTimeline = async (data, token, eventId, timelineId) => {
  try {
    const response = await axios.patch(
      `${BaseUrl}/event_timeline/${eventId}/detail/${timelineId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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

const ActivatePUSBEventTimeline = async (token, eventId, timelineId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/event_timeline/${eventId}/detail/${timelineId}/activate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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

const DeactivatePUSBEventTimeline = async (token, eventId, timelineId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/event_timeline/${eventId}/detail/${timelineId}/deactivate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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

module.exports = {
  GetPUSBEvent,
  GetPUSBEventById,
  CreatePUSBEvent,
  UpdatePUSBEvent,
  UpdateStatusPUSBEvent,
  GetPUSBEventTimeline,
  GetPUSBEventTimelineById,
  CreatePUSBEventTimeline,
  UpdatePUSBEventTimeline,
  ActivatePUSBEventTimeline,
  DeactivatePUSBEventTimeline,
};
