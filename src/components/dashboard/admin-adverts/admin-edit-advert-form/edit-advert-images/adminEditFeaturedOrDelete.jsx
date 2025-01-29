"use client";
import Image from "next/image";
import React, { useState } from "react";
import "./adminEditFeaturedOrDelete.scss";
import { useFormState } from "react-dom";
import { initialResponse } from "@/helpers/form-validation";
import {
  deleteAdminImageAction,
  deleteImageAction,
  updateAdminImageAction,
} from "@/actions/image-action";
import SubmitButton from "@/components/common/buttons/submit-button";
import { swalAlert, swalConfirm } from "@/helpers/swal";

const DashboardEditImageToFeaturedOrDelete = ({ advertData }) => {
  console.log("advertDAta", advertData);
  const { images, id: advertId, slug } = advertData;
  let slugRedirect = slug + "?id=" + advertId;
  const [imageId, setImageId] = useState([]);
  const [state, dispatch] = useFormState(
    updateAdminImageAction,
    initialResponse
  );
  const handleGetImageId = (e) => {
    if (imageId.includes(e.target.value) == false) {
      setImageId((prev) => [...prev, e.target.value]);
    } else if (imageId.includes(e.target.value) == true) {
      let abc = imageId.filter((item) => item !== e.target.value);
      setImageId(abc);
    }
  };
  const stringifyedImageIds = imageId?.join();

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await swalConfirm("Are you sure to delete");
    if (!res.isConfirmed) return;

    try {
      const res = await deleteAdminImageAction(
        stringifyedImageIds,
        slugRedirect
      );
      setImageId([]);
    } catch (err) {
      console.log(err);
      swalAlert(err.message, "error");
    }
  };

  return (
    <form noValidate action={dispatch} className="image-form">
      <div className="advert-image">
        {images.map((item) => (
          <div key={item.id} className="img-container">
            <Image
                src={`data:image/jpeg;base64,${item?.imageData}`}
                style={{ filter: item.suitable === false ? 'blur(10px)' : 'none' }}
                alt={item.id}
                width={187}
                height={123}
              />
            
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="imageId"
                value={item.id}
                onClick={(e) => handleGetImageId(e)}
              />
            </div>

            {item.featured == true && (
              <div className="featured-text">
                <p>Featured</p>
              </div>
            )}

            {item.suitable == false && (
              <div className="not-suitable">
                <p>NOT SUITABLE</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="action-buttons">
        <SubmitButton title="Set as Featured" />
        <button className="btn btn-secondary" onClick={(e) => handleDelete(e)}>
          Delete
        </button>
      </div>
    </form>
  );
};

export default DashboardEditImageToFeaturedOrDelete;
