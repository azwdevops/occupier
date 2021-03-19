// installed packages
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// styles
import "./ListingDetail.css";

// shared items
import API from "../../shared/axios";
import globals from "../../shared/globals";

// redux API
import { START_LOADING, STOP_LOADING } from "../../redux/actions/types";

const ListingDetail = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const [listing, setListing] = useState({});
  const [currentPhoto, setCurrentPhoto] = useState("");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [listingPhotos, setListingPhotos] = useState([]);

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

  const loadNextPreviousPhoto = (e, action) => {
    e.preventDefault();
    if (currentPhotoIndex === listingPhotos?.length) {
      setCurrentPhotoIndex(0);
    } else if (currentPhotoIndex === 0) {
      setCurrentPhotoIndex(listingPhotos?.length);
    } else {
      if (currentPhotoIndex < listingPhotos?.length) {
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
    <div className="listing__detail">
      <div className="listing__detailLeft">
        <div className="listing__detailMainPhoto">
          <i
            className="material-icons"
            onClick={(e) => loadNextPreviousPhoto(e, "next")}
          >
            chevron_right
          </i>
          <i
            className="material-icons"
            onClick={(e) => loadNextPreviousPhoto(e, "previous")}
          >
            chevron_left
          </i>
          <img src={dev ? `${devHome}${currentPhoto}` : currentPhoto} alt="" />
        </div>
        <h3>{listing.name}</h3>
        <div className="listing__otherDetails">
          <span>Bedrooms: {listing?.bedrooms}</span>
          <span>Bathrooms: 2</span>
          <span>Sqft: 2</span>
          <span>Price: 2</span>
        </div>
        <div className="listing__otherPhotos">
          {listingPhotos?.map((photo, index) => (
            <img src={dev ? `${devHome}${photo}` : photo} alt="" key={index} />
          ))}
        </div>
        <div className="listing__description">
          <h3>Description</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, minus
            sequi quia molestiae fugit, unde dicta nihil explicabo atque
            delectus ea magni tenetur necessitatibus. Minima hic officiis
            impedit, quasi deserunt qui rerum repellendus repudiandae harum
            exercitationem ipsa nihil voluptas iste tenetur necessitatibus nemo
            nisi dolores, distinctio odit reiciendis sit eos neque cum. Enim
            ullam eligendi pariatur sit, perferendis totam molestiae quasi
            repudiandae aut laboriosam ipsa illum ex dignissimos, officiis
            inventore quibusdam cum quaerat, nostrum sed ducimus. Recusandae
            dolores similique sed neque cupiditate hic, culpa nulla sunt ratione
            perspiciatis quaerat explicabo dolore iusto magnam suscipit
            repudiandae nihil soluta pariatur. Totam, tenetur.
          </p>
        </div>
      </div>
      <div className="listing__detailRight">
        <div className="listing__agent">Agent details</div>
      </div>
    </div>
  );
};

export default ListingDetail;
