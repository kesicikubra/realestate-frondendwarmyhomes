"use server";
import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import { resetDatabase } from "@/services/reset-database-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import * as Yup from "yup";

const FormSchema = Yup.object({
  resetCode: Yup.string().required("Required"),
});

export const resetBoxAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);

  try {
    FormSchema.validateSync(fields, { abortEarly: false });
    if(fields.resetCode !== "realEstateProjectTeam03") return null;
    const res = await resetDatabase();
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      return response(false);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
  revalidatePath(`/dashboard`);
  redirect(
    `/dashboard?msg=${encodeURI(
      "Database has been deleted."
    )}`
  );
};
