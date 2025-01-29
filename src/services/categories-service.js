import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const getAllCategoriesByPageForAuth = async (
    q="",
	page = 0,
	size = 5,
	sort = "id",
	type = "asc"
) => {
	const qs = `q=${q}&page=${page}&size=${size}&sort=${sort}&type=${type}`;
	return fetch(`${API_URL}/categories/admin?${qs}`, {
        headers: await getAuthHeader(),
	});
};

export const getAllCategoriesByPageForAnonymous = async (
    q="",
	page = 0,
	size = 20,
	sort = "seq",
	type = "asc"
) => {
	const qs = `q=${q}&page=${page}&size=${size}&sort=${sort}&type=${type}`;

	return fetch(`${API_URL}/categories?${qs}`, {
        headers: await getAuthHeader(),
	});
};

// todo : q parametresi yerine "" konuldu bakin
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

// todo

export const deleteCategory = async (id) => {
	return fetch(`${API_URL}/categories/${id}`, {
		method: "delete",
		headers: await getAuthHeader(),
	});
};

// todo

export const createCategory = async (payload) => {
	return fetch(`${API_URL}/categories`, {
		method: "post",
		headers: await getAuthHeader(),
		body: JSON.stringify(payload)
	});
};

// todo

export const updateCategory = async (payload) => {
	return fetch(`${API_URL}/categories/${payload.id}`, {
		method: "put",
		headers: await getAuthHeader(),
        body: JSON.stringify(payload)
	});
};
