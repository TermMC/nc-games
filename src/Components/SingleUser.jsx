import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { getUser } from "../utils";

const SingleUser = () => {
  const { username } = useParams();

  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUser(username).then((userData) => {
      setUserData(userData);
      setIsLoading(false);
      console.log("userData", userData);
    });
  }, [username]);
  return isLoading ? (
    <p>It's loading ya'll</p>
  ) : (
    <>
      <p>{userData.name}</p>
      <p>{userData.username}</p>
      <img src={`${userData.avatar_url}`} alt="user avatar" />
    </>
  );
};

export default SingleUser;
