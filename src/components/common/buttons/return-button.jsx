"use client"
import React from "react";
import { useFormState } from "react-dom";
import { initialResponse } from "@/helpers/form-validation";
import { returnButtonAction } from "@/actions/return-action";

const ReturnButton = (path) => {
    const [state, dispatch] = useFormState(returnButtonAction, initialResponse);
    
  return (
    <form action={dispatch} noValidate>
      <input type="hidden" name="path" value={path.path} />
      <button type="submit" className="btn btn-secondary">
        Return
      </button>
    </form>
  );
};

export default ReturnButton;
