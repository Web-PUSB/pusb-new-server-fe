import axios, { AxiosError } from "axios";
import { BaseUrl } from "@/pusb-admin/config/config";
import { WorkplanCNCRequest } from "@/src/types/pusb-cnc-type";

export const GetPUSBCNC = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/cnc`);
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

export const GetPUSBCNCById = async (id: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/cnc/${id}`);
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

export const CreatePUSBCNC = async (data: FormData, token: string) => {
  try {
    const response = await axios.post(`${BaseUrl}/cnc`, data, {
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

export const UpdatePUSBCNC = async (
  data: FormData,
  token: string,
  id: string,
) => {
  try {
    const response = await axios.patch(`${BaseUrl}/cnc/${id}`, data, {
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

export const ActivatePUSBCNC = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/cnc/${id}/activate`, {
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

export const DeactivatePUSBCNC = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/cnc/${id}/deactivate`, {
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

export const GetPUSBCNCWorkplanByCnCId = async (cncId: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/cnc/${cncId}/Workplan`);
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

export const GetPUSBCNCWorkplanById = async (
  cncId: string,
  WorkplanId: string,
) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/cnc/${cncId}/Workplan/${WorkplanId}`,
    );
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

export const CreatePUSBCNCWorkplan = async (
  data: WorkplanCNCRequest,
  token: string,
  cncId: string,
) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/cnc/${cncId}/Workplan`,
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

export const UpdatePUSBCNCWorkplan = async (
  data: WorkplanCNCRequest,
  token: string,
  cncId: string,
  WorkplanId: string,
) => {
  try {
    const response = await axios.patch(
      `${BaseUrl}/cnc/${cncId}/Workplan/${WorkplanId}`,
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

export const ActivatePUSBCNCWorkplan = async (
  token: string,
  cncId: string,
  WorkplanId: string,
) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/cnc/${cncId}/Workplan/${WorkplanId}/activate`,
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

export const DeactivatePUSBCNCWorkplan = async (
  token: string,
  cncId: string,
  WorkplanId: string,
) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/cnc/${cncId}/Workplan/${WorkplanId}/deactivate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response);
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
