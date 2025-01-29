"use server";

import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/categories-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object({
  title: Yup.string().required("Category Name is required."),
  icon: Yup.string().required("Icon is required."),
  seq: Yup.string()
    .matches(/[0-9]/, "It must be number.")
    .required("Sequence is required"),
  isActive: Yup.string(),
});

const FormSchemaUpdate = Yup.object({
  title: Yup.string().required("Title is required."),
  icon: Yup.string().required("Icon is required."),
  seq: Yup.number().required("Sequence is required"),
  isActive: Yup.string(),
  categoryPropertyKeyRequests: Yup.string(),
});

const FormSchemaSearch = Yup.object({
  qs: Yup.string(),
});

export const createCategoryAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    // console.log(fields);

    FormSchema.validateSync(fields, { abortEarly: false });
    let activeFieldBoolean = fields.isActive === "on" ? true : false;
    const payload = {
      ...fields,
      isActive: activeFieldBoolean,
      categoryPropertyKeyRequests: [],
    };
    console.log(payload);
    const res = await createCategory(payload);
    const data = await res.json();
    console.log("data", data);
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
    `/dashboard/categories/new?msg=${encodeURI("Category has been created.")}`
  );
};

export const deleteCategoryAction = async (id) => {
  if (!id) throw new Error("id is missing");

  const res = await deleteCategory(id);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  revalidatePath("/dashboard/categories");
  redirect(
    `/dashboard/categories?msg=${encodeURI("Category has been deleted.")}`
  );
};
export const updateCategoryAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    FormSchemaUpdate.validateSync(fields, { abortEarly: false });
    let activeBoolean = fields.isActive === "on" ? true : false;

    const payload = {
      ...fields,
      isActive: activeBoolean,
    };
    // console.log("payload", payload);

    const res = await updateCategory(payload);
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

  revalidatePath("/dashboard/categories");
  redirect(`/dashboard/categories?msg=${encodeURI("Category was updated")}`);
};
export const searchCategoryAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);
  FormSchemaSearch.validateSync(fields, { abortEarly: false });

  redirect(`/dashboard/categories?q=${fields.q}`);
};
