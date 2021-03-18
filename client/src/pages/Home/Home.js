// installed packages
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// styles
import "./Home.css";

// shared components
import ListingItem from "../../components/MyListings/ListingItem/ListingItem";

// redux API
import { START_LOADING } from "../../redux/actions/types";
import { get_listings } from "../../redux/actions/listing";

const Home = (props) => {
  const { listings } = props; // get state from props
  const { startLoading, getListings } = props; // get dispatch actions from props

  // useEffect to get the available listings
  useEffect(() => {
    startLoading();

    getListings();
  }, [startLoading, getListings]);

  return (
    <div className="home__page">
      <h3>Available Listings</h3>
      <div className="home__pageListings">
        {listings?.map((listing) => (
          <Link to={`/listings/${listing.id}/`}>
            <ListingItem listing={listing} key={listing.id} />
          </Link>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    listings: state.listing.listings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch({ type: START_LOADING }),
    getListings: () => dispatch(get_listings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
