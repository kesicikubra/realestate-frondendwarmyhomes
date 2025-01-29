"use server";
import { signIn } from "@/auth";
import { convertFormDataToJson, getYupErrors, response } from "@/helpers/form-validation";
import { login } from "@/services/auth-service";
import { ResetPasswordServices } from "@/services/register-service";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object({
    email:Yup.string()
        .email("It must be email address")
        .required("Required"),
    password: Yup.string()
        .required("Required"),
});

const ResetFormSchema = Yup.object({
    email: Yup.string()
    .email("It must be email address")
    .required("Required")
  });

export const loginAction = async (prevState, formData) =>{

    const fields = convertFormDataToJson(formData)

    try {
        FormSchema.validateSync(fields, { abortEarly:false });
        
        await signIn("credentials", fields);

        // const res = await login(fields);
        // const data = await res.json();
        // console.log(data);
        // if (res.ok) {
        //   return response(false, data.message, null, data);
        // }
        
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
			return getYupErrors(err.inner);
		}
        else if(err instanceof AuthError){
            if(err.type==='CredentialsSignin'){
                return response(false, 'Invalid credentials')
            }
            return response(false, 'Something went wrong.')
        }
		throw (err);
    }
}

export const forgotPasswordAction = async (prevState, formData) => {
    const fields = convertFormDataToJson(formData);
  
    try {
      ResetFormSchema.validateSync(fields, { abortEarly: false });
  
      await ResetPasswordServices(fields.email);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return getYupErrors(err.inner);
      } else if (err instanceof AuthError) {
        if (err.type === "CredentialsSignin") {
          return response(false, "Invalid credentials");
        }
        return response(false, "Something went wrong.");
      }
      throw err;
    }
  
    revalidatePath("/reset-password");
  redirect(
    `/reset-password?msg=${encodeURI("Reset password code has been sent. Pleace check your email!")}`
  );
  };
