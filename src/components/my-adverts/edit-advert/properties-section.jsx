"use client";
import React, { useState } from "react";

const AddPropertyPropertiesSection = ({ categories, advertById }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  let propertyFilter = categories.filter((item) => item.id == selectedCategory);

  return (
    <fieldset className="border rounded-3">
      <legend className="float-none w-auto px-3">Properties</legend>
      <div className="row container">
        <div className="col-12">
          <label htmlFor="category_id">Category</label>
          <select
            className="form-select mb-5"
            aria-label="Default select example"
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category_id"
            id="category_id"
            defaultValue={advertById?.category_id}
          >
            <option selected disabled>
              Choose category
            </option>
            {categories.map((item) => (
              <option key={item.title} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" name="properties" value={[]} />
                {advertById?.properties.map((item) =>
                  item.key_type === "BOOLEAN" ? (
                    <div className="col-12 col-lg-4" key={item.property_key_id}>
                      <div className="input-group mb-4">
                      <label htmlFor={`${item.property_key_id}`}>
                        {item.key}
                      </label>
                      <select
                        className={`form-select rounded-3 w-100`}
                        aria-label="Default select example"
                        name={`${item.property_key_id}`}
                        defaultValue={item.value}
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                      <div className="invalid-feedback"></div>
                    </div>
                    </div>
                  ) : (
                    <div className="col-12 col-lg-4" key={item.property_key_id}>
                      <div className="input-group mb-4">
                      <label htmlFor={`${item.property_key_id}`}>
                        {item.key}
                      </label>
                      <input
                        type={
                          item.key_type === "NUMBER"
                            ? "number"
                            : item.key_type === "TEXT"
                            ? "text"
                            : "text"
                        }
                        className={`form-control rounded-3`}
                        name={`${item.property_key_id}`}
                        defaultValue={item.value}
                      />
                      <div className="invalid-feedback"></div>
                    </div>
                    </div>
                  )
                )}
      </div>
    </fieldset>
  );
};

export default AddPropertyPropertiesSection;