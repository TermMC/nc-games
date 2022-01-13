import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../Contexts/UserContext";

const NavBar = styled.ul`
  background-color: rgba(200, 50, 0, 0.3);
  border: 1px black solid;
  margin: 20px;
`;

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <NavBar>
      Nav Bar
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/reviews/create">Post Review</Link>
      </li>
      <li>
        {user.username ? (
          <Link to={`/users/${user.username}`}> {`${user.username}`} </Link>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </li>
    </NavBar>
  );
};

export default Nav;
