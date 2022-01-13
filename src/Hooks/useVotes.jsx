import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";

import { useState } from "react";
// import { UserContext } from "../Contexts/UserContext";
import { patchVotes } from "../utils";

export const useVote = (currVotes = 0, endpoint, id) => {
  // const { setUser } = UserContext();
  //use this to stop voting twice by leaving page and coming back
  const [isVoted, setIsVoted] = useState(false);
  const [votes, setVotes] = useState(currVotes);
  const [error, setError] = useState(null);

  const handleVote = () => {
    if (isVoted) {
      setVotes((prevVotes) => {
        return Number(prevVotes) - 1;
      });
      patchVotes(-1, endpoint, id)
        // .then(()=>{
        //   setUser(prevUser=>{ return {prevUser..., votedReviews:"hong"}})})
        .catch((err) => {
          console.log("err in -1", err);
          setVotes((prevVotes) => {
            return Number(prevVotes) + 1;
          });
          setError({ err });
        });
    } else {
      setVotes((prevVotes) => {
        return Number(prevVotes) + 1;
      });
      patchVotes(1, endpoint, id).catch((err) => {
        setVotes((prevVotes) => {
          return Number(prevVotes) - 1;
        });
        console.log("err in 1", err);
        setError({ err });
      });
    }
    setIsVoted((prevIsVoted) => {
      return !prevIsVoted;
    });
  };

  const voteButton = error ? (
    <p>Voting Not Available :(</p>
  ) : (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab aria-label="like" onClick={handleVote}>
        {votes}
        <StarTwoToneIcon color={isVoted ? "success" : "disabled"} />
      </Fab>
    </Box>
  );

  return { votes, setVotes, voteButton };
};
