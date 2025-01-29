import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const getAllUsersByPageForAdmin = async (
  q = "",
  page = 0,
  size = 5,
  sort = "createAt",
  type = "desc"
) => {
  const qs = `q=${q}&page=${page}&size=${size}&sort=${sort}&type=${type}`;

  return fetch(`${API_URL}/users/admin?${qs}`, {
		headers: await getAuthHeader(),
  });
};

export const getUserByIdForAdmin = async (id) => {
  return fetch(`${API_URL}/users/${id}/admin`, {
		headers: await getAuthHeader(),
  });
};

export const updateUserByIdForAdmin = async (payload) => {
	return fetch(`${API_URL}/users/${payload.id}/admin`, {
		method: "put",
		headers: await getAuthHeader(),
        body: JSON.stringify(payload)
	});
};

export const deleteUser = async (id) => {
    return fetch(`${API_URL}/users/${id}/admin`, {
      method: "delete",
      headers: await getAuthHeader(),
    });
  };
  