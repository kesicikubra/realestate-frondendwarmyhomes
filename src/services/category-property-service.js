import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const deleteCategoryProperty = async (id) => {
	return fetch(`${API_URL}/categories/properties/${id}`, {
		method: "delete",
		headers: await getAuthHeader(),
	});
};

export const createCategoryProperty = async (payload) => {
	return fetch(`${API_URL}/categories/${payload.categoryId}/properties`, {
		method: "post",
		headers: await getAuthHeader(),
		body: JSON.stringify(payload)
	});
};

export const updateCategory = async (payload) => {
	return fetch(`${API_URL}/categories/properties/${payload.id}`, {
		method: "put",
		headers: await getAuthHeader(),
		body: JSON.stringify(payload)
	});
};

export const getCategoryPropertyKeysById = async (id) => {
    return fetch(`${API_URL}/categories/${id}/properties`, {
        headers: await getAuthHeader(),
    });
};

export const updateCategoryProperty = async (payload) => {
    return fetch(`${API_URL}/categories/properties/${payload.id}`, {
        method: "put",
        headers: await getAuthHeader(),
        body: JSON.stringify(payload)
    });
};
