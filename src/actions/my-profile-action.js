"use server";
import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import {
  deleteMyProfile,
  updateMyProfile,
} from "@/services/my-profile-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object({
  first_name: Yup.string()
    .min(2, "At least 2 characters.")
    .required("Required"),
  last_name: Yup.string().required("Required"),
  phone_number: Yup.string()
    .matches(/\d{3}-\d{3}-\d{4}/, "Invalid phone number")
    .required("Required"),
  email: Yup.string().email("It must be email address").required("Required"),
});

const FormSchemaDelete = Yup.object({
  password: Yup.string().required("Required"),
});

export const myProfileUpdateAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);

  try {
    FormSchema.validateSync(fields, { abortEarly: false });

    const res = await updateMyProfile(fields);
    const data = await res.json();
    if (!res.ok) {
      return response(false, data?.message, data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }
    // satir eklendi
    throw err;
  }
  revalidatePath("/");
  redirect(`/?msg=${encodeURI("You have successfully updated your profile.")}`);
};

export const deleteMyProfileAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    FormSchemaDelete.validateSync(fields, { abortEarly: false });
    const res = await deleteMyProfile(fields);
    const data = await res.json();
    if (!res.ok) {
      return response(false);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
};
