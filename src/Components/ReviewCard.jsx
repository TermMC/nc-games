import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <>
      <Card sx={{ maxwidth: 345 }}>
        <CardContent>
          <Link to={`/reviews/${review.review_id}`}>
            <CardMedia
              component="img"
              height="140"
              image={review.review_img_url}
            />

            <Typography gutterBottom variant="h5" component="div">
              {review.title}
            </Typography>
          </Link>
          <Link to={`/users/${review.owner}`}>
            <Typography variant="body2" color="text.secondary">
              Author: {review.owner}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            Designer: {review.designer}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category {review.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Votes {review.votes} Comments: {review.comment_count}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ReviewCard;
