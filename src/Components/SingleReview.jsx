import {
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getOneReview } from "../utils";
import Comments from "./Comments";
import VotesButton from "./VotesButton";
//TODO: edit, delete
const SingleReview = () => {
  //want to do an is Loading for the whole page?

  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOneReview(review_id)
      .then((review) => {
        setReview(review);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [review_id]);

  return (
    // created_at, comment_count

    error ? (
      <p>
        Sorry there's no review here. Did it go missing? Or did it ever even
        exist...
      </p>
    ) : (
      <Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid>
            <Grid item>
              <Typography variant="h4">{review.title}</Typography>
            </Grid>
            <Grid item>
              {/* Be good to make the category presentable if it's going to be displayed */}
              <Typography variant="h6">{`${review.category} Game`}</Typography>
            </Grid>

            <Grid item>
              {<img alt={""} src={review.review_img_url} width="100vw" />}
            </Grid>

            <Grid item>
              <Typography variant="h6">
                {`Author : ${review.owner} --- Game Designer : ${review.designer}`}{" "}
              </Typography>{" "}
            </Grid>
            <Divider></Divider>

            <Grid item>
              <Typography variant="body1"> {review.review_body} </Typography>
            </Grid>

            <Grid item>
              {/* {isLoading ? (
            <CircularProgress />
          ) : ( */}
              <VotesButton
                currVotes={Number(review.votes)}
                endpoint={"review"}
                id={review_id}
              />
            </Grid>
            <Divider></Divider>
            <Divider>
              <Chip label="Comments" />
            </Divider>
            <Divider></Divider>

            <Grid>
              <Comments review_id={review_id} />
            </Grid>
          </Grid>
        )}
        <Paper elevation={3} />
      </Box>
    )
  );
};

export default SingleReview;
