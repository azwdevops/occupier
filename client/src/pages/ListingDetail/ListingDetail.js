// installed packages
import { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";
import parser from "html-react-parser";
// styles
import "./ListingDetail.css";

// shared items
import API from "../../shared/axios";
import globals from "../../shared/globals";

// redux API
import {
  OPEN_LOGIN,
  START_LOADING,
  STOP_LOADING,
} from "../../redux/actions/types";
import BookAppointment from "../../components/ListingDetail/BookAppointment";

const ListingDetail = (props) => {
  const { loggedIn, username } = props; // get state from props
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const [listing, setListing] = useState({});
  const [currentPhoto, setCurrentPhoto] = useState("");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [listingPhotos, setListingPhotos] = useState([]);
  const [openBookAppointment, setOpenBookAppointment] = useState(false);

  const { dev, devHome } = globals;

  useEffect(() => {
    dispatch({ type: START_LOADING });
    const fetchData = async () => {
      const res = await API.get(`/api/agent/get-single-listing/${listingId}/`);
      setListing(res.data?.listing);
      setListingPhotos([
        ...res.data.listing?.listing_photos,
        res.data.listing?.main_photo,
      ]);
      setCurrentPhoto(res.data.listing?.main_photo);
    };
    fetchData()
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        dispatch({ type: STOP_LOADING });
      });
  }, [dispatch, listingId]);

  // setTimeout(() => {
  //   loadNextPreviousPhoto("next");
  // }, 2500);

  const loadNextPreviousPhoto = (action) => {
    if (currentPhotoIndex === listingPhotos?.length - 1) {
      setCurrentPhotoIndex(0);
    } else if (currentPhotoIndex === 0 && action === "previous") {
      setCurrentPhotoIndex(listingPhotos?.length - 1);
    } else {
      if (currentPhotoIndex < listingPhotos?.length - 1) {
        if (action === "next") {
          setCurrentPhotoIndex(currentPhotoIndex + 1);
        } else {
          setCurrentPhotoIndex(currentPhotoIndex - 1);
        }
      } else {
        setCurrentPhotoIndex(0);
      }
    }
    setCurrentPhoto(listingPhotos[currentPhotoIndex]);
  };

  return (
    <>
      <div className="listing__detail">
        <div className="listing__detailLeft">
          <div className="listing__detailMainPhoto">
            <i
              className="material-icons"
              onClick={() => loadNextPreviousPhoto("next")}
            >
              chevron_right
            </i>
            <i
              className="material-icons"
              onClick={() => loadNextPreviousPhoto("previous")}
            >
              chevron_left
            </i>
            <img
              src={dev ? `${devHome}${currentPhoto}` : currentPhoto}
              alt=""
            />
          </div>
          <h3>{listing.name}</h3>
          <div className="listing__detailActions">
            <button type="button">Status: {listing?.status}</button>
            {loggedIn ? (
              <button
                type="button"
                onClick={() => setOpenBookAppointment(true)}
              >
                Book Appointment
              </button>
            ) : (
              <button
                type="button"
                onClick={() => dispatch({ type: OPEN_LOGIN })}
              >
                Login to book appointment
              </button>
            )}
          </div>
          <div className="listing__otherDetails">
            <span>Bedrooms: {listing?.bedrooms}</span>
            <span>Bathrooms: {listing?.bathrooms}</span>
            <span>Size (Sqft): {listing?.house_size}</span>
            <span>Price: KES {listing?.price?.toLocaleString()}</span>
          </div>
          <div className="listing__otherPhotos">
            {listingPhotos?.map((photo, index) => (
              <img
                src={dev ? `${devHome}${photo}` : photo}
                alt=""
                key={index}
              />
            ))}
          </div>
          <div className="listing__description">
            <h3>Description</h3>
            <p>{parser(`${listing?.description}`)}</p>
          </div>
        </div>
        <div className="listing__detailRight">
          <div className="listing__agent">
            <img
              src={
                dev
                  ? `${devHome}${listing?.agent_details?.photo}`
                  : `${listing.agent_details?.photo}`
              }
              alt=""
            />
            <p>{listing.agent_details?.name}</p>
          </div>
        </div>
      </div>
      {/* child components */}
      <BookAppointment
        openBookAppointment={openBookAppointment}
        setOpenBookAppointment={setOpenBookAppointment}
        listing={listing}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    username: state.auth.user?.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingDetail);
