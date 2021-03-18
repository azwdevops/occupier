// installed packages

// styles
import "./ListingItem.css";

// shared/globals
import globals from "../../../shared/globals";

const ListingItem = ({ listing }) => {
  const { dev, devHome } = globals;
  return (
    <div className="listing">
      <img
        src={dev ? `${devHome}${listing.main_photo}` : `${listing.main_photo}`}
        alt=""
      />
      <p>
        <b>House:</b> {listing.name}
      </p>
      <p>
        <b>Price KES:</b> {listing.price.toLocaleString()}
      </p>
      <p>{listing.listing_type === "rent" ? "For Rent" : "For Sale"}</p>
      <p>
        <b>Location:</b> {listing.location}
      </p>
    </div>
  );
};

export default ListingItem;
