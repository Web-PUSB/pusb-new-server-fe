import axios from "axios";
import { BaseUrl } from "../../config/config";

const getWithAuth = async (url, token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${BaseUrl}${url}`, { headers });
    return response.data?.data;
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};

const sendWithAuth = async (method, url, data, token) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios({ method, url: `${BaseUrl}${url}`, data, headers });
    return response;
  } catch (error) {
    console.error(error.response || error);
    throw error;
  }
};

export const getPUSBCNC = async () => getWithAuth("/cnc");

export const getPUSBCNCById = async (id) => getWithAuth(`/cnc/${id}`);

export const createPUSBCNC = async (data, token) => sendWithAuth("post", "/cnc", data, token);

export const updatePUSBCNC = async (data, token, id) =>
  sendWithAuth("patch", `/cnc/${id}`, data, token);

export const activatePUSBCNC = async (token, id) =>
  getWithAuth(`/cnc/${id}/activate`, token);

export const deactivatePUSBCNC = async (token, id) =>
  getWithAuth(`/cnc/${id}/deactivate`, token);

export const getPUSBCNCWorkplanByCnCId = async (cncId) =>
  getWithAuth(`/cnc/${cncId}/Workplan`);

export const getPUSBCNCWorkplanById = async (cncId, workplanId) =>
  getWithAuth(`/cnc/${cncId}/Workplan/${workplanId}`);

export const createPUSBCNCWorkplan = async (data, token, cncId) =>
  sendWithAuth("post", `/cnc/${cncId}/Workplan`, data, token);

export const updatePUSBCNCWorkplan = async (data, token, cncId, workplanId) =>
  sendWithAuth("patch", `/cnc/${cncId}/Workplan/${workplanId}`, data, token);

export const activatePUSBCNCWorkplan = async (token, cncId, workplanId) =>
  getWithAuth(`/cnc/${cncId}/Workplan/${workplanId}/activate`, token);

export const deactivatePUSBCNCWorkplan = async (token, cncId, workplanId) =>
  getWithAuth(`/cnc/${cncId}/Workplan/${workplanId}/deactivate`, token);
