"use client"
import React from "react";
import "./style.scss";
import { initialResponse } from "@/helpers/form-validation";
import { useFormState } from "react-dom";
import SearchButton from "@/components/common/buttons/search-button";
import { searchUsersListAction } from "@/actions/users-action";

const UsersListSearchBar = () => {

  const [state, dispatch] = useFormState(searchUsersListAction,initialResponse);
   
  return (
    <form noValidate action={dispatch} className="users-search">
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

export default UsersListSearchBar;
