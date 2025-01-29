import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const getUserByAuth = async () => {
    return fetch(`${API_URL}/users/auth`, {
        method: "get",
		headers: await getAuthHeader(),
    });
};

export const updateMyProfile = async (payload) => {
    return fetch(`${API_URL}/users/auth`, {
        method: "put",
        headers: await getAuthHeader(),
        body: JSON.stringify(payload)
    });
};


export const deleteMyProfile = async (payload) => {
    return fetch(`${API_URL}/users/auth`, {
        method: "delete",
        body:JSON.stringify(payload),
        headers: await getAuthHeader(),
    });
};