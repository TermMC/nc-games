import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useVote } from "../Hooks/useVotes";
import { getOneReview } from "../utils";
import Comments from "./Comments";
//TODO: edit, delete
const SingleReview = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  useEffect(() => {
    getOneReview(review_id).then((review) => setReview(review));
  }, []);
  const { voteButton } = useVote(review.votes, "review", review_id);

  return (
    <div>
      Naught but a single review, m'lord
      {Object.entries(review).map((entry) => {
        return <p key={`${entry[0]}`}>{`${entry[0]} is ${entry[1]}`}</p>;
      })}
      {voteButton}
      <Comments review_id={review_id} />
    </div>
  );
};

export default SingleReview;
