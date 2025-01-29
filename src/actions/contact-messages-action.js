"use server";
import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import {
  createMessage,
  deleteMessage,
} from "@/services/contact-messages-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string(),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
});

const FormSchemaSearch = Yup.object({
  q: Yup.string(),
  status: Yup.string(),
});

export const createMessageAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);

    FormSchema.validateSync(fields, { abortEarly: false });

    const res = await createMessage(fields);
    const data = await res.json();
    console.log(data);
    if(res.ok){
      return response(true, data?.message, data?.validations);
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
};

export const deleteMessageAction = async (id) => {
  if (!id) throw new Error("id is missing");

  const res = await deleteMessage(id);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  revalidatePath("/dashboard/contact-messages");
  redirect(
    `/dashboard/contact-messages?msg=${encodeURI("Message has been deleted.")}`
  );
};

export const searchContactMessagesAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);
  FormSchemaSearch.validateSync(fields, { abortEarly: false });

  redirect(`/dashboard/contact-messages?q=${fields.q}&status=${fields.status}`);
};
