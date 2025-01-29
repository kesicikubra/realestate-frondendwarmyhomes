import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const register = (payload) => {
	return fetch(`${API_URL}/register`, {
		method: "post",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const ResetPasswordServices = (email) => {
	return fetch(`${API_URL}/forgot-password`, {
		method: "post",
		body: JSON.stringify(email),
		headers: {
			"Content-Type": "application/json",
		},
	});
};