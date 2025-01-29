"use client"
import React from "react";
import "./style.scss";
import { initialResponse } from "@/helpers/form-validation";
import { useFormState } from "react-dom";
import { searchContactMessagesAction } from "@/actions/contact-messages-action";
import SearchButton from "@/components/common/buttons/search-button";

const ContactMessagesSearchBar = () => {

  const [state, dispatch] = useFormState(searchContactMessagesAction,initialResponse);
   
  return (
    <form noValidate action={dispatch} className="contact-messages-search">
      <div className="input-group w-50">
        <input 
            type="text" 
            className="form-control"
            name="q"
            id="q" 
            placeholder = "Type something..."
            />
      </div>
      <select
              className="form-select"
              aria-label="status"
              name='status'
              id='status'
            >
                <option value="all">All Messages</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
        </select>
        <SearchButton />
    </form>
  );
};

export default ContactMessagesSearchBar;
