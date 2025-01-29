"use client";
import React from "react";
import { useFormState } from "react-dom";
import { initialResponse } from "@/helpers/form-validation";
import { searchDashboardAdminAdvertListAction } from "@/actions/advert-action";
import "./style.scss";
import SearchButton from "@/components/common/buttons/search-button";

const AdminAdvertsSearchBar = ({ categoriesData, advertTypesData }) => {
  const [state, dispatch] = useFormState(
    searchDashboardAdminAdvertListAction,
    initialResponse
  );
  
  return (
    <form noValidate action={dispatch} className="admin-adverts-search">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          name="q"
          id="q"
          placeholder="Type something..."
        />
      </div>

      <div className="select-menus">
        <select
          className="form-select"
          aria-label="Default select example"
          name="category_id"
          id="category_id"
        >
          <option disabled selected>
            Category
          </option>
          {categoriesData?.map((category) => (
            <option key={category.id} value={category.id}>{category.title}</option>
          ))}
        </select>
        <select
          className="form-select"
          aria-label="Default select example"
          name="advert_type_id"
          id="advert_type_id"
        >
          <option selected disabled>
            Type
          </option>
          {advertTypesData?.map((type) => (
            <option key={type.id} value={type.id}>{type.title}</option>
          ))}
        </select>
        <select
          className="form-select"
          aria-label="Default select example"
          name="status"
          id="status"
        >
          <option value="">All Adverts</option>
          <option value="0">Pending</option>
          <option value="1">Activated</option>
          <option value="2">Rejected</option>
        </select>
        <div className="search-btn">
          <SearchButton />
        </div>
      </div>
    </form>
  );
};

export default AdminAdvertsSearchBar;
