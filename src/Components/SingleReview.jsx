import {
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
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
  const [isLoading, setIsLoading] = useState(true);
  //probably get rid of this votes state
  const [votes, setVotes] = useState(0);
  useEffect(() => {
    getOneReview(review_id).then((review) => {
      setReview(review);
      setVotes(review.votes);
      setIsLoading(false);
    });
  }, [review_id]);
  //the issue is here, the vote button is created as a const which doesn't pay attention to re-renders, I would need to set a display votes thing outside of this ?? but then why it work with comments?!?!
  const { voteButton } = useVote(votes, "review", review_id);
  return (
    // created_at, comment_count

    <Box>
      <Grid>
        <Grid item>
          <Typography variant="h4">{review.title}</Typography>
        </Grid>
        <Grid item>
          {/* Be good to make the category presentable if it's going to be displayed */}
          <Typography variant="h6">{`${review.category} Game`}</Typography>
        </Grid>

        <Grid item>{<img src={review.review_img_url} width="100vw" />}</Grid>

        <Grid item>
          <Typography variant="h6">
            {`Author : ${review.owner} --- Game Designer : ${review.designer}`}{" "}
          </Typography>{" "}
        </Grid>
        <Divider></Divider>

        <Grid item>
          <Typography variant="body1"> {review.review_body} </Typography>
        </Grid>
        {/* this would have to be <VoteButton votes={review.votes} endpoint={"review"} id={review_id} */}
        <Grid item>{isLoading ? <CircularProgress /> : voteButton}</Grid>
        <Divider></Divider>
        <Divider>
          <Chip label="Comments" />
        </Divider>
        <Divider></Divider>

        <Grid>
          <Comments review_id={review_id} />
        </Grid>
      </Grid>
      <Paper elevation={3} />
    </Box>
  );
};

export default SingleReview;
