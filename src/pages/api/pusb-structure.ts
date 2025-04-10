import axios, { AxiosError } from "axios";
import { BaseUrl } from "@/pusb-admin/config/config";
import { RoleRequest } from "@/src/types/pusb-structure";

export const GetPUSBRole = async (token: string | undefined) => {
  try {
    const response = await axios.get(`${BaseUrl}/role`, {
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
    throw error;
  }
};

export const GetPUSBRoleById = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/role/${id}`, {
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
    throw error;
  }
};

export const CreatePUSBRole = async (data: RoleRequest, token: string) => {
  try {
    const response = await axios.post(`${BaseUrl}/role`, data, {
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

export const UpdatePUSBRoleById = async (
  id: string,
  data: RoleRequest,
  token: string,
) => {
  try {
    const response = await axios.post(`${BaseUrl}/role/${id}`, data, {
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

export const GetPUSBRoleActivate = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/role/${id}/activate`, {
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
    throw error;
  }
};

export const GetPUSBRoleDeactivate = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/role/${id}/deactivate`, {
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
    throw error;
  }
};
