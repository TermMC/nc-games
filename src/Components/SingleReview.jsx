import { Chip, Divider, Grid, Paper, Typography } from "@mui/material";
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
  useEffect(() => {
    getOneReview(review_id).then((review) => setReview(review));
  }, [review_id]);
  const { voteButton } = useVote(review.votes, "review", review_id);

  return (
    // designer, review_img_url, category, owner, created_at, comment_count

    <Box>
      <Grid>
        <Grid item>
          <Typography variant="h4">{review.title}</Typography>
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
        <Grid item>{voteButton}</Grid>
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
