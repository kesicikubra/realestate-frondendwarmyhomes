"use client"
import React, { useState } from 'react'
import { useFormState } from "react-dom";
import "./style.scss"
import SubmitButton from '@/components/common/buttons/submit-button'
import { resetBoxAction } from '@/actions/reset-database-action';
import { initialResponse } from '@/helpers/form-validation';
import { PiEyeClosed, PiEye } from "react-icons/pi";

const ResetDatabaseBox = () => {

  const [showInput, setShowInput] = useState(false);
  const [state, dispatch] = useFormState(resetBoxAction, initialResponse);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='reset-box text-center text-lg-start'>
        <h5>Reset Database</h5>
        <p>You are about to delete all records except those whose built-in fields are true. Are you sure to reset database?</p>
        <div className='text-center text-md-end'>
          <button className='reset' onClick={()=>setShowInput(prev => !prev)}>Reset Database</button>
        </div>
        <div className="reset-code-input">
          <form className={`${showInput ? "" : "d-none"}`} action={dispatch} noValidate>
            <div className={`input-group reset-group mb-3 `}>
            <label className='form-label' htmlFor="resetCode">Please type reset code.</label>
            <input type={`${showPassword ? "text" : "password"}`} className={`form-control rounded-3 ${
											state?.errors?.resetCode
												? "is-invalid"
												: ""
										}`} name='resetCode' id="resetCode"/>
            <div className="invalid-feedback">
										{state?.errors?.resetCode}
									</div>
                  {showPassword ? (
                    <PiEye
                      size={25}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <PiEyeClosed
                      size={25}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
            </div>
            <div className='text-center'>
            <SubmitButton title='Resest Database Permenantly' variant='danger'/>
            </div>
          </form>
        </div>
      </div>
  )
}

export default ResetDatabaseBox