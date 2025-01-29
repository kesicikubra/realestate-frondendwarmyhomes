import { getAuthHeader, getAuthHeaderForReports } from "@/helpers/auth";
import { config } from "@/helpers/config";

const API_URL = config.api.baseUrl;

//G01 -> It will get some statistics MANAGER ADMIN
export const getAllQuantities = async () => {
  return fetch(`${API_URL}/report`, {
		headers: await getAuthHeader(),
  });
};

//G02 -> It will get adverts by the date range MANAGER ADMIN
export const getAdvertsByTheDateRange = async (
  beginDate,
  endDate,
  categoryTitle="",
  typeTitle="",
  status=""
) => {
  const qs = `beginDate=${beginDate}&endDate=${endDate}&categoryTitle=${categoryTitle}&typeTitle=${typeTitle}&status=${status}`;
  console.log(qs);
  return fetch(`${API_URL}/report/download?${qs}`, {
    headers: await getAuthHeader(),
  });
};

//G03 -> It will return the adverts which have the most tour requests MANAGER ADMIN
export const getAdvertHaveTheMostTourRequest = async (amount) => {
  return fetch(`${API_URL}/report/most-populer-adverts?amount=${amount}`, {
    headers: await getAuthHeader(),
  });
};

//G04 -> It will get users MANAGER ADMIN
export const getUsersByRoles = async (role) => {
  return fetch(`${API_URL}/report/users?role=${role}`, {
    headers: await getAuthHeaderForReports(),
  });
};
////////////////////////////////////
export const fetchUsersReport = async (role) => {
  const response = await fetch(`${API_URL}/report/users?role=${role}`);
  if (response.ok) {
    const blob = await response.blob();
    return blob;
  } else {
    throw new Error('Failed to fetch users report');
  }
};
//////////////////////////////////////

//G05 -> It will get tour requests by the date range MANAGER ADMIN
export const getTourRequestsByTheDateRange = async (
  begindate, 
  endDate, 
  status=""
) => {
  const qs = `begindate=${begindate}&endDate=${endDate}&status=${status}`;
  console.log(qs);
  return fetch(`${API_URL}/report/tour-requests?${qs}`, {
    headers: await getAuthHeader(),
  });
};

//CAtegory Servicese alinabilir. conflict olmasın diye buraya yazildi
//C12 -> It should return categories list -> MANAGER ADMIN
export const getAllCategoriesList = async () => {
  return fetch(`${API_URL}/categories/list-categories`, {
    headers: await getAuthHeader(),
  });
};
