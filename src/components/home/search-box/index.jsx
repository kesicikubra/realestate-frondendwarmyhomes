"use client";
import React from "react";
import { useFormState } from "react-dom";
import "./search.scss";
import SearchButton from "@/components/common/buttons/search-button";
import {
  searchHomePageAdvertsAction,
  searchPropertiesPageAdvertsAction,
} from "@/actions/advert-action";
import { initialResponse } from "@/helpers/form-validation";
import { useDictionary } from "@/helpers/providers/lang-switcher-provider";

const SearchBox =async ({ advertTypeData, categoryNamesData }) => {
  const [state, dispatch] = useFormState(
    searchPropertiesPageAdvertsAction,
    initialResponse
  );
  const t=await useDictionary()


  return (
    <div className="search-box">
      <form action={dispatch} noValidate>
        <div
          className="btn-group search-radios"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <div>
            <input
              type="radio"
              className="btn-check"
              name="advert_type_id"
              id="sale"
              value={1}
              autoComplete="off"
            />
            <label className={`btn btn-outline-primary`} htmlFor="sale">
              {t.home.forSale}
            </label>
            <input
              type="radio"
              className="btn-check"
              name="advert_type_id"
              id="rent"
              value={2}
              autoComplete="off"
            />
            <label className={`btn btn-outline-primary`} htmlFor="rent">
            {t.home.forRent}
            </label>
          </div>
        </div>
        <div className="search-group">
          <input type="text" name="q" className="form-control" />
          <SearchButton />
        </div>
        <div className="type-radio">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="category_id"
              value=""
              id="all"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="all">
              {t.home.all}
            </label>
          </div>
          {categoryNamesData?.content.slice(0, 4).map((item) => (
            <div className="form-check" key={item.id}>
              <input
                className="form-check-input"
                type="radio"
                name="category_id"
                id={item.title}
                value={item.id}
              />
              <label className="form-check-label" htmlFor={item.title}>
                {item.title}
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
