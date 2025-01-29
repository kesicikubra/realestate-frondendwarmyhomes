"use server";
import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import {
  getAdvertHaveTheMostTourRequest,
  getAdvertsByTheDateRange,
  getTourRequestsByTheDateRange,
  getUsersByRoles,
} from "@/services/reports-service";
import * as Yup from "yup";

const FormSchema = Yup.object({
  beginDate: Yup.string().required("Required"),
  endDate: Yup.string().required("Required"),
  categoryTitle: Yup.string(),
  typeTitle: Yup.string(),
  status: Yup.string(),
});

const FormSchemaAmount = Yup.object({
  amount: Yup.string()
    .min(1, "The Amount must be greater than zero"),
});

const FormSchemaRole = Yup.object({
  role: Yup.string(),
});

const FormSchemaTourRequest = Yup.object({
  beginDate: Yup.string().required("Required"),
  endDate: Yup.string().required("Required"),
  status: Yup.string(),
});

export const getAdvertsByTheDateRangeAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    FormSchema.validateSync(fields, { abortEarly: false });
    console.log(fields);
    const res = await getAdvertsByTheDateRange(
      fields.beginDate,
      fields.endDate,
      fields.categoryTitle,
      fields.typeTitle,
      fields.status
    );
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      return response(false, "", data?.validations);
    }
    return response(true, "", "", data);
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }
    throw err;
  }
};

export const getAdvertHaveTheMostTourRequestAction = async (prevState, formData) => {
  const amountValue = Number(formData.get('amount'));
  const res = await getAdvertHaveTheMostTourRequest(amountValue);
  const data = await res.json();
  console.log("data",data);
  return response(true, "", "", data);
};

export const getUsersByRolesAction = async (prevState,formData) => {
  const roleValue = formData.get('role');
    const res = await getUsersByRoles(roleValue);   
    const data=await res.json()
    console.log("data",data);
    return response(true, "", "", data);

};

export const getTourRequestsByTheDateRangeAction = async (prevState,formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    FormSchemaTourRequest.validateSync(fields, { abortEarly: false });
    console.log(fields);
    const res = await getTourRequestsByTheDateRange(
      fields.beginDate,
      fields.endDate,
      fields.status
    );
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      return response(false, "", data?.validations);
    }
    return response(true, "", "", data);
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }
    throw err;
  }
};
