import { useEffect, useState } from "react";
import { getCategories } from "../utils";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Grid } from "@mui/material";

const SearchBar = ({ setQueries }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);
  const makePresentable = (str) => {
    const wordArr = str.split("-");
    const neatWordArr = wordArr.map((word) => {
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    });

    return neatWordArr.join(" ");
  };

  const handleQueries = (e) => {
    setQueries((prevQueries) => {
      return { ...prevQueries, [e.target.name]: e.target.value };
    });
  };

  const handleToggleButton = (e, order) => {
    setQueries((prevQueries) => {
      return { ...prevQueries, order: order };
    });
  };

  return (
    <form>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          Search Bar
        </Grid>
        <Grid item xs={12} justifyContent="center">
          <Box sx={{ minWidth: 120, maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                id="category-select"
                labelId="category-select-label"
                name="category"
                onChange={handleQueries}
                defaultValue=""
              >
                <MenuItem value=""> All Categories</MenuItem>
                {categories.map((category) => {
                  return (
                    <MenuItem key={category.slug} value={category.slug}>
                      {makePresentable(category.slug)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} justifyContent="center">
          <Box sx={{ minWidth: 120, maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="sort-by-select-label">Sort By</InputLabel>
              <Select
                id="sort-by-select"
                labelId="sort-by-select-label"
                name="sort_by"
                onChange={handleQueries}
                defaultValue=""
              >
                <MenuItem value="owner"> Author</MenuItem>
                <MenuItem value="category"> Category</MenuItem>
                <MenuItem value="created_at"> Created On</MenuItem>
                <MenuItem value="designer"> Game Designer</MenuItem>
                <MenuItem value="title"> Review Title</MenuItem>
                <MenuItem value="votes"> Votes</MenuItem>
                <MenuItem value="comment_count"> Comments</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={2} justifyContent="center">
          <ToggleButtonGroup
            value="order-select"
            name="order"
            exclusive
            onChange={handleToggleButton}
          >
            <ToggleButton value="asc" aria-label="ascending-order">
              ASC
            </ToggleButton>
            <ToggleButton value="desc" aria-label="descending-order">
              DESC
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchBar;
