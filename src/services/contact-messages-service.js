import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const createMessage = async (payload) => {
  return fetch(`${API_URL}/contact-messages/save`, {
    method: "post",
    body: JSON.stringify(payload),
    headers: await getAuthHeader(),
  });
};

export const getAllMessagesByPage = async (
  q = "", 
  page = 0,
  status = "all",
  size = 5,
  sort = "createAt",
  type = "desc"
) => {
  const qs = `q=${q}&status=${status}&page=${page}&size=${size}&sort=${sort}&type=${type}`;

  return fetch(`${API_URL}/contact-messages?${qs}`, {
    headers: await getAuthHeader(),
  });
};

export const getMessageById = async (id) => {
  return fetch(`${API_URL}/contact-messages/${id}`, {
    headers: await getAuthHeader(),
  });
};

export const deleteMessage = async (id) => {
  return fetch(`${API_URL}/contact-messages/${id}`, {
    method: "delete",
    headers: await getAuthHeader(),
  });
};
