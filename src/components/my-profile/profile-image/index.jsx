"use client";
import { createProfileImageAction, deleteProfileImageAction } from "@/actions/profile-image-action";
import SubmitButton from "@/components/common/buttons/submit-button";
import { initialResponse } from "@/helpers/form-validation";
import Image from "next/image";
import React from "react";
import { useFormState } from "react-dom";
import "./style.scss";
import { swalAlert, swalConfirm } from "@/helpers/swal";

const AddProfileImageSection = ({ photoResponse }) => {
  const [state, dispatch] = useFormState(
    createProfileImageAction,
    initialResponse
  );
  
  const handleDelete = async () => {
		const res = await swalConfirm("Are you sure to delete");
		if (!res.isConfirmed) return;

		try {
			const res = await deleteProfileImageAction();
		} catch (err) {
			console.log(err);
			swalAlert(err.message, "error");
		}
	};

  return (
    <div className="container">
      <div className="row  justify-content-center mb-3">
        <div className="col-sm-9 col-md-6 col-lg-12 col-xl-9">
          <fieldset className="border photo-border rounded-4 p-3">
            <legend className="float-none w-auto px-3">Profile Photo</legend>
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
            <form action={dispatch}>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Profile Photo
                </label>
                <input className="form-control" type="file" id="formFile" name="photo" />
              </div>
              <div className="d-flex justify-content-center gap-2  w-100">
                <SubmitButton title="Save" />
                {
                  !photoResponse?.data ? null : <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                }
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default AddProfileImageSection;
