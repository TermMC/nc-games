import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import { useEffect, useState } from "react";
import { patchVotes } from "../utils";

const VotesButton = ({ currVotes, endpoint, id }) => {
  const [isVoted, setIsVoted] = useState(false);
  const [votes, setVotes] = useState(currVotes);
  const [error, setError] = useState(null);

  useEffect(() => {
    const prevVotes = localStorage.getItem(`${endpoint}Votes`).split(",");

    if (prevVotes.includes(String(id))) {
      setIsVoted(true);
    }
  }, []);

  const handleVote = () => {
    if (isVoted) {
      setVotes((prevVotes) => {
        return Number(prevVotes) - 1;
      });
      patchVotes(-1, endpoint, id)
        .then(() => {
          const checkerArr = localStorage
            .getItem(`${endpoint}Votes`)
            .split(",");
          const indexToRmv = checkerArr.findIndex(
            (element) => element === `${id}`
          );
          checkerArr.splice(indexToRmv, 1);
          localStorage.setItem(`${endpoint}Votes`, checkerArr.join(","));
        })
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
      patchVotes(1, endpoint, id)
        .then(() => {
          let oldVal = localStorage.getItem(`${endpoint}Votes`);
          console.log(oldVal);
          oldVal
            ? localStorage.setItem(`${endpoint}Votes`, `${oldVal},${id}`)
            : localStorage.setItem(`${endpoint}Votes`, `${id}`);
        })
        .catch((err) => {
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

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab aria-label="like" onClick={handleVote}>
        {votes}
        <StarTwoToneIcon color={isVoted ? "success" : "disabled"} />
      </Fab>
    </Box>
  );
};
export default VotesButton;
