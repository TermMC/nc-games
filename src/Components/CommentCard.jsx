import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useVote } from "../Hooks/useVotes";
import Button from "@mui/material/Button";
import { deleteComment } from "../utils";

const CommentCard = ({ comment, setNewCommentPosted }) => {
  const { voteButton } = useVote(comment.votes, "comment", comment.comment_id);
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
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
    <div>
      (For I am but a simple Comment, do not shank me)
      <p>{comment.body}</p>
      {voteButton}
      <p>
        Author: {comment.author} Created at: {comment.created_at}
      </p>
      {/* CURRENTLY THIS ERROR THINGY ISN'T REALLY DOING OWT */}
      {comment.author === user.username || error ? (
        <Button onClick={handleCommentDelete}>Delete</Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentCard;
