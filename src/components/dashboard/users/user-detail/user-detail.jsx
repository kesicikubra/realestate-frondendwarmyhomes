"use client"
import { updateUserAction } from "@/actions/users-action";
import SubmitButton from "@/components/common/buttons/submit-button";
import { initialResponse, isInvalid } from "@/helpers/form-validation";
import React from "react";
import { useFormState } from "react-dom";
import "./style.scss";
import UserDeleteButton from "./user-delete-button";
import Image from "next/image";

const UserDetail = ({ data, userId }) => {
    const {id, first_name, last_name, phone_number, email, user_roles, photoResponse}=data[0]
    const [state, dispatch] = useFormState(
        updateUserAction,
        initialResponse
      );
      console.log("data",user_roles);
  return (
    <>
      <fieldset className="border rounded-4 py-3">
        <legend className="float-none w-auto px-3">
          Edit User Role
        </legend>
        <div className="container user-detail-container w-75">
       <div className="row">
        <div className="col-12 col-md-3">
        <Image
              src={
                photoResponse?.data
                  ? `data:image/jpeg;base64,${photoResponse.data}`
                  : "/images/icons/user-photo.svg"
              }
              alt="profile photo"
              width={500}
              height={500}
              className="img-fluid"
            />
        </div>
        <div className="col-12 col-md-9">
        <form className="edit-user-form" noValidate action={dispatch}>
        <input type="hidden" name="id" value={userId} />
        <div className="row">
          <div className="col-12 col-lg-6">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <div className="input-group mb-4">
              <input
              disabled
                type="text"
                className={`form-control rounded-3 ${isInvalid(
                  state?.errors?.first_name
                )}`}
                id="first_name"
                name="first_name"
                aria-describedby="basic-addon3"
               defaultValue={first_name}
              />
              <div className="invalid-feedback">
                {state?.errors?.first_name}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <div className="input-group mb-4">
              <input
              disabled
                type="text"
                className={`form-control rounded-3 ${isInvalid(
                  state?.errors?.last_name
                )}`}
                id="last_name"
                name="last_name"
                aria-describedby="basic-addon3"
                defaultValue={last_name}
              />
              <div className="invalid-feedback">
                {state?.errors?.last_name}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="phone_number" className="form-label">
              Phone
            </label>
            <div className="input-group mb-4">
              <input
              disabled
                type="text"
                className={`form-control rounded-3 ${isInvalid(
                  state?.errors?.phone_number
                )}`}
                id="phone_number"
                name="phone_number"
                aria-describedby="basic-addon3"
                defaultValue={phone_number}
              />
              <div className="invalid-feedback">
                {state?.errors?.phone_number}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="title" className="form-label">
              Email
            </label>
            <div className="input-group mb-4">
              <input
              disabled
                type="email"
                className={`form-control rounded-3 ${isInvalid(
                  state?.errors?.email
                )}`}
                id="email"
                name="email"
                aria-describedby="basic-addon3"
                defaultValue={email}
              />
              <div className="invalid-feedback">
                {state?.errors?.email}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="user_roles" >Role</label>
            <div className="mt-2">
            <select
              className={`form-select mb-3 ${isInvalid(
                state?.errors?.user_roles
              )}`}
              aria-label="Default select example"
              name="user_roles"
              defaultValue={user_roles[0]?.toUpperCase()}
            >
              <option selected disabled>
                Choose role
              </option>
              <option value="ADMIN">
              <input className="form-check-input" type="checkbox" value="ADMIN"/>
                Admin
              </option>
              <option value="MANAGER">
              <input className="form-check-input" type="checkbox" value="MANAGER"/>
                Manager
              </option>
              <option value="CUSTOMER">
              <input className="form-check-input" type="checkbox" value="CUSTOMER"/>
                Customer
              </option>
            </select>
            </div>
            <div className="invalid-feedback">
              {state?.errors?.user_roles}
            </div>
          </div>
        </div>

        <div className="buttons">
          <UserDeleteButton id={userId} title="Delete" width="100px"/>
          <SubmitButton title="Update" />
        </div>
      </form>
        </div>
       </div>
        </div>
      </fieldset>
    </>
  );
};

export default UserDetail;

{/* <div className={`form-group mb-3 ${isInvalid(state?.errors?.user_roles)}`}>
  <label htmlFor="user_roles">Rol seçiniz:</label>
  <div id="user_roles">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" name="user_roles" value="ADMIN" id="roleAdmin"/>
      <label className="form-check-label" htmlFor="roleAdmin">Admin</label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="checkbox" name="user_roles" value="MANAGER" id="roleManager"/>
      <label className="form-check-label" htmlFor="roleManager">Manager</label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="checkbox" name="user_roles" value="CUSTOMER" id="roleCustomer"/>
      <label className="form-check-label" htmlFor="roleCustomer">Customer</label>
    </div>
  </div>
</div> */}