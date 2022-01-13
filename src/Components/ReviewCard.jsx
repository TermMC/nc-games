import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <div>
      <Link to={`/reviews/${review.review_id}`}>
        <p>Title : {review.title}</p>
      </Link>
      <Link to={`/users/${review.owner}`}>
        <p>Author: {review.owner}</p>
      </Link>
      <p>Designer: {review.designer}</p>
      <p>
        Category {review.category} Votes: {review.comment_count}
      </p>
      <p>Created On:{review.created_at}</p>
      {review.review_img_url}
    </div>
  );
};

export default ReviewCard;
