import axios, { AxiosError } from "axios";
import { BaseUrl } from "@/pusb-admin/config/config";

export const GetPUSBNews = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/news`);
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

export const GetPUSBNewsBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/news/${slug}`);
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
export const GetPUSBNewsById = async (id: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/news/${id}`);
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

export const CreatePUSBNews = async (data: FormData, token: string) => {
  try {
    const response = await axios.post(`${BaseUrl}/news`, data, {
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

export const UpdatePUSBNews = async (
  data: FormData,
  token: string,
  id: string,
) => {
  try {
    const response = await axios.patch(`${BaseUrl}/news/${id}`, data, {
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
