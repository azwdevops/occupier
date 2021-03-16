// import installed packages
import { useRef, useState } from "react";
import { connect } from "react-redux";
import JoditEditor from "jodit-react";
// import styles
// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import globals from "../../shared/globals";
import { ifEmpty, resetFormValues } from "../../shared/sharedFunctions";
// import components/pages
import Medium from "../common/MediumDialog";

// import redux API
import { START_LOADING } from "../../redux/actions/types";
import { create_new_listing } from "../../redux/actions/listing";

const AddListing = (props) => {
  const { openAddListingForm, locations, loading, alert } = props; // get state from props
  const { setOpenAddListingForm, startLoading, createNewListing } = props; // get dispatch actions from props
  const editor = useRef("");
  const [description, setDescription] = useState("");
  const [newListing, setNewListing] = useState({
    name: "",
    house_no: "",
    house_size: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    listing_type: "",
    location: "",
    main_photo: "",
    status: "",
  });

  // destructuring
  const {
    name,
    house_no,
    house_size,
    bedrooms,
    bathrooms,
    price,
    listing_type,
    location,
    main_photo,
    status,
  } = newListing;

  const { JoditConfig, fillFields } = globals;

  // handle change
  const handleChange = (e) => {
    setNewListing({ ...newListing, [e.target.value]: e.target.value });
  };

  // handle image upload
  const handleImageChange = (e) => {
    setNewListing({ ...newListing, main_photo: e.target.files[0] });
  };

  const resetForm = () => {
    resetFormValues(newListing);
    setDescription("");
  };

  // close form
  const closeNewListingForm = () => {
    resetForm();
    setOpenAddListingForm(false);
  };

  // handle submit
  const submitListing = (e) => {
    e.preventDefault();
    if (ifEmpty(newListing) || description.trim() === "") {
      return window.alert(fillFields);
    }
    let body = new FormData();
    body.append("main_photo", main_photo, main_photo.name);
    body.append("description", description);
    body.append("house_no", house_no);
    body.append("house_size", house_size);
    body.append("bedrooms", bedrooms);
    body.append("bathrooms", bathrooms);
    body.append("listing_type", listing_type);
    body.append("location", location);
    body.append("main_photo", main_photo);
    body.append("status", status);

    startLoading();

    createNewListing(body, resetForm);
  };

  return (
    <Medium isOpen={openAddListingForm}>
      <form className="dialog" id={loading ? "formSubmitting" : ""}>
        <h3>Enter listing details</h3>
        <p className={`response__message ${alert.alertType}`}>
          {alert.status && alert.detail}
        </p>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            Name
          </label>
          <input
            type="text"
            className="input__left"
            value={name}
            onChange={handleChange}
          />
          <label htmlFor="" className="label__right">
            House No
          </label>
          <input
            type="number"
            name=""
            className="input__right"
            value={house_no}
            onChange={handleChange}
          />
        </div>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            Size(sqft)
          </label>
          <input
            type="number"
            name=""
            className="input__left"
            value={house_size}
            onChange={handleChange}
          />
          <label htmlFor="" className="label__right">
            Bedrooms
          </label>
          <input
            type="number"
            name=""
            min="1"
            max="100"
            className="input__right"
            value={bedrooms}
            onChange={handleChange}
          />
        </div>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            Bathrooms
          </label>
          <input
            type="number"
            name=""
            min="1"
            max="100"
            className="input__left"
            value={bathrooms}
            onChange={handleChange}
          />

          <label htmlFor="" className="label__right">
            Price
          </label>
          <input
            type="number"
            name=""
            min="1"
            className="input__right"
            value={price}
            onChange={handleChange}
          />
        </div>
        {loading && (
          <CircularProgress
            style={{ position: "absolute", marginLeft: "42%" }}
          />
        )}
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            Listing Type
          </label>
          <select
            name=""
            className="select__left"
            onChange={handleChange}
            value={listing_type}
          >
            <option value="" selected disabled>
              Select type
            </option>
            <option value="rent">For Rent</option>
            <option value="sale">For Sale</option>
          </select>
          <label htmlFor="" className="label__right">
            Location
          </label>
          <select
            name=""
            className="select__right"
            value={location}
            onChange={handleChange}
          >
            <option value="" selected disabled>
              Select location
            </option>
            {locations?.map((location) => (
              <option value={location} key={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            Main Photo
          </label>
          <input
            type="file"
            name=""
            className="input__left"
            value={main_photo}
            onChange={handleImageChange}
          />
          <label htmlFor="" className="label__right">
            Status
          </label>
          <select
            name=""
            className="select__right"
            value={status}
            onChange={handleChange}
          >
            <option value="" selected disabled>
              Select status
            </option>
            <option value="booked">Booked</option>
            <option value="open">Open</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Description</label>
          {/* jodit markdown */}
          <JoditEditor
            ref={editor}
            value={description}
            config={JoditConfig}
            tabIndex={1}
            onChange={(newContent) => setDescription(newContent)}
          />
        </div>
        <div className="form__Buttons">
          <button type="button" onClick={closeNewListingForm}>
            Close
          </button>
          <button type="submit" onClick={submitListing}>
            Submit
          </button>
        </div>
      </form>
    </Medium>
  );
};

const mapStateToProps = (state) => {
  return {
    locations: state.auth.locations,
    loading: state.shared.loading,
    alert: state.shared.alert,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch({ type: START_LOADING }),
    createNewListing: (body, resetForm) =>
      dispatch(create_new_listing(body, resetForm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddListing);
