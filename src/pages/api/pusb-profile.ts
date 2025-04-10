import axios, { AxiosError } from "axios";
import { BaseUrl } from "@/pusb-admin/config/config";

export const GetPUSBProfile = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/profile`);
    return response.data?.data[0];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
  }
  return null;
};

export const CreatePUSBProfile = async (data: FormData, token: string) => {
  try {
    const response = await axios.post(`${BaseUrl}/profile`, data, {
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

export const GetPUSBWorkplan = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/Workplan`);
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

export const GetPUSBWorkplanById = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/Workplan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const CreatePUSBWorkplan = async (data: FormData, token: string) => {
  try {
    const response = await axios.post(`${BaseUrl}/Workplan`, data, {
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

export const UpdatePUSBWorkplan = async (
  data: FormData,
  token: string,
  id: string,
) => {
  try {
    const response = await axios.patch(`${BaseUrl}/Workplan/${id}`, data, {
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
