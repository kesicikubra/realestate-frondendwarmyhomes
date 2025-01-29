"use client"
import React from "react";
import "./style.scss";
import { initialResponse } from "@/helpers/form-validation";
import { useFormState } from "react-dom";
import SearchButton from "@/components/common/buttons/search-button";
import { searchTourRequestAction } from "@/actions/tour-requests-action";

const DashboardTourRequestsSearchBar = () => {

  const [state, dispatch] = useFormState(searchTourRequestAction,initialResponse);
   
  return (
    <form noValidate action={dispatch} className="tour-requests-search">
      <div className="input-group">
        <input 
            type="text" 
            className="form-control"
            name="q"
            id="q" 
            placeholder = "Type something..."
            />
        <SearchButton />
      </div>
      
    </form>
  );
};

export default DashboardTourRequestsSearchBar;
