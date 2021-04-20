// import installed packages
import { useState } from "react";
import { connect } from "react-redux";
import { START_LOADING } from "../../redux/actions/types";
// import styles
// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import {
  ifEmpty,
  minDate,
  resetFormValues,
} from "../../shared/sharedFunctions";
// import components/pages
import MediumDialog from "../common/MediumDialog";
// import redux API
import { tenant_book_appointment } from "../../redux/actions/listing";

const BookAppointment = (props) => {
  const { listing, openBookAppointment, userId, loading } = props; // get state from props
  const { setOpenBookAppointment, startLoading, tenantBookAppointment } = props; // get dispatch actions from props

  const [appointmentDetails, setAppointmentDetails] = useState({
    tenant_proposed_date: "",
  });

  const { tenant_proposed_date } = appointmentDetails;

  const resetForm = () => {
    resetFormValues(appointmentDetails);
  };

  const handleChange = (e) => {
    setAppointmentDetails({
      ...appointmentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ifEmpty(appointmentDetails)) {
      return alert("All fields are required");
    }
    startLoading();
    tenantBookAppointment(
      userId,
      { ...appointmentDetails, listing: listing.id },
      resetForm
    );
  };

  const handleClose = () => {
    resetForm();
    setOpenBookAppointment(false);
  };

  return (
    <MediumDialog isOpen={openBookAppointment}>
      <form className="dialog" id={loading ? "formSubmitting" : ""}>
        <h3>Book viewing appoitment</h3>
        <div className="dialog__row">
          <span>
            <label>House</label>
            <input type="text" value={listing?.name} disabled />
          </span>
          <span>
            <label>Price: KES</label>
            <input
              type="text"
              value={listing?.price?.toLocaleString()}
              disabled
            />
          </span>
        </div>
        {loading && (
          <CircularProgress
            style={{ position: "absolute", marginLeft: "43%" }}
          />
        )}
        <div className="dialog__row">
          <span>
            <label>Type</label>
            <input type="text" value={listing?.listing_type} disabled />
          </span>
          <span>
            <label>Agent</label>
            <input type="text" value={listing?.agent_details?.name} disabled />
          </span>
        </div>
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Select viewing date</label>
          <input
            type="date"
            name="tenant_proposed_date"
            min={minDate()}
            value={tenant_proposed_date}
            onChange={handleChange}
          />
        </div>
        <div className="form__Buttons">
          <button type="button" onClick={handleClose}>
            Close
          </button>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </MediumDialog>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
    loading: state.shared.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch({ type: START_LOADING }),
    tenantBookAppointment: (userId, appointmentDetails, resetForm) =>
      dispatch(tenant_book_appointment(userId, appointmentDetails, resetForm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookAppointment);
