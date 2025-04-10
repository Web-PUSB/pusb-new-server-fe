import axios, { AxiosError } from "axios";
import { BaseUrl } from "@/pusb-admin/config/config";
import { EventTimelineRequest } from "@/src/types/pusb-event-type";

export const GetPUSBEvent = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/event_timeline`);
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
  }
  return null;
};

export const GetPUSBEventById = async (id: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/event_timeline/${id}`);
    return response.data?.data[0];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const CreatePUSBEvent = async (data: FormData, token: string) => {
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

export const UpdatePUSBEvent = async (
  data: FormData,
  token: string,
  id: string,
) => {
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
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const UpdateStatusPUSBEvent = async (
  status: string,
  token: string,
  id: string,
) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/event_timeline/${id}/change_status`,
      {
        status: status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
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

export const GetPUSBEventTimeline = async (eventId: string) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/event_timeline/${eventId}/detail`,
    );
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
  }
  return null;
};

export const GetPUSBEventTimelineById = async (
  eventId: string,
  timelineId: string,
) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/event_timeline/${eventId}/detail/${timelineId}`,
    );
    return response.data?.data[0];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const CreatePUSBEventTimeline = async (
  data: EventTimelineRequest,
  token: string,
  eventId: string,
) => {
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
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const UpdatePUSBEventTimeline = async (
  data: EventTimelineRequest,
  token: string,
  eventId: string,
  timelineId: string,
) => {
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
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const ActivatePUSBEventTimeline = async (
  token: string,
  eventId: string,
  timelineId: string,
) => {
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
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const DeactivatePUSBEventTimeline = async (
  token: string,
  eventId: string,
  timelineId: string,
) => {
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
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};
