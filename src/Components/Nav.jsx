import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import HomeIcon from "@mui/icons-material/Home";

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }} container spacing={2}>
      <AppBar>
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item>
              <Link to="/">
                <IconButton size="large" edge="start" sx={{ mr: 2 }}>
                  <HomeIcon />
                </IconButton>
              </Link>
            </Grid>
            {/* <Grid item>
              <Link to="/reviews/create">
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  Post Review{" "}
                </Typography>
              </Link>
            </Grid> */}
            <Grid item>
              {user.username ? (
                <Link to={`/users/${user.username}`}>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    {" "}
                    {`${user.username}`}{" "}
                  </Typography>
                </Link>
              ) : (
                <Link to="/login">
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Log In
                  </Typography>
                </Link>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default Nav;
