import { getAuthHeader, getAuthHeaderClient } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const getAllUserLogsFromAdmin = async () => {
    return fetch(`${API_URL}/logs/all`, {
        headers: await getAuthHeader(),
    });
};

export const getUserLogsByIdFromAdmin = async (id) => {
    return fetch(`${API_URL}/logs/${id}`, {
        headers: await getAuthHeader(),
    });
};

