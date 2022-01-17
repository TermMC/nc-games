import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import { getCommentsOnReview, postComment } from "../utils";
import CommentCard from "./CommentCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { Fab } from "@mui/material";

const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [commentQueries, setCommentsQueries] = useState({ num_limit: 2 });
  const [isMoreComments, setIsMoreComments] = useState(true);

  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState({
    username: user.username,
    body: "",
  });
  const [newCommentPosted, setNewCommentPosted] = useState(0);

  useEffect(() => {
    getCommentsOnReview(review_id, commentQueries).then((comments) =>
      setComments(comments)
    );
  }, [newCommentPosted, review_id, commentQueries]);

  const handleCommentSubmit = (e) => {
    //add logic here to make sure the comment isn't blank, probably regex it and make it display appropriate things if they try to submit comment
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
  const handleMoreComments = () => {
    setCommentsQueries((prevQueries) => {
      console.log(prevQueries.num_limit);
      return { ...prevQueries, num_limit: Number(prevQueries.num_limit) + 3 };
    });
    if (comments.length < commentQueries.num_limit) {
      setIsMoreComments(false);
    }
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
      {isMoreComments ? (
        <Fab variant="extended" onClick={handleMoreComments}>
          <ArrowDropDownCircleIcon sx={{ mr: 1 }} />
          See More Comments
        </Fab>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comments;
