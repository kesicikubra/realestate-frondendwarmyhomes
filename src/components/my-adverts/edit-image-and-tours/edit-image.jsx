"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import "./editAdvertImage.scss"
import { TiDelete } from "react-icons/ti";
import SubmitButton from "@/components/common/buttons/submit-button";
import { useFormState } from "react-dom";
import { initialResponse } from "@/helpers/form-validation";
import { createImageAction } from "@/actions/image-action";
import EditImageToFeaturedOrDelete from "./edit-featured-or-delete";
import Spacer from "@/components/common/misc/spacer";

const EditAdverImage = ({advertById}) => {
  const{id}=advertById
  const [state, dispatch] = useFormState(createImageAction, initialResponse);
  const [imageFields, setImageFields] = useState([
    { id:1, dataid: 0, name: `imageRequestList[0].image`, multiple: true },
    { id:2, dataid: 0, name: `imageRequestList[0].featured`, type: "hidden", value: "false" }, // Set default featured image
  ]);

  const handleAddImage = () => {
    // Generate a unique ID for the new image field
    const nextDataId = Math.max(...imageFields.map((field) => field.dataid)) + 1 ;
    const nextId = Math.max(...imageFields.map((field) => field.id)) + 1 ;
    
    setImageFields([
      ...imageFields,
      { id:nextId, dataid: nextDataId, name: `imageRequestList[${nextDataId}].image`, multiple: true },
      { id:nextId + 1, dataid: nextDataId, name: `imageRequestList[${nextDataId}].featured`, type: "hidden", value: "false" }, // Featured image initially false for new fields
    ]);
  };

  const handleRemoveImage = (id) => {
    setImageFields(imageFields.filter((field) => field.id !== id));
  };

  

  return (
    <>
    <fieldset className="border rounded-3">
      <legend className="float-none w-auto px-3">Image</legend>
      <form action={dispatch}>
        <input type="hidden" name="advertId" value={id} />
      <div className="photo-container">
        {imageFields.map((field) => (
          <div key={field.id} className="image-field">
            <input type="file" {...field} />
            {field.type !== "hidden" && ( // Only show delete icon for image fields
              <TiDelete size={30}  color="rgb(149,23,99)" onClick={() => handleRemoveImage(field.id)} />
            )}
          </div>
        ))}
        <div className="add-plus">
          <FaCirclePlus size={70} onClick={handleAddImage} color="rgb(149,23,99)"/>
        </div>
        <div>
          <p>Choose and update new images</p>
        </div>
      </div>
      <div className="mx-auto text-center">
        <SubmitButton title="Upload"/>
      </div>
      </form>
    </fieldset>
    <Spacer/>
    <EditImageToFeaturedOrDelete advertById={advertById}/>
    </>
  );
};

export default EditAdverImage;
