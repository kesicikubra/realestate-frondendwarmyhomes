"use client"
import React from "react";
import "./style.scss";
import SearchButton from "@/components/common/buttons/search-button";
import { initialResponse } from "@/helpers/form-validation";
import { useFormState } from "react-dom";
import { searchCategoryAction } from "@/actions/category-action";

const CategorySearchBar = () => {

  const [state, dispatch] = useFormState(searchCategoryAction,initialResponse);
   
  return (
    <form noValidate action={dispatch} className="category-search">
      <div className="input-group">
        <input 
            type="text" 
            className="form-control"
            name="q"
            id="q" 
            placeholder="Type something..."
            />
        <SearchButton />
      </div>
    </form>
  );
};

export default CategorySearchBar;

