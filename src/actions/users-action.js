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
import { deleteUser, updateUserByIdForAdmin } from "@/services/users-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchemaUpdate = Yup.object({
  user_roles: Yup.string().required("Required"),

});

const FormSchemaSearch = Yup.object({
    q: Yup.string(),
  
  });

export const deleteUserAction = async (id) => {
    if (!id) throw new Error("id is missing");
  
    const res = await deleteUser(id);
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message);
    }
  
    revalidatePath("/dashboard/users");
    redirect(
      `/dashboard/users?msg=${encodeURI("User has been deleted.")}`
    );
  };

  export const updateUserAction = async (prevState, formData) => {
    let data;
    try {
      const fields = convertFormDataToJson(formData);

      FormSchemaUpdate.validateSync(fields, { abortEarly: false });
      const payload={
        ...fields,
        user_roles:[fields.user_roles]
      }
      const res = await updateUserByIdForAdmin(payload);
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
   
    revalidatePath(`/dashboard/users`);
    redirect(
      `/dashboard/users?msg=${encodeURI(
        "User was updated"
      )}`
    );
  };

  export const searchUsersListAction = async (prevState, formData) => {
    const fields = convertFormDataToJson(formData);
    FormSchemaSearch.validateSync(fields, { abortEarly: false });

    redirect(`/dashboard/users?q=${fields.q}`);
  };