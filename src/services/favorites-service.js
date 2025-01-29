import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const getAllFavoriteAdvertsFromAuth = async () => {
	return fetch(`${API_URL}/favorites/auth`, {
		headers: await getAuthHeader(),
	});
};

export const getAllFavoriteAdvertsFromAdmin = async (id) => {
	return fetch(`${API_URL}/favorites/admin/${id}`, {
		headers: await getAuthHeader(),
	});
};

export const deleteFavoriteAdvertsInUserFromAdmin = async (id) => {
	return fetch(`${API_URL}/favorites/${id}/admin`, {
		method: "delete",
		headers: await getAuthHeader(),
	});
};

export const deleteFavoriteAdvertsFromAuth = async () => {
	return fetch(`${API_URL}/favorites/auth`, {
		method: "delete",
		headers: await getAuthHeader(),
	});
};

export const addFavoriteAdvertForAuth = async (id) => {
	return fetch(`${API_URL}/favorites/${id}/auth`, {
		method: "post",
		headers: await getAuthHeader(),
		body:JSON.stringify(id)
	});
};

export const getAllCategoriesWithoutPageForAnonymous = async (
    q="",
	page = 0,
	size = 100,
	sort = "id",
	type = "asc"
) => {
	const qs = `q=${q}&page=${page}&size=${size}&sort=${sort}&type=${type}`;

	return fetch(`${API_URL}/categories?${qs}`, {
		headers: await getAuthHeader(),
	});
};

export const getCategoryById = async (id) => {
	return fetch(`${API_URL}/categories/${id}`, {
		headers: await getAuthHeader(),
	});
};

export const deleteCategory = async (id) => {
	return fetch(`${API_URL}/categories/${id}`, {
		method: "delete",
		headers: await getAuthHeader(),
	});
};

export const createCategory = async (payload) => {
	return fetch(`${API_URL}/categories`, {
		method: "post",
		headers: await getAuthHeader(),
		body: JSON.stringify(payload)
	});
};

export const updateCategory = async (payload) => {
	return fetch(`${API_URL}/categories/${payload.id}`, {
		method: "put",
		headers: await getAuthHeader(),
        body: JSON.stringify(payload)
	});
};
