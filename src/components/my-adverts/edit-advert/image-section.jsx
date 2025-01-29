"use client";
import React from "react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import "./image.scss";
import { TiDelete } from "react-icons/ti";
import { useFormState } from "react-dom";
import { createImageAction } from "@/actions/image-action";
import { initialResponse } from "@/helpers/form-validation";
import SubmitButton from "@/components/common/buttons/submit-button";

const AddAdvertImageSection = ({advertId}) => {
  const [state, dispatch] = useFormState(
    createImageAction,
    initialResponse)
    
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("upload_preset", "friendsbook");

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    const data = await fetch(URL, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

  };

  const handleCheck = () => {
    alert("selam");
  };

  return (
   
    <form noValidate action={dispatch}>
      <fieldset className="border rounded-3">
      <legend className="float-none w-auto px-3">Image</legend>
      <div className="photo-container" onSubmit={handleSubmit}>
        <div className="drag-drop" {...getRootProps()}>
          <input name="advertId" type="hidden" value={`${advertId}`}/>
          <input {...getInputProps()} type="file"
        name="multipartFile"/>
          <div className="add-plus">
            <FaCirclePlus size={70} />

            <div className="drag-text">
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag & drop files here, or click to select files</p>
              )}
            </div>
          </div>
        </div>

        <div className="photo">
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                <input className="form-check-input" type="radio" name="featured"/>
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={200}
                  height={150}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
                <span
                  type="button"
                  className="deleteIcon"
                  onClick={() => removeFile(file.name)}
                >
                  <TiDelete size={30} />
                </span>
                <span type="button" className="checkIcon" onClick={handleCheck}>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </fieldset>
    <div className="button mt-5 d-flex align-items-center justify-content-center">
        <SubmitButton title="Upload" />
      </div>
    </form>
   
  );
};

export default AddAdvertImageSection;
