// import installed packages
// import styles
// import material ui items
// import shared/global items
import { minDate } from "../../shared/sharedFunctions";
// import components/pages
import MediumDialog from "../common/MediumDialog";
// import redux API

const BookAppointment = ({
  openBookAppointment,
  setOpenBookAppointment,
  listing,
}) => {
  return (
    <MediumDialog isOpen={openBookAppointment}>
      <form className="dialog">
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
          <input type="date" name="" min={minDate()} />
        </div>
        <div className="form__Buttons">
          <button type="button">Close</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </MediumDialog>
  );
};

export default BookAppointment;
