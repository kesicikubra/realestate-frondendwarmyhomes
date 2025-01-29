"use server";
import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import {
  createAdvertType,
  deleteAdvertType,
  updateAdvertType,
} from "@/services/advert-type-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object({
  title: Yup.string().required("Required"),
});

const FormSchemaSearch = Yup.object({
  qs: Yup.string(),
});

export const createAdvertTypeAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);

    FormSchema.validateSync(fields, { abortEarly: false });
    // console.log("fields",fields)
    const res = await createAdvertType(fields);
    const data = await res.json();
    // console.log("data",data)
    if (!res.ok) {
      return response(false, "", data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }

  revalidatePath("/dashboard/advert-types");
  redirect(
    `/dashboard/advert-types?msg=${encodeURI("Advert Type has been created.")}`
  );
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
    console.log(fields);
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
