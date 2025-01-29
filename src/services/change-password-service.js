import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const changePassword = async (payload) => {
    return fetch(`${API_URL}/users/auth`, {
        method: "PATCH",
        headers: await getAuthHeader(),
        body: JSON.stringify(payload)
    });
};

export const ResetPassword = async (payload) => {
  return fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: await getAuthHeader(),
    body: JSON.stringify(payload),
  });
};