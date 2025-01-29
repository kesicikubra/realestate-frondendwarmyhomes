"use server";
import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import {
  createCategoryProperty,
  deleteCategoryProperty,
  updateCategoryProperty,
} from "@/services/category-property-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  keyType: Yup.string().required("Key Type is required."),
  unit: Yup.string(),
});

export const createCategoryPropertyAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    FormSchema.validateSync(fields, { abortEarly: false });
    const res = await createCategoryProperty(fields);
    const data = await res.json();
    if (res.ok) {
      return response(true, "", null, data);
    }
    if (!res.ok) {
      return response(false, "", data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }

  revalidatePath("/dashboard/categories/new");
  redirect(
    `/dashboard/categories/new?msg=${encodeURI(
      "Category Property has been created."
    )}`
  );
};

export const deleteCategoryPropertyAction = async (id) => {
  if (!id) throw new Error("id is missing");
  const res = await deleteCategoryProperty(id);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  revalidatePath("/dashboard/categories/new");
};

export const updateCategoryPropertyAction = async (prevState, formData) => {
  let data;
  try {
    const fields = convertFormDataToJson(formData);
    FormSchema.validateSync(fields, { abortEarly: false });

    const res = await updateCategoryProperty(fields);
    data = await res.json();

    if (!res.ok) {
      return response(false, data?.message, data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
  revalidatePath(`/dashboard/categories/${data.categoryId}`);
  redirect(
    `/dashboard/categories/${data.categoryId}?msg=${encodeURI(
      "Category Property was updated"
    )}`
  );
};

export const updateCategoryPropertyActionAtNewPage = async (
  prevState,
  formData
) => {
  let data;
  try {
    const fields = convertFormDataToJson(formData);
    FormSchema.validateSync(fields, { abortEarly: false });
    const res = await updateCategoryProperty(fields);
    data = await res.json();
    if (!res.ok) {
      return response(false, data?.message, data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
  revalidatePath(`/dashboard/categories/new`);
  redirect(
    `/dashboard/categories/new?msg=${encodeURI(
      "Category Property was updated"
    )}&display=false`
  );
};
