import axios from "axios";

const BaseUrl = "https://your-base-url.com"; // Replace with actual Base URL

export const GetPUSBCNC = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/cnc`);
    return response.data?.data;
  } catch (error) {
    console.error(error.response || error);
  }
  return null;
};

export const GetPUSBCNCById = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/cnc/${id}`);
    return response.data?.data[0];
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};

export const CreatePUSBCNC = async (data, token) => {
  try {
    const response = await axios.post(`${BaseUrl}/cnc`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};

export const UpdatePUSBCNC = async (data, token, id) => {
  try {
    const response = await axios.patch(`${BaseUrl}/cnc/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};

export const ActivatePUSBCNC = async (token, id) => {
  try {
    const response = await axios.get(`${BaseUrl}/cnc/${id}/activate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};

export const DeactivatePUSBCNC = async (token, id) => {
  try {
    const response = await axios.get(`${BaseUrl}/cnc/${id}/deactivate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};

export const GetPUSBCNCWorkplanByCnCId = async (cncId) => {
  try {
    const response = await axios.get(`${BaseUrl}/cnc/${cncId}/Workplan`);
    return response.data?.data;
  } catch (error) {
    console.error(error.response || error);
  }
  return null;
};

export const GetPUSBCNCWorkplanById = async (cncId, WorkplanId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/cnc/${cncId}/Workplan/${WorkplanId}`
    );
    return response.data?.data[0];
  } catch (error) {
    console.error(error.response || error);
  }
  return null;
};

export const CreatePUSBCNCWorkplan = async (data, token, cncId) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/cnc/${cncId}/Workplan`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};

export const UpdatePUSBCNCWorkplan = async (data, token, cncId, WorkplanId) => {
  try {
    const response = await axios.patch(
      `${BaseUrl}/cnc/${cncId}/Workplan/${WorkplanId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};

export const ActivatePUSBCNCWorkplan = async (token, cncId, WorkplanId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/cnc/${cncId}/Workplan/${WorkplanId}/activate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};

export const DeactivatePUSBCNCWorkplan = async (token, cncId, WorkplanId) => {
  try {
    const response = await axios.get(
      `${BaseUrl}/cnc/${cncId}/Workplan/${WorkplanId}/deactivate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};
