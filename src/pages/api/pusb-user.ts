import axios, { AxiosError } from "axios";
import { BaseUrl } from "@/pusb-admin/config/config";
import { UserRequest } from "../../types/pusb-user-type";

export const LoginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BaseUrl}/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const GetProfileUser = async (token: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    } else {
      console.log(error);
    }
    throw error;
  }
};

export const GetPUSBUsers = async (token: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const GetPUSBUserById = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/user/${id}`, {
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

export const CreatePUSBUser = async (data: UserRequest, token: string) => {
  try {
    const response = await axios.post(`${BaseUrl}/user`, data, {
      headers: {
        "Content-Type": "application/json",
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
