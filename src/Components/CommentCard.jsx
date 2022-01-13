import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useVote } from "../Hooks/useVotes";
import Button from "@mui/material/Button";
import { deleteComment, getUser } from "../utils";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react/cjs/react.development";

const CommentCard = ({ comment, setNewCommentPosted }) => {
  const { voteButton } = useVote(comment.votes, "comment", comment.comment_id);
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    getUser(comment.author).then((author) => {
      setAvatarUrl(author.avatar_url);
      console.log(author.avatar_url);
    });
  }, []);

  const handleCommentDelete = () => {
    console.log(comment.comment_id);
    deleteComment(comment.comment_id)
      .then((res) => {
        setNewCommentPosted((prevValue) => prevValue - 1);
      })
      .catch((err) => {
        console.log(err);
        setError("error", err);
      });
  };

  //TODO: edit,
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1">{comment.body}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Avatar alt={comment.author} src={avatarUrl} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              Author: {comment.author} Created at: {comment.created_at}
            </Typography>
          </Grid>
          {comment.author === user.username || error ? (
            <Grid item xs={3}>
              <Button onClick={handleCommentDelete}>Delete</Button>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </CardContent>
    </Card>
    // <div>
    //   (For I am but a simple Comment, do not shank me)
    //   <p>{comment.body}</p>
    //   {voteButton}
    //   <p>
    //     Author: {comment.author} Created at: {comment.created_at}
    //   </p>
    //   {/* CURRENTLY THIS ERROR THINGY ISN'T REALLY DOING OWT */}
    //   {comment.author === user.username || error ? (
    //     <Button onClick={handleCommentDelete}>Delete</Button>
    //   ) : (
    //     <></>
    //   )}
    // </div>
  );
};

export default CommentCard;
