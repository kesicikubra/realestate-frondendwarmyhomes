"use server";
import {
  convertFormDataToJson,
  getYupErrors,
  response,
} from "@/helpers/form-validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";
import {
  createAdvertFromCustomer,
  deleteAdvertFromAdmin,
  updateAdvertFromAdmin,
  updateAdvertFromAuth,
} from "@/services/advert-service";

const advertSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 chars")
    .max(50, "Title must be at most 50 chars")
    .required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  advert_type_id: Yup.string().required("Required"),
  country_id: Yup.string().required("Required"),
  city_id: Yup.string().required("Required"),
  district_id: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  location: Yup.string(),
  category_id: Yup.string().required("Required"),
  properties: Yup.string(),
 // image: Yup.string().required("Required"),
});

const FormSchemaSearch = Yup.object({
  q: Yup.string(),
  advert_type_id: Yup.string(),
  category_id: Yup.string(),
});

const formSchemaUpdate = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 chars")
    .max(50, "Title must be at most 50 chars")
    .required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  advert_type_id: Yup.string().required("Required"),
  country_id: Yup.string().required("Required"),
  city_id: Yup.string().required("Required"),
  district_id: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  location: Yup.string(),
  category_id: Yup.string().required("Required"),
  is_active:Yup.string(),
})


export const createAdvertAction = async (prevState, formData) => {
  try {
    // files.forEach((file) => formData.append("multipartFile", file));
    console.log("formdata",formData)
    const jsonData= convertFormDataToJson(formData);
    advertSchema.validateSync(jsonData, { abortEarly: false });
    const res = await createAdvertFromCustomer(formData);
    const data = await res.json();
    console.log(data);
    
    if (!res.ok) {
      return response(false, "", data?.validations, data);
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return getYupErrors(err.inner);
    }
    throw err;
  }

  revalidatePath("/my-properties");
  redirect(`/my-properties?msg=${encodeURI("Advert has been created.")}`);
};

export const updateAdvertFromAuthAction = async (prevState, formData) => {
  try {
    const fields = convertFormDataToJson(formData);
    formSchemaUpdate.validateSync(fields, { abortEarly: false });
    const transformedProperties = [];
    Object.entries(fields).forEach(([key, value]) => {
      if (!isNaN(key)) {
        transformedProperties.push({
          keyId: parseInt(key), // Anahtarı sayıya dönüştürme
          value: value
        });
      }
    });
    const finalLocation = {
      latitude:fields.location.split(",")[0],
      longitude:fields.location.split(",")[1]
    }
    const payload = {
      ...fields,
      price:Number(fields.price),
      category_id:Number(fields.category_id),
      advert_type_id:Number(fields.advert_type_id),
      country_id:Number(fields.country_id),
      city_id:Number(fields.city_id),
      district_id:Number(fields.district_id),
      properties:transformedProperties,
      location:finalLocation,
      is_active:Boolean(fields.is_active)
    }
    const res = await updateAdvertFromAuth(payload);
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

  revalidatePath("/my-properties");
  redirect(`/my-properties?msg=${encodeURI("Advert has been updated")}`);
};

export const updateAdvertFromAdminAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);
  try {
    // formSchemaUpdate.validateSync(fields, { abortEarly: false });
    const transformedProperties = [];
    // Sayısal anahtarlara sahip değerleri `properties` dizisine dönüştürme
    Object.entries(fields).forEach(([key, value]) => {
      if (!isNaN(key)) {
        transformedProperties.push({
          keyId: parseInt(key), // Anahtarı sayıya dönüştürme
          value: value
        });
      }
    });
    const finalLocation = {
      latitude:fields.latitude,
      longitude:fields.longitude
    }
    const payload = {
      ...fields,
      properties:transformedProperties,
      location:finalLocation,
    }
    const res = await updateAdvertFromAdmin(payload);
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

  revalidatePath(`/dashboard/adverts`);
  redirect(`/dashboard/adverts?msg=${encodeURI("Advert has been updated")}`);
};

export const searchHomePageAdvertsAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);
  FormSchemaSearch.validateSync(fields, { abortEarly: false });
 

  redirect(
    `/properties?q=${fields.q}&advert_type_id=${fields.status || ""}&category_id=${fields.category || ""}`
  );
};

export const searchPropertiesPageAdvertsAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);
  FormSchemaSearch.validateSync(fields, { abortEarly: false });

  redirect(
    `/properties?q=${fields.q}&advert_type_id=${fields. advert_type_id || ""}&category_id=${fields.category_id || ""}&price_start=${fields.price_start || ""}&price_end=${fields.price_end || ""}&city_id=${fields.cityId || ""}`
  );
};

export const searchDashboardAdminAdvertListAction = async (prevState, formData) => {
  const fields = convertFormDataToJson(formData);
  FormSchemaSearch.validateSync(fields, { abortEarly: false });

  redirect(
    `/dashboard/adverts?q=${fields.q}&advert_type_id=${fields.advert_type_id || ""}&category_id=${fields.category_id || ""}&status=${fields.status}`
  );
};

export const deleteAdminAdvertListAction = async (id) => {
  if (!id) throw new Error("id is missing");
  const res = await deleteAdvertFromAdmin(id);
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.message);
  }
  revalidatePath("/dashboard/adverts");
  redirect(
    `/dashboard/adverts?msg=${encodeURI(
      "Advert has been deleted."
    )}`
  );
};

export const deleteAdvertFromUserDetailAction = async (id,userId) => {

  if (!id) throw new Error("id is missing");
  if (!userId) throw new Error("UserId is missing");

  const res = await deleteAdvertFromAdmin(id);
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.message);
  }
  revalidatePath(`/dashboard/users/${userId}`);
  redirect(
    `/dashboard/users/${userId}?msg=${encodeURI(
      "Advert has been deleted."
    )}`
  );
};