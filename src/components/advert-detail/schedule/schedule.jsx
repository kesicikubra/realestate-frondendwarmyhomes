"use client"
import { useFormState } from "react-dom";
import "./style.scss";
import SubmitButton from "@/components/common/buttons/submit-button";
import { createTourRequestAction } from "@/actions/tour-requests-action";
import { initialResponse, isInvalid } from "@/helpers/form-validation";

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 12; hour <= 18; hour++) {
    ['00', '15', '30', '45'].forEach(min => {
      const time = `${hour < 10 ? '0' + hour : hour}:${min}`;
      options.push(<option key={time} value={time}>{time}</option>);
    });
  }
  return options;
};

const ScheduleTour = ({advertId}) => {
  const [state, dispatch] = useFormState(
		createTourRequestAction,
		initialResponse
	);

  return (
    <div className="schedule">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Schedule a tour</h3>
          <h5 className="d-none d-lg-block">Choose your preferred day</h5>
          {!state?.success && state.message ? (
								<div className="alert alert-danger">
									{state.message}
								</div>
							) : (
								""
							)}
          <form noValidate action={dispatch}>
            <input type="hidden" name="advertId" value={advertId}/>
            <div className="row">
              <div className="col-6 col-md-4 col-lg-12">
                <div className="input-group mb-3">
                    <label htmlFor="date">Tour Date</label>     
                <input 
                    type="date"
                    name="tour_date"
                    id="tour_date" 
                    placeholder="Tour time"
                    className={`form-control ${isInvalid(
											state.errors?.tour_date
										)}`} />
                    <div className="invalid-feedback">
                      {state.errors?.tour_date}
                    </div>
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-12">
                <div className="input-group mb-3">
                    <label htmlFor="time">Tour Time</label>
           
                   <select
                     id="tour_time"
                     type="time"
                     name="tour_time"
                     min="12:00"
                     max="18:00"
                     step="900"
                     placeholder="Tour Date"
                    className={`form-control ${isInvalid(
                      state.errors?.tour_time
                    )}`}
                  >
                    {generateTimeOptions()}
                  </select>
                  <div className="invalid-feedback">
                      {state.errors?.tour_time}
                    </div>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-12 mb-3 d-flex justify-content-end align-items-end">
                    <SubmitButton title="Submit a tour request"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTour;
