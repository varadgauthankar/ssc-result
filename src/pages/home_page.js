import React, { useState } from "react";
import {
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  Typography,
  Link,
} from "@material-ui/core";

import { Spacer } from "../utils/helpers";
import { useStyles } from "../styles/material_ui_styles";

import { useHistory } from "react-router-dom";

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [centre, setCentre] = useState("");
  const [name, setName] = useState("");

  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");

  const [isCentreError, setIsCentreError] = useState(false);
  const [isCentreErrorText, setCentreErrorText] = useState("");

  const twitter = "https://twitter.com/varadgauthankar";

  const handleTextField = (event) => {
    setName(event.target.value);
  };

  const handleMenu = (event) => {
    setCentre(event.target.value);
  };

  const validateForm = () => {
    if (validateName() && validateCentre()) {
      return true;
    } else return false;
  };

  const validateCentre = () => {
    if (centre === "") {
      setCentreErrorText("Select centre");
      setIsCentreError(true);
      return false;
    } else {
      setCentreErrorText("");
      setIsCentreError(false);
      return true;
    }
  };

  const validateName = () => {
    if (name === "") {
      setNameErrorText("Enter the name.");
      setIsNameError(true);
      return false;
    } else {
      setNameErrorText("");
      setIsNameError(false);
      return true;
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      history.push("/result", { name, centre });
    }
  };

  return (
    <Box className={classes.box}>
      <h2>Goa Board SSC Result 2021</h2>

      <Spacer height={12} />

      <FormControl className={classes.formControl}>
        <TextField
          label="Name"
          variant="outlined"
          helperText={nameErrorText}
          placeholder="First name or Surname"
          error={isNameError}
          onChange={handleTextField}
        />

        <Spacer height={12} />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Centre</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={centre}
            onChange={handleMenu}
            label="Centre"
            helperText={isCentreErrorText}
            error={isCentreError}
          >
            <MenuItem value="sanguem">Sanguem</MenuItem>
            <MenuItem value="dharbandora">Dharbandora</MenuItem>
            <MenuItem value="canacona">Canacona</MenuItem>
            <MenuItem value="pernem">Pernem</MenuItem>
            <MenuItem value="ponda">Ponda</MenuItem>
            <MenuItem value="bicholim">Bicholim</MenuItem>
            <MenuItem value="sattari">Sattari</MenuItem>
            <MenuItem value="mormugao">Mormugao</MenuItem>
            <MenuItem value="salcete">Salcete</MenuItem>
            <MenuItem value="bardez">Bardez</MenuItem>
            <MenuItem value="tiswadi">Tiswadi</MenuItem>
            <MenuItem value="kepem">Kepem</MenuItem>
          </Select>
        </FormControl>

        <Spacer height={12} />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </FormControl>

      <Spacer height={22} />

      <Typography className={classes.root}>Developed by</Typography>
      <Typography className={classes.root}>
        <Link color="primary" rel="noopener" target="_blank" href={twitter}>
          Varad Gauthankar
        </Link>
      </Typography>
    </Box>
  );
};

export default HomePage;
