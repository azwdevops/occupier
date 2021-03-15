// import installed packages
import { useState } from "react";
import { connect } from "react-redux";
import AddListing from "../../../components/MyListings/AddListing";
// import styles
// import material ui items
// import shared/global items
// import components/pages
// import redux API

const MyListings = () => {
  const [openAddListingForm, setOpenAddListingForm] = useState(false);
  return (
    <>
      <div className="table__parent">
        <div className="table__parentHeader">
          <button
            type="button"
            className="add__button white"
            onClick={() => setOpenAddListingForm(true)}
          >
            Add Listing
          </button>
          <h3>Manage your listings</h3>
        </div>
      </div>
      {/* child components */}
      <AddListing
        openAddListingForm={openAddListingForm}
        setOpenAddListingForm={setOpenAddListingForm}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyListings);
