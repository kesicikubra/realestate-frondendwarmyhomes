import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const createTourRequest = async (payload) => {
  return fetch(`${API_URL}/tour-requests`, {
    method: "post",
    headers: await getAuthHeader(),
    body: JSON.stringify(payload),
  });
};

export const getAdminsOrManagersAllTourRequest = async (
  q = "",
  page = "",
  size = 5,
  sort = "createAt",
  type = "asc"
) => {
  const qpg = `q=${q}&page=${page}&size=${size}&sort=${sort}&type=${type}`;
  return fetch(`${API_URL}/tour-requests/admin?${qpg}`, {
		headers: await getAuthHeader(),
  });
};

export const getAuthenticatedCustomersTourRequests = async (
  q = "",
  page = "",
  size = 5,
  sort = "createAt",
  type = "asc"
) => {
  const qpg = `q=${q}&page=${page}&size=${size}&sort=${sort}&type=${type}`;
  return fetch(`${API_URL}/tour-requests/auth?${qpg}`, {
    headers: await getAuthHeader(),
  });
};
export const getAuthenticatedCustomersOwnerTourRequests = async (
  q = "",
  page = "",
  size = 5,
  sort = "createAt",
  type = "asc"
) => {
  const qpg = `q=${q}&page=${page}&size=${size}&sort=${sort}&type=${type}`;
  return fetch(`${API_URL}/tour-requests/auth-owner?${qpg}`, {
		headers: await getAuthHeader(),
  });
};
export const getAuthenticatedCustomersGuestTourRequests = async (
  q = "",
  page = "",
  size = 5,
  sort = "createAt",
  type = "asc"
) => {
  const qpg = `q=${q}&page=${page}&size=${size}&sort=${sort}&type=${type}`;
  return fetch(`${API_URL}/tour-requests/auth-guest?${qpg}`, {
		headers: await getAuthHeader(),
  });
};

// todo : suslu icinde degil bakilacak

export const getAuthCustomersTourRequestWithId = async (id) => {
  return fetch(`${API_URL}/tour-requests/${id}/auth`, {
    headers: await getAuthHeader(),
  });
};

export const getAdminsOrManagersTourRequestsWithId = async (id) => {
  return fetch(`${API_URL}/tour-requests/${id}/admin`, {
		headers: await getAuthHeader(),
  });
};

export const updateTourRequest = async (payload) => {
  return fetch(`${API_URL}/tour-requests/${payload.advertId}`, {
    method: "put",
    headers: await getAuthHeader(),
    body: JSON.stringify(payload)
  });
};

export const cancelTourRequest = async (id) => {
  return fetch(`${API_URL}/tour-requests/${id}/cancel`, {
    method: "PATCH",
    headers: await getAuthHeader(),
    body: JSON.stringify(id),
  });
};
export const declineTourRequest = async (id) => {
  return fetch(`${API_URL}/tour-requests/${id}/decline`, {
    method: "PATCH",
    headers: await getAuthHeader(),
    body: id,
  });
};
export const approveTourRequest = async (id) => {
  return fetch(`${API_URL}/tour-requests/${id}/approve`, {
    method: "PATCH",
    headers: await getAuthHeader(),
    body: id,
  });
};
export const deleteTourRequest = async (id) => {
  return fetch(`${API_URL}/tour-requests/delete/${id}`, {
    method: "delete",
    headers: await getAuthHeader(),
  });
};
