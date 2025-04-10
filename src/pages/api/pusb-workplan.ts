import axios, { AxiosError } from "axios";
import { BaseUrl } from "@/pusb-admin/config/config";

export const GetPUSBWorkplan = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/workplan`);
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

export const GetPUSBWorkplanById = async (id: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/workplan/${id}`);
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
    const response = await axios.post(`${BaseUrl}/workplan`, data, {
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
    const response = await axios.patch(`${BaseUrl}/workplan/${id}`, data, {
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

export const DeletePUSBWorkplan = async (id: string) => {
  try {
    const response = await axios.delete(`${BaseUrl}/workplan/${id}`);
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

// Workplan Category
export const GetPUSBWorkplanCategory = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/workplan_category`);
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

export const GetPUSBWorkplanCategoryById = async (id: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/workplan_category/${id}`);
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

export const CreatePUSBWorkplanCategory = async (
  data: FormData,
  token: string,
) => {
  try {
    const response = await axios.post(`${BaseUrl}/workplan_category`, data, {
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

export const UpdatePUSBWorkplanCategory = async (
  data: FormData,
  token: string,
  id: string,
) => {
  try {
    const response = await axios.patch(
      `${BaseUrl}/workplan_category/${id}`,
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

export const ActivatePUSBWorkplanCategory = async (
  token: string,
  id: string,
) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/workplan_category/${id}/activate`,
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

export const DeactivatePUSBWorkplanCategory = async (
  token: string,
  id: string,
) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/workplan_category/${id}/deactivate`,
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
