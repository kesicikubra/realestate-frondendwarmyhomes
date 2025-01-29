import React from "react";

const CommonInformationSection = ({ advertTypes, state, advertById }) => {
  return (
    <fieldset className="border rounded-3">
      <legend className="float-none w-auto px-3">Common Information</legend>
      <div className="row container">
        <div className="col-12">
          <label htmlFor="title">Title</label>
          <div className="input-group mb-3">
            <input
              type="title"
              className={`form-control rounded-3  ${
                state?.errors?.title ? "is-invalid" : ""
              }`}
              id="title"
              name="title"
              defaultValue={advertById?.title}
            />

            <div className="invalid-feedback">{state?.errors?.title}</div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              className={`form-control rounded-4  ${
                state?.errors?.description ? "is-invalid" : ""
              }`}
              placeholder="Leave a message here"
              id="description"
              name="description"
              defaultValue={advertById?.description}
       
            ></textarea>
            <div className="invalid-feedback">{state?.errors?.description}</div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="title">Price</label>
          <div className="input-group mb-3">
            <input
              type="number"
              className={`form-control rounded-3  ${
                state?.errors?.price ? "is-invalid" : ""
              }`}
              id="price"
              name="price"
              defaultValue={advertById?.price}
            />

            <div className="invalid-feedback">{state?.errors?.price}</div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="advert_type_id">Advert Type</label>
          <select
             className={`form-select mb-5  ${
              state?.errors?.advert_type_id ? "is-invalid" : ""
            }`}
            aria-label="Default select example"
            name="advert_type_id"
            defaultValue={advertById?.advert_type?.id}
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
          <div className="invalid-feedback">{state?.errors?.advert_type_id}</div>
        </div>
      </div>
    </fieldset>
  );
};

export default CommonInformationSection;