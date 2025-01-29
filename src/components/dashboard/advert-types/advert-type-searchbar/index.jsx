import React from "react";
import "./style.scss";
import SearchButton from "@/components/common/buttons/search-button";
import { initialResponse } from "@/helpers/form-validation";
import { searchAdvertTypeAction } from "@/actions/advert-type-action";
import { useFormState } from "react-dom";

const AdvertTypeSearchBar = () => {
  const [state, dispatch] = useFormState(
    searchAdvertTypeAction,
    initialResponse
  );

  return (
    <>
      
      <form noValidate action={dispatch} className="advert-type-search">
        <div className="input-group">
          <input type="text" className="form-control" name="qs" id="qs" />
          <SearchButton />
        </div>
      </form>
    </>
  );
};

export default AdvertTypeSearchBar;
