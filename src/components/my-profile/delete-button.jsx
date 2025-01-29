"use client";
import { deleteMyProfileAction } from "@/actions/my-profile-action";
import React from "react";
import { useFormState } from "react-dom";
import { initialResponse } from "@/helpers/form-validation";
import "./delete-button.scss";
import { swalConfirm } from "@/helpers/swal";
import SubmitButton from "../common/buttons/submit-button";
import { signOut } from "next-auth/react";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { useState } from "react";

const MyProfileDeleteButton = () => {
  const [state, dispatch] = useFormState(
    deleteMyProfileAction,
    initialResponse
  );
  const [showPassword, setShowPassword] = useState(false)

  const handleDeleteMyProfile = async (formData) => {
    const res = await swalConfirm("Are you sure to delete");
    if (!res.isConfirmed) return;
    if (res.isConfirmed) dispatch(formData);
    signOut({ callbackUrl: "/" });
  };

  return (
    <form
      action={(formData) => handleDeleteMyProfile(formData)}
      noValidate
      className="d-flex flex-column align-items-center"
    >
      <div className="input password-group d-flex flex-column align-items-center">
        <label htmlFor="password">
          If you want to delete your account enter your password and click
          delete button! If you delete your account, all related records with
          this account will also be deleted permanently.
        </label>
        <input
          id="password"
          name="password"
          type={`${showPassword ? "text" : "password"}`}
          placeholder="Enter your password"
          className={`form-control rounded-2 ${
            state?.errors?.password ? "is-invalid" : ""
          }`}
        />
        {
					showPassword ? <PiEye size={25} onClick={()=> setShowPassword(prev => !prev)} /> : <PiEyeClosed size={25} onClick={()=> setShowPassword(prev => !prev)} />
				  }
        <SubmitButton title="Delete" variant="danger" />
      </div>
    </form>
  );
};

export default MyProfileDeleteButton;
