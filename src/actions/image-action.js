"use server";

import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import {
  createImage,
  deleteImage,
  updateImage,
} from "@/services/image-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

export const createImageAction = async (prevState, formData) => {
  try {
    const advertId = Number(formData.get("advertId"));
    formData.delete("advertId");
    const res = await createImage(formData, advertId);
    const data = await res.json();
   // console.log("data", data)
    if (!res.ok) {
      return response(false, "", data?.validations);
      
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
  revalidatePath("/my-properties");
  redirect(`/my-properties?msg=${encodeURI("Advert has been updated")}`);
};

export const createAdminImageAction = async (prevState, formData) => {
  try {
    const advertId = Number(formData.get("advertId"));
    formData.delete("advertId");

    const res = await createImage(formData, advertId);
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
  revalidatePath("/dashboard/adverts");
  redirect(`/dashboard/adverts?msg=${encodeURI("Advert has been updated")}`);
};
export const updateImageAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    const id = fields.imageId;
    const res = await updateImage(id);
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
  revalidatePath("/my-properties");
  redirect(
    `/my-properties?msg=${encodeURI("Featured Image has been updated")}`
  );
};

export const updateAdminImageAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    const id = fields.imageId;
    const res = await updateImage(id);
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
  revalidatePath("/dashboard/adverts");
  redirect(
    `/dashboard/adverts?msg=${encodeURI("Featured Image has been updated")}`
  );
};

export const deleteImageAction = async (id,advertId) => {
  if (!id) throw new Error("id is missing");

  const res = await deleteImage(id);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  revalidatePath(`/my-properties/${advertId}`,"page");
  redirect(`/my-properties/${advertId}?msg=${encodeURI("Image has been deleted.")}`);
};

export const deleteAdminImageAction = async (id,slugRedirect) => {
  if (!id) throw new Error("id is missing");
  const res = await deleteImage(id);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  revalidatePath(`/dashboard/adverts/${slugRedirect}`,"page");
  redirect(`/dashboard/adverts/${slugRedirect}?msg=${encodeURI("Image has been deleted.")}`);
};

export const deleteAdvertTypeAction = async (id) => {
  if (!id) throw new Error("id is missing");

  const res = await deleteAdvertType(id);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  revalidatePath("/dashboard/advert-types");
  redirect(
    `/dashboard/advert-types?msg=${encodeURI("Advert Type has been deleted.")}`
  );
};

export const updateAdvertTypeAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);

    FormSchema.validateSync(fields, { abortEarly: false });

    const res = await updateAdvertType(fields);
    const data = await res.json();

    if (!res.ok) {
      return response(false, data?.message, data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }

  revalidatePath("/dashboard/advert-types");
  redirect(
    `/dashboard/advert-types?msg=${encodeURI("Advert Type was updated")}`
  );
};

export const searchAdvertTypeAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);
  FormSchemaSearch.validateSync(fields, { abortEarly: false });

  redirect(`/dashboard/advert-types?qs=${fields.qs}`);
};
