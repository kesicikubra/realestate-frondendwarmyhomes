import { getAuthHeader, getAuthHeaderFormData, getAuthHeaderImage } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const getProfileImageImage = async (photoId) => {
    return fetch(`${API_URL}/users/getPhoto/${photoId}`, {
        headers: await getAuthHeader(),
    });
};

export const createProfileImage = async (payload) => {
    return fetch(`${API_URL}/users/createPhoto`, {
        method: "POST",
        headers: await getAuthHeaderFormData(),
        body: (payload)
    });
};

export const updateProfileImage = async (payload) => {
    return fetch(`${API_URL}/users/updatePhoto`, {
        method: "PUT",
        headers: await getAuthHeader(),
        body: (payload)
    });
};

export const deleteProfileImage = async () => {
    return fetch(`${API_URL}/users/deletePhoto`, {
        method: "DELETE",
        headers: await getAuthHeader(),
    });
};
