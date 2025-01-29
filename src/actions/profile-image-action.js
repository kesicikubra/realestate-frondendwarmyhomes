"use server";

import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import { createProfileImage, deleteProfileImage } from "@/services/profile-image-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

export const createProfileImageAction = async (prevState, formData) => {
  try {
    const advertId = Number(formData.get("advertId"));
    formData.delete("advertId");
    const res = await createProfileImage(formData, advertId);
    const data = await res.json();
    if (!res.ok) {
      return response(false, "", data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
  revalidatePath("/my-profile");
  redirect(`/my-profile?msg=${encodeURI("Profile image has been added.")}`);
};

export const deleteProfileImageAction = async () => {
  try {
    const res = await deleteProfileImage();
    const data = await res.json();
    if (!res.ok) {
      return response(false, "", data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
  revalidatePath("/my-profile");
  redirect(`/my-profile?msg=${encodeURI("Profile image has been deleted.")}`);
};

