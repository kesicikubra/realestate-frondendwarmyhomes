"use server";

import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import {
  createTourRequest,
  updateTourRequest,
  cancelTourRequest,
  approveTourRequest,
  declineTourRequest,
  deleteTourRequest,
} from "@/services/tour-request-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

const FormSchema = Yup.object({
  tour_date: Yup.string()
    .test("isDate", "Invalid date", (val) => {
      return new Date(val) >= new Date();
    })
    .required("Required"),
  tour_time: Yup.string()
    .required("Required"),
  advertId:Yup.string()
});
const FormSchemaStatus = Yup.object({
  status: Yup.string().required("Required"),
});

const FormSchemaSearch = Yup.object({
  qs: Yup.string(),
});

export const createTourRequestAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    console.log("fields",fields);
    FormSchema.validateSync(fields, { abortEarly: false });
    const res = await createTourRequest(fields);
    const data = await res.json();
    if (!res.ok) {
      return response(false, "", data?.validations);
    }

  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
  revalidatePath("/tour-requests");
  redirect(`/tour-requests?msg=${encodeURI("Tour Request has been created.")}`
  );
};

export const updateTourRequestAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    FormSchema.validateSync(fields, { abortEarly: false });
    
    const res = await updateTourRequest(fields);
    const data = await res.json();
    if (!res.ok) {
      return response(false, "", data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
  revalidatePath("/tour-requests");
  redirect(`/tour-requests?msg=${encodeURI("Tour Request has been updated.")}`
  );
};
export const deleteTourRequestAction = async (id) => {
  if (!id) throw new Error("id is missing");
  const res = await deleteTourRequest(id);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  revalidatePath("/dashboard/tour-requests");
  redirect(
    `/dashboard/tour-requests?msg=${encodeURI(
      "Tour Request has been deleted."
    )}`
  );
};

export const deleteTourRequestFromUserAction = async (id,userId) => {
  if (!id) throw new Error("id is missing");
  if (!userId) throw new Error("userId is missing");
  const res = await deleteTourRequest(id);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  revalidatePath(`/dashboard/users/${userId}`);
  redirect(
    `/dashboard/users/${userId}?msg=${encodeURI(
      "Tour Request has been deleted."
    )}`
  );
};

export const cancelTourRequestAction = async (id) => {
  try {
    if (!id) throw new Error("id is missing");

    const res = await cancelTourRequest(id);
    const data = await res.json();
    if (!res.ok) {
      return response(false, "", data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }
    throw err;
  }

  revalidatePath("/tour-requests");
  redirect(
    `/tour-requests?msg=${encodeURI("Tour Request has been cancelled.")}`
  );
};

export const declineTourRequestAction = async (id) => {
  try {
    if (!id) throw new Error("id is missing");

    const res = await declineTourRequest(id);
    const data = await res.json();
    if (!res.ok) {
      return response(false, "", data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
  revalidatePath("/tour-requests");
  redirect(
    `/tour-requests?msg=${encodeURI(
      "You declined tour request succesfully."
    )}`
  );
};

export const approveTourRequestAction = async (id) => {
  try {

    const res = await approveTourRequest(id);
    const data = await res.json();
    if (!res.ok) {
      return response(false, "", data?.validations);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }

    throw err;
  }
  revalidatePath("/tour-requests");
  redirect(
    `/tour-requests?msg=${encodeURI(
      "Tour Request has been approved successfully"
    )}`
  );
};

export const searchTourRequestAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);
  FormSchemaSearch.validateSync(fields, { abortEarly: false });

  redirect(`/dashboard/tour-requests?q=${fields.q}`);
};
