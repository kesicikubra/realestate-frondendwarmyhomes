"use server"
import { convertFormDataToJson } from "@/helpers/form-validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const returnButtonAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData)
  revalidatePath(`${fields.path}`);
  redirect(`${fields.path}`);
};