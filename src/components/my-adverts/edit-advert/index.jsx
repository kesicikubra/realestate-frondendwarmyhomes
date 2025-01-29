"use client";
import React from "react";
import "./style.scss";
import CommonInformationSection from "./common-information";
import AddressInformationSection from "./address-information";
import AddPropertyPropertiesSection from "./properties-section";
import AddAdvertImageSection from "./image-section";
import { updateAdvertFromAuthAction } from "@/actions/advert-action";
import { initialResponse } from "@/helpers/form-validation";
import { useFormState } from "react-dom";
import Spacer from "@/components/common/misc/spacer";
import SubmitButton from "@/components/common/buttons/submit-button";

const EditAdvertForm = ({
  advertTypes,
  cities,
  districts,
  categories,
  advertById,
}) => {
  const [state, dispatch] = useFormState(
    updateAdvertFromAuthAction,
    initialResponse
  );

  return (
    <>
        {!state?.success && state.message ? (
          <div className="alert alert-danger">{state.message}</div>
        ) : (
          ""
        )}
      <form className="add-new-advert" noValidate action={dispatch}>
        <input type="hidden" name="id" value={advertById.id} />
        <CommonInformationSection
          advertTypes={advertTypes}
          advertById={advertById}
          state={state}
        />
        <Spacer height={50} />
        <AddressInformationSection
          // countries={countries}
          cities={cities}
          districts={districts}
          state={state}
          advertById={advertById}
        />
        <Spacer height={50} />
        <AddPropertyPropertiesSection
          categories={categories}
          advertById={advertById}
          state={state}
        />
        <Spacer height={50} />
        <div className="button">
          <SubmitButton title="Update" />
        </div>
        <Spacer />
        <input type="hidden" name="is_active" value="false" />
      </form>
    </>
  );
};

export default EditAdvertForm;
