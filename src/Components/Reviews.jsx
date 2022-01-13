import { useEffect, useState } from "react";
import { getAllReviews } from "../utils";
import ReviewCard from "./ReviewCard";
import SearchBar from "./SearchBar";

const Reviews = () => {
  const [reviews, setReviews] = useState(["just to test map, delete later"]);

  const [reviewQueries, setReviewQueries] = useState({});

  useEffect(() => {
    getAllReviews(reviewQueries).then((reviews) => setReviews(reviews));
  }, [reviewQueries]);

  return (
    <div>
      <SearchBar queries={reviewQueries} setQueries={setReviewQueries} />
      Reviews
      {reviews.map((review) => {
        return (
          <ReviewCard review={review} key={`review_card_${review.review_id}`} />
        );
      })}
    </div>
  );
};

export default Reviews;
