import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";

import Button from "@mui/material/Button";
import { deleteComment, getUser } from "../utils";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect } from "react/cjs/react.development";
import VotesButton from "./VotesButton";

const CommentCard = ({ comment, setNewCommentPosted }) => {
  //line 11 not needed
  // const { voteButton } = useVote(comment.votes, "comment", comment.comment_id);
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  const dayjs = require("dayjs");
  const date = dayjs(comment.created_at);
  const usableDate = `${String(date.$H).padStart(2, "0")}:${String(
    date.$m
  ).padStart(2, "0")} ${String(date.$D).padStart(2, "0")}/${String(
    date.$M + 1
  ).padStart(2, "0")}/${date.$y}`;
  useEffect(() => {
    getUser(comment.author).then((author) => {
      setAvatarUrl(author.avatar_url);
    });
  }, [comment]);

  const handleCommentDelete = () => {
    deleteComment(comment.comment_id)
      .then((res) => {
        setNewCommentPosted((prevValue) => prevValue - 1);
      })
      .catch((err) => {
        console.log(err);
        setError("error", err);
      });
  };

  //TODO: edit, DATE
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1">{comment.body}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Avatar alt={comment.author} src={avatarUrl} />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2">
                {comment.author} Created at: {usableDate}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {/* this would have to be <VoteButton votes={comment.votes} endpoint={"comment"} id={comment.comment_id} */}
              <VotesButton
                currVotes={comment.votes}
                endpoint={"comment"}
                id={comment.comment_id}
              />
            </Grid>
            {/* CURRENTLY THIS ERROR THINGY ISN'T REALLY DOING OWT */}

            {comment.author === user.username || error ? (
              <Grid item xs={12}>
                <Button onClick={handleCommentDelete}>Delete</Button>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CommentCard;
