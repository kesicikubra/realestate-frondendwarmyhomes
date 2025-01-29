"use client";
import React, { useState } from "react";

const AddPropertyPropertiesSection = ({ categories,state }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  let propertyFilter = categories.filter(
    (item) =>
      item.id== selectedCategory
  );
  let categoryKeys=propertyFilter[0]?.categoryPropertyKey
  return (
    <fieldset className="border rounded-3">
      <legend className="float-none w-auto px-3">Properties</legend>
      <div className="row container">
        <div className="col-12">
          <label htmlFor="category_id">Category</label>
          <select
             className={`form-select  ${
              state?.errors?.category_id ? "is-invalid" : ""
            }`}
            aria-label="Default select example"
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category_id"
            id="category_id"
          >
            <option selected disabled>
              Choose category
            </option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{state?.errors?.category_id}</div>
        </div>
        {!categoryKeys ? null : categoryKeys.map((item,index) =>
          item.keyType === "BOOLEAN" ? (
            <div className="col-12 col-md-4" key={item.name}>
              <input type="hidden" name={`properties[${index}].keyId`} value={item.id}/>
              <label htmlFor={`properties[${index}].value`}>{item.name}</label>
              <select
                className="form-select mb-2"
                aria-label="Default select example"
                id={`properties[${index}].value`}
                name={`properties[${index}].value`}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          ) : item.keyType === "NUMBER" ? (
            <div className="col-12 col-md-4" key={item.name}>
              <input type="hidden" name={`properties[${index}].keyId`} value={item.id}/>
              <label htmlFor={`properties[${index}].value`}>{item.name}</label>
              <div className="input-group mb-2">
                <input
                  type="number"
                  className={`form-control rounded-3 `}
                  id={`properties[${index}].value`}
                  name={`properties[${index}].value`}
                />
              </div>
            </div>
          ) : item.keyType === "TEXT" ? (
            <div className="col-12 col-md-4" key={item.name}>
              <input type="hidden" name={`properties[${index}].keyId`} value={item.id}/>
              <label htmlFor={`properties[${index}].value`}>{item.name}</label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className={`form-control rounded-3 `}
                  id={`properties[${index}].value`}
                  name={`properties[${index}].value`}
                />
              </div>
            </div>
          ) : null
        )}
      </div>
    </fieldset>
  );
};

export default AddPropertyPropertiesSection;