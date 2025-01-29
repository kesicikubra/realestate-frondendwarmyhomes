import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const getAllAdvertTypes = async (qs) => {
    return fetch(`${API_URL}/advert-types?q=${qs}`, {
        headers: await getAuthHeader(),
    });
};

export const getAdvertTypeById = async (id) => {
    return fetch(`${API_URL}/advert-types/${id}`, {
        headers: await getAuthHeader(),
    });
};

export const deleteAdvertType = async (id) => {
    return fetch(`${API_URL}/advert-types/${id}`, {
        method: "delete",
        headers: await getAuthHeader(),
    });
};

export const createAdvertType = async (payload) => {
    return fetch(`${API_URL}/advert-types`, {
        method: "post",
        headers: await getAuthHeader(),
        body: JSON.stringify(payload)
    });
};

export const updateAdvertType = async (payload) => {
    return fetch(`${API_URL}/advert-types/${payload.id}`, {
        method: "put",
        headers: await getAuthHeader(),
        body: JSON.stringify(payload)
    });
};
