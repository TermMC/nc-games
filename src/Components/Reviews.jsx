import { useEffect, useState } from "react";
import { getAllReviews } from "../utils";
import ReviewCard from "./ReviewCard";
import SearchBar from "./SearchBar";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { Fab } from "@mui/material";
const Reviews = () => {
  const [reviews, setReviews] = useState(["just to test map, delete later"]);
  const [isMoreReviews, setIsMoreReviews] = useState(true);

  const [reviewQueries, setReviewQueries] = useState({ num_limit: 10 });

  useEffect(() => {
    getAllReviews(reviewQueries).then((reviews) => setReviews(reviews));
  }, [reviewQueries]);

  const handleMoreReviews = () => {
    setReviewQueries((prevQueries) => {
      return { ...prevQueries, num_limit: Number(prevQueries.num_limit) + 5 };
    });
    if (reviews.length < reviewQueries.num_limit) {
      setIsMoreReviews(false);
    }
  };

  return (
    <div>
      <SearchBar queries={reviewQueries} setQueries={setReviewQueries} />
      Reviews
      {reviews.map((review) => {
        return (
          <ReviewCard review={review} key={`review_card_${review.review_id}`} />
        );
      })}
      {/* PAGINATION BUTTON HERE */}
      {isMoreReviews ? (
        <Fab variant="extended" onClick={handleMoreReviews}>
          <ArrowDropDownCircleIcon sx={{ mr: 1 }} />
          See More Reviews
        </Fab>
      ) : (
        ""
      )}
    </div>
  );
};

export default Reviews;
