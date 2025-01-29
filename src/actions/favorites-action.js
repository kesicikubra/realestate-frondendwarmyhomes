"use server";
import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";
import {
  createAdvertFromCustomer,
  deleteAdvertFromAdmin,
  updateAdvertFromAuth,
} from "@/services/advert-service";
import { addFavoriteAdvertForAuth, deleteFavoriteAdvertsFromAuth, deleteFavoriteAdvertsInUserFromAdmin } from "@/services/favorites-service";


export const addFavoriteAdvertActionForAuth = async (id, state) => {
  if (!id) throw new Error("id is missing");
 
  const res = await addFavoriteAdvertForAuth(id);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
  revalidatePath(`/`);
  redirect(
    `/?msg=${encodeURI(
      `Favorite Advert has been ${state}.`
    )}`
  );
};
export const addFavoriteAdvertActionForAuthFromPropertis = async (id, state) => {
  if (!id) throw new Error("id is missing");
 
  const res = await addFavoriteAdvertForAuth(id);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
  revalidatePath(`/properties`);
  redirect(
    `/properties?msg=${encodeURI(
      `Favorite Advert has been ${state}.`
    )}`
  );
};

export const deleteFavoriteAdvertActionForAuth = async () => {
  const res = await deleteFavoriteAdvertsFromAuth();
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
  revalidatePath(`/my-favorites`);
  redirect(
    `/my-favorites?msg=${encodeURI(
      "Favorite Advert has been deleted."
    )}`
  );
};


export const deleteAdminUserFavoritesAction = async (id,userId) => {
    if (!id) throw new Error("id is missing");
    if (!userId) throw new Error("userId is missing");
  
    const res = await deleteFavoriteAdvertsInUserFromAdmin(id);
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message);
    }
    revalidatePath(`/dashboard/users/${userId}`);
    redirect(
      `/dashboard/users/${userId}?msg=${encodeURI(
        "Favorite Advert has been deleted."
      )}`
    );
  };
  