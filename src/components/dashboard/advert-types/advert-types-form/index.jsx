"use client"
import "./style.scss"
import { useFormState } from "react-dom";
import { initialResponse, isInvalid } from '@/helpers/form-validation';
import { createAdvertTypeAction } from '@/actions/advert-type-action';
import CancelButton from "@/components/common/buttons/cancel-button";
import SubmitButton from "@/components/common/buttons/submit-button";

const NewAdvertTypesForm = () => {
    const [state, dispatch] = useFormState(
		createAdvertTypeAction,
		initialResponse
	);
  return (
    <>
    {!state?.success && state.message ? (
      <div className="alert alert-danger">
        {state.message}
      </div>
    ) : (
      ""
    )}
    <form className='new-advert-form' noValidate action={dispatch}>
        <div className="container w-75">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <div className="input-group mb-4">
          <input
            type="text"
            className={`form-control ${isInvalid(
                state.errors?.title
            )}`}
            id="title"
            name='title'
            aria-describedby="basic-addon3"
          />
          <div className="invalid-feedback">
          {state.errors?.title}
          </div>
        </div>
        <div className='buttons'>
            <CancelButton title='Return'/>
            <SubmitButton title='Create'/>
        </div>
        </div>
    </form>
    </>
  )
}

export default NewAdvertTypesForm