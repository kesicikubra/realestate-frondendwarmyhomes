"use client";
import SubmitButton from "@/components/common/buttons/submit-button";
import "./style.scss";
import { useFormState } from "react-dom";
import { initialResponse, isInvalid } from "@/helpers/form-validation";
import { updateAdvertTypeAction } from "@/actions/advert-type-action";
import DeleteAdvertTypeButton from "./delete-advert-type-btn";

const EditAdvertTypesForm = ({ data }) => {
  const [state, dispatch] = useFormState(
    updateAdvertTypeAction,
    initialResponse
  );

  return (
    <>
      {!state?.success && state.message ? (
        <div className="alert alert-danger">{state.message}</div>
      ) : (
        ""
      )}
      <form noValidate className="edit-advert-form" action={dispatch}>
        <input type="hidden" name="id" value={data.id} />
        <div className="container w-75">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <div className="input-group mb-4">
            <input
              type="text"
              className={`form-control ${isInvalid(state.errors?.title)}`}
              id="title"
              name="title"
              defaultValue={data.title}
              aria-describedby="basic-addon3"
            />
            <div className="invalid-feedback">{state.errors?.title}</div>
          </div>
          <div className="buttons">
            <DeleteAdvertTypeButton id={data.id} />
            <SubmitButton title="Update" />
          </div>
        </div>
      </form>
    </>
  );
};

export default EditAdvertTypesForm;
