"use server";
import { convertFormDataToJson, getYupErrors, response } from "@/helpers/form-validation";
import { register } from "@/services/register-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object({
    first_name:Yup.string()
        .min(2,"At least 2 characters.")
        .required("Required"),
    last_name:Yup.string()
        .min(2,"At least 2 characters.")
        .required("Required"),
    phone_number: Yup.string()
		.matches(/\d{3}-\d{3}-\d{4}/, "Invalid phone number")
		.required("Required"),
    email:Yup.string()
        .email("It must be email address")
        .required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long.")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .matches(/[.,?/\\\-]/, "Password must contain at least one special character (., ?, -, /).")
        .required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password fields don't match")
        .required("Required"),
    policies:Yup.string()
        .required("You must agree before submitting.")
});

export const registerAction = async (prevState, formData) =>{

    const fields = convertFormDataToJson(formData)

    try {
        FormSchema.validateSync(fields, { abortEarly:false });

        const res = await register(fields);
        const data = await res.json();     
        if (!res.ok) {
			return response(false, data?.message, data?.validations);
		}

    } catch (err) {
        if (err instanceof Yup.ValidationError) {
			return getYupErrors(err.inner);
		}
        // satir eklendi
		throw (err);
    }
    revalidatePath("/login");
	redirect(`/login?msg=${encodeURI("You are successfully registered. Please confirm your email address.")}`);
}