
import { getAuthHeader, getAuthHeaderFormData, getAuthHeaderFormDataMultiLang, getAuthHeaderMultiLang } from "@/helpers/auth";

import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

// Anonymous Requests
export const getAllAdvert = async (
  q = "",
  category_id = "",
  advert_type_id = "",
  price_start = "",
  price_end = "",
  city_id="",
  page = 0,
  size = 20,
  sort = "category",
  type = "asc"
) => {
  
  const qs = `q=${q}&category_id=${category_id}&advert_type_id=${advert_type_id}&price_start=${price_start}&price_end=${price_end}&city_id=${city_id}&page=${page}&size=${size}&sort=${sort}&type=${type}`;
  return fetch(`${API_URL}/adverts?${qs}`, {
    headers: await getAuthHeader(),
  });
};

export const getAdvertBySlug = async (slug) => {
  return fetch(`${API_URL}/adverts/${slug}`, {
    headers: await getAuthHeader(),
  });
};

export const getAdvertsByCity = async () => {
  return fetch(`${API_URL}/adverts/cities`, {
    headers: await getAuthHeader(),
  });
};

export const getAdvertsByCategories = async () => {
  return fetch(`${API_URL}/adverts/categories`, {
    headers: await getAuthHeader(),
  });
};


export const getAdvertsByPopularWithAmount = async (amount) => {
  return fetch(`${API_URL}/adverts/popular?amount=${amount}`, {
    headers: await getAuthHeader(),
  });
};

//Customer Requests
export const getAdvertsFromAuth = async (
  page = "",
  size = 20,
  sort = "category",
  type = "asc"
) => {
  const qs = `${page}&size=${size}&sort=${sort}&type=${type}`;
  return fetch(`${API_URL}/adverts/auth?${qs}`, {
    headers: await getAuthHeader(),
  });
};

export const getAdvertByIdFromAuth = async (id) => {
  return fetch(`${API_URL}/adverts/${id}/auth`, {
    headers: await getAuthHeader(),
  });
};

export const createAdvertFromCustomer = async (payload) => {
  return fetch(`${API_URL}/adverts`, {
    method: "POST",
    headers: await getAuthHeaderFormDataMultiLang(),
    body: payload,
  });
};

export const updateAdvertFromAuth = async (payload) => {
  return fetch(`${API_URL}/adverts/auth/${payload.id}`, {
    method: "put",
    headers: await getAuthHeader(),
    body: JSON.stringify(payload),
  });
};

//Admin Requests
export const getAdvertsFromAdmin = async (
  q = "",
  category_id = "", 
  advert_type_id = "", 
  status = "",
  page=0,
  size = 5,
  sort = "category",
  type = "asc"
) => {
  const qs = `q=${q}&category_id=${category_id}&status=${status}&page=${page}&size=${size}&sort=${sort}&type=${type}&advert_type_id=${advert_type_id}`;
  return fetch(`${API_URL}/adverts/admin?${qs}`, {
    headers: await getAuthHeader(),
  });
};

export const getAdvertByIdFromAdmin = async (id) => {
  return fetch(`${API_URL}/adverts/${id}/admin`, {
    headers: await getAuthHeader(),
  });
};

// todo: bakilacak

export const updateAdvertFromAdmin = async (payload) => {
  return fetch(`${API_URL}/adverts/admin/${payload.id}`, {
    method: "put",
    headers: await getAuthHeader(),
    body: JSON.stringify(payload),
  });
};

// todo : bakilacak
export const deleteAdvertFromAdmin = async (id) => {
  return fetch(`${API_URL}/adverts/admin/${id}`, {
    method: "delete",
    headers: await getAuthHeader(),
  });
};
