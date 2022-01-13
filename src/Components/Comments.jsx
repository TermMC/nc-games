import { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { UserContext } from "../Contexts/UserContext";
import { getCommentsOnReview, postComment } from "../utils";
import CommentCard from "./CommentCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  }, [newCommentPosted]);

  const handleCommentSubmit = (e) => {
    //need behaviour here about if body not complete
    //perhaps prevent post comment
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
        console.log(err);
        setError(err);
      });
  };
  const handleChange = (e) => {
    setNewComment((prevComment) => {
      return { ...prevComment, body: e.target.value };
    });
  };
  return (
    <div>
      The Comments Will Be Here
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
        />
        <Button variant="text" type="submit">
          Submit
        </Button>
      </Box>
      <ul>
        {comments.map((comment) => {
          return (
            <CommentCard
              comment={comment}
              key={`comment_${comment.comment_id}`}
              setNewCommentPosted={setNewCommentPosted}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Comments;
