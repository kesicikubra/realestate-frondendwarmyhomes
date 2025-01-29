import { getAuthHeader } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

export const getCountries = async () => {
    return fetch(`${API_URL}/countries`, {
        headers: await getAuthHeader(),
    });
};

export const getCities = async () => {
    return fetch(`${API_URL}/cities`, {
        headers: await getAuthHeader(),
    });
};

export const getDistricts = async () => {
    return fetch(`${API_URL}/districts`, {
        headers: await getAuthHeader(),
    });
};

export const getGoogleApi = async (address = "", key = null) => {
    const qs = `address=${address}&key=${key}`;
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?${qs}`);
};
