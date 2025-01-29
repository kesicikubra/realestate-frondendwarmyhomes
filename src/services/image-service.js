import { getAuthHeader, getAuthHeaderFormData, getAuthHeaderImage } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const getImage = async (imageId) => {
    return fetch(`${API_URL}/images?imageIdList=${imageId}`, {
        headers: await getAuthHeader(),
    });
};

export const createImage = async (payload,id) => {
    
    
    return fetch(`${API_URL}/images/${id}`, {
        method: "POST",
        headers: await getAuthHeaderFormData(),
        body: (payload)
    });
};

export const updateImage = async (imageId) => {
    return fetch(`${API_URL}/images/${imageId}`, {
        method: "PUT",
        headers: await getAuthHeader(),
    });
};

export const deleteImage = async (imageIds) => {
    return fetch(`${API_URL}/images/${imageIds}`, {
        method: "DELETE",
        headers: await getAuthHeader(),
    });
};
