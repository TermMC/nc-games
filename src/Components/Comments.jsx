import { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { UserContext } from "../Contexts/UserContext";
import { getCommentsOnReview, postComment } from "../utils";
import CommentCard from "./CommentCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState({
    username: user.username,
    body: "",
  });
  const [newCommentPosted, setNewCommentPosted] = useState(0);

  useEffect(() => {
    getCommentsOnReview(review_id).then((comments) => setComments(comments));
  }, [newCommentPosted, review_id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log(newComment);
    postComment(review_id, newComment)
      .then(() => {
        setNewCommentPosted((currValue) => currValue + 1);
        setNewComment((prevComment) => {
          return { ...prevComment, body: "" };
        });
      })
      .catch((err) => {
        setError(err);
        //what to do with this, console log :/ probably could be some more useful thing
        console.log(error);
      });
  };
  const handleChange = (e) => {
    setNewComment((prevComment) => {
      return { ...prevComment, body: e.target.value };
    });
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleCommentSubmit}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Review the review..."
          multiline
          maxRows={4}
          name="body"
          value={newComment.body}
          onChange={handleChange}
          required
        />
        <Button
          variant="text"
          type="submit" /*why doesn't this work{error ? "disabled" : ""}*/
        >
          Submit
        </Button>
      </Box>
      <Grid container spacing={2}>
        {comments.map((comment) => {
          return (
            <CommentCard
              comment={comment}
              key={`comment_${comment.comment_id}`}
              setNewCommentPosted={setNewCommentPosted}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default Comments;
