"use client";
import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import "./style.scss";
import SubmitButton from "@/components/common/buttons/submit-button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useFormState } from "react-dom";
import { initialResponse } from "@/helpers/form-validation";
import { searchPropertiesPageAdvertsAction } from "@/actions/advert-action";
import { useDictionary } from "@/helpers/providers/lang-switcher-provider";

const SearchAdvertForm = async ({
  advertTypeData,
  categoryNamesData,
  advertsCityData,
  searchParams,
  t
}) => {
  const [state, dispatch] = useFormState(
    searchPropertiesPageAdvertsAction,
    initialResponse
  );
  const { q, advert_type_id, category_id, price_start, price_end } =
    searchParams;
  const [accordion, setAccordion] = useState(0);

  const handleArrow = () => {
    accordion === 0 ? setAccordion(180) : setAccordion(0);
  };

  

  return (
    <div className="col-12 col-md-6 col-lg-3 search-form">
      <p>
        <button
          className="btn btn-primary d-md-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={() => handleArrow()}
        >
          <span>{t.properties.findYourDreamHouse}</span>
          <span style={{ transform: `rotatex(${accordion}deg)` }}>
            <IoIosArrowDown />
          </span>
        </button>
      </p>
      {!state?.success && state?.message ? (
        <div className="alert alert-danger">{state.message}</div>
      ) : (
        ""
      )}
      <form action={dispatch}>
        <div className="collapse d-md-block" id="collapseExample">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <h5>{t.properties.findYourHome}</h5>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <HiMagnifyingGlass />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What are you looking for?"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="q"
                      defaultValue={q}
                    />
                  </div>
                </div>
                <div className="col-6 col-md-12">
                  <h5>Type</h5>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="advert_type_id"
                      id="all"
                      value=""
                    />
                    <label className="form-check-label" htmlFor="all">
                      All
                    </label>
                  </div>
                  {advertTypeData?.slice(0, 2).map((item) => (
                    <div className="form-check" key={item.id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="advert_type_id"
                        id={item.title}
                        value={item.id}
                        defaultChecked={advert_type_id}
                      />
                      <label className="form-check-label" htmlFor="rent-radio">
                        {item.title}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="col-6 col-md-12">
                  <h5>Category</h5>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category_id"
                      id="all"
                      value=""
                    />
                    <label className="form-check-label" htmlFor="all">
                      All
                    </label>
                  </div>
                  {categoryNamesData?.content.map((item, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category_id"
                        id={item.title}
                        value={item.id}
                        defaultChecked={category_id}
                      />
                      <label className="form-check-label" htmlFor={item.title}>
                        {item.title}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="col-12">
                  <h5>Price Range</h5>
                  <div className="d-flex gap-3 range">
                    <input
                      type="number"
                      aria-label="First name"
                      className="form-control"
                      placeholder="Min"
                      name="price_start"
                      id="price_start"
                      defaultValue={price_start}
                    />
                    <input
                      type="number"
                      aria-label="Last name"
                      className="form-control"
                      placeholder="Max"
                      name="price_end"
                      id="price_end"
                      defaultValue={price_end}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <h5>Location</h5>
                  <select
                    className="form-select mb-5"
                    aria-label="Default select example"
                    name="cityId"
                  >
                    <option selected disabled>
                      City
                    </option>
                    {advertsCityData?.map((item) => (
                      <option key={item.cityId} value={item.cityId}>
                        {item.cityName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <SubmitButton icon={<HiMagnifyingGlass />} title="Search" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchAdvertForm;
