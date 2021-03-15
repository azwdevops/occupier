// import installed packages
import { connect } from "react-redux";
// import styles
// import material ui items
// import shared/global items
// import components/pages
import Medium from "../common/MediumDialog";
// import redux API

const AddListing = ({ openAddListingForm, setOpenAddListingForm }) => {
  return (
    <Medium isOpen={openAddListingForm}>
      <form className="dialog">
        <h3>Enter listing details</h3>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            Name
          </label>
        </div>
      </form>
    </Medium>
  );
};

export default AddListing;
