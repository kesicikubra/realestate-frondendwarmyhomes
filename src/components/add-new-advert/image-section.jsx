"use client";
import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import "./image.scss";
import { TiDelete } from "react-icons/ti";

const AddAdvertImageSection = ({ state }) => {
  const [imageFields, setImageFields] = useState([
    { id: 1, dataid: 0, name: `images[0].image`, multiple: true },
    { id: 2, dataid: 0, name: `images[0].featured`, type: "hidden", value: "true" }, // Set default featured image
  ]);

  const handleAddImage = () => {
    // Generate a unique ID for the new image field
    const nextDataId = Math.max(...imageFields.map((field) => field.dataid)) + 1;
    const nextId = Math.max(...imageFields.map((field) => field.id)) + 1;

    setImageFields([
      ...imageFields,
      { id: nextId, dataid: nextDataId, name: `images[${nextDataId}].image`, multiple: true },
      { id: nextId + 1, dataid: nextDataId, name: `images[${nextDataId}].featured`, type: "hidden", value: "false" }, // Featured image initially false for new fields
    ]);
  };

  const handleRemoveImage = (id) => {
    setImageFields(imageFields.filter((field) => field.id !== id));
  };

  return (
    <>
      <fieldset className="border rounded-3">
        <legend className="float-none w-auto px-3">Image</legend>
        <div className="photo-container">
          {imageFields.map((field) => (
            <div key={field.id} className="image-field d-flex direction-column mb-1">
              <input 
                type="file" 
                className={`form-control ${!state.success && state?.data?.message === "Error: Image not found!" ? 'is-invalid' : ''}`} 
                {...field} 
              />
              {field.type !== "hidden" && ( // Only show delete icon for image fields
                <TiDelete size={30} color="rgb(149,23,99)" onClick={() => handleRemoveImage(field.id)} />
              )}
            </div>
          ))}
          <div className="add-plus">
            <FaCirclePlus size={70} onClick={handleAddImage} color="rgb(149,23,99)" />
          </div>
          {!state.success && state?.data?.message === "Error: Image not found!" && (
            <div className="invalid-feedback d-block mt-2">
              {state?.data?.message}
            </div>
          )}
        </div>
      </fieldset>
    </>
  );
};

export default AddAdvertImageSection;

