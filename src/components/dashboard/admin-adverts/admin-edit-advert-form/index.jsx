"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import "./style.scss";
import SubmitButton from "@/components/common/buttons/submit-button";
import { updateAdvertFromAdminAction } from "@/actions/advert-action";
import { initialResponse } from "@/helpers/form-validation";
import { useRouter } from "next/navigation";
import countryDataJson from "../../../../components/add-new-advert/countries.json"

const DashboardEditAdvertForm = ({
  advert,
  advertTypes,
  categories,
  
  cities,
  districts,
}) => {
  const [state, dispatch] = useFormState(
    updateAdvertFromAdminAction,
    initialResponse
  );

  const {
    id,
    title,
    slug,
    description,
    price,
    status,
    category_id,
    advert_type,
    properties,
    address,
    location,
    country_id,
    city_id,
    district_id,
  } = advert.object;

  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState();
  let propertyFilter = categories.filter((item) => item.id == selectedCategory);
  let categoryKeys = propertyFilter[0]?.categoryPropertyKey;

  const [filteredCity, setFilteredCity] = useState();
  const [filteredDistrict, setFilteredDistrict] = useState();
  const [aaa, setAaa] = useState();
  
  let selectedCity = cities?.filter((item) => item.id == city_id);
  let selectedDistrict = districts?.filter((item) => item.id == district_id);
  const [showSelectedFields, setShowSelectedFields] = useState(false);

  const handleSelectCountry = (e) => {
    let newCities = cities?.filter((item) => item.countryId == e.target.value);
    let countryName = countryDataJson.filter((item) => item.id == e.target.value);
    setFilteredCity(newCities);
    setShowSelectedFields(true);
  };

  const handleSelectCity = (e) => {
    let newDistrict = districts?.filter(
      (item) => item.cityId == e.target.value
    );
    let cityName = cities.filter((item) => item.id == e.target.value);
    setFilteredDistrict(newDistrict);
  };

  const statusValue =
    status == "PENDING"
      ? "0"
      : status == "ACTIVATED"
      ? "1"
      : status == "REJECTED"
      ? "2"
      : null;

  const handleDelete = () => {};

  return (
    <>
      <div className="container edit-advert-form">
        <form noValidate action={dispatch}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="location" value={[]} />
          <input type="hidden" name="latitude" value={location.latitude} />
          <input type="hidden" name="longitude" value={location.longitude} />
          <div className="row">
            <div className="col-xl-8">
              <div className="row">
                <div className="col-12">
                  <div className="input-group mb-4">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className={`form-control rounded-3`}
                      id="title"
                      name="title"
                      defaultValue={title}
                    />
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="input-group mb-4">
                    <label htmlFor="title">Slug</label>
                    <input
                      type="text"
                      className={`form-control rounded-3`}
                      id="slug"
                      name="slug"
                      defaultValue={slug}
                      disabled
                    />
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="input-group mb-4">
                    <label htmlFor="description">Slug</label>
                    <textarea
                      className={`form-control rounded-4 `}
                      placeholder="Leave a message here"
                      id="description"
                      name="description"
                      defaultValue={description}
                    ></textarea>
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-4">
                    <label htmlFor="category_id">Category</label>
                    <select
                      className={`form-select rounded-3 w-100`}
                      aria-label="Default select example"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      name="category_id"
                      id="category_id"
                      defaultValue={category_id}
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
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-4">
                    <label htmlFor="advert_type_id">Advert Type</label>
                    <select
                      className={`form-select rounded-3 w-100`}
                      aria-label="Default select example"
                      name="advert_type_id"
                      defaultValue={advert_type.id}
                    >
                      <option selected disabled>
                        Choose advert type
                      </option>
                      {advertTypes?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group mb-4">
                    <label htmlFor="country_id">Country</label>
                    <select
                      className={`form-select rounded-3 w-100`}
                      aria-label="Default select example"
                      onClick={(e) => handleSelectCountry(e)}
                      name="country_id"
                      defaultValue={country_id}
                    >
                      <option selected disabled>
                        Choose country
                      </option>
                      {countryDataJson.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.countryName}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group mb-4">
                    <label htmlFor="city_id">City</label>
                    <select
                      className={`form-select rounded-3 w-100`}
                      aria-label="Default select example"
                      onClick={(e) => handleSelectCity(e)}
                      name="city_id"
                    >
                      {!showSelectedFields && (
                        <option selected value={selectedCity[0].id}>
                          {selectedCity[0].cityName}
                        </option>
                      )}

                      {filteredCity?.map((item) => (
                        <>
                          <option key={item.id} value={item.id}>
                            {item.cityName}
                          </option>
                        </>
                      ))}
                    </select>
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group mb-4">
                    <label htmlFor="district_id">District</label>
                    <select
                      className={`form-select rounded-3 w-100`}
                      aria-label="Default select example"
                      name="district_id"
                    >
                      {!showSelectedFields && (
                        <option selected value={selectedDistrict[0].id}>
                          {selectedDistrict[0].districtsName}
                        </option>
                      )}

                      {filteredDistrict?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.districtsName}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="input-group mb-4">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className={`form-control rounded-3`}
                      id="address"
                      name="address"
                      defaultValue={address}
                    />
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-4">
                    <label htmlFor="status">Status</label>
                    <select
                      className={`form-select rounded-3 w-100`}
                      aria-label="Default select example"
                      name="status"
                      id="status"
                      defaultValue={statusValue}
                    >
                      <option selected disabled>
                        Choose status
                      </option>
                      <option value="0">Pending</option>
                      <option value="1">Activated</option>
                      <option value="2">Rejected</option>
                    </select>
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-4">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      className={`form-control rounded-3`}
                      id="price"
                      name="price"
                      defaultValue={price}
                    />
                    <div className="invalid-feedback"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-xl-4">
              <div className="property-keys mt-3">
                <h2>Properties</h2>
                <input type="hidden" name="properties" value={[]} />
                {properties.map((item) =>
                  item.key_type === "BOOLEAN" ? (
                    <div className="input-group mb-4" key={item.property_key_id}>
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
                  ) : (
                    <div className="input-group mb-4" key={item.property_key_id}>
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
                  )
                )}
              </div>
            </div>
          </div>
          <div className="buttons mt-5">
            <button className="btn btn-secondary" onClick={() => router.back()}>
              Return
            </button>
            <button className="btn btn-secondary" onClick={handleDelete}>
              Delete
            </button>
            <SubmitButton title="Save" />
          </div>
        </form>
      </div>
    </>
  );
};

export default DashboardEditAdvertForm;
