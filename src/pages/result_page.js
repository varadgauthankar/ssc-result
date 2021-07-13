import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../styles/material_ui_styles";
import { useHistory } from "react-router-dom";
var jsonQuery = require("json-query");

const ResultPage = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const name = location.state.name.trim().toUpperCase();
  const centre = location.state.centre.toLowerCase();
  // console.log(centre);
  // console.log(name);

  const [finalResultList, setfinalResultList] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    queryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function queryData() {
    var result = await getData();
    setIsLoaded(true);
    setfinalResultList(result);
    // console.log(finalResultList);
  }

  async function getData() {
    var json = await fetch("/results.json");
    var res = await json.json();
    var resultsFromCentre = jsonQuery(`[*centre=${centre}]`, { data: res });
    console.log(resultsFromCentre);
    var resultsList = resultsFromCentre.value;
    console.log(resultsList);
    var resultFromNames = resultsList.filter((s) => {
      var split = s.name.split(" ");
      return split[0].includes(name) || split[split.length - 1].includes(name);
    });
    return resultFromNames;
  }

  function handleOnClick(index) {
    console.log(index);
    history.push(`/result/${finalResultList[index].seat}`, {
      data: finalResultList[index],
    });
  }

  return (
    <Box className={classes.box}>
      {isLoaded ? (
        finalResultList.length > 0 ? (
          <>
            <h2>
              {finalResultList.length} results for {name}
            </h2>
            <List className={classes.root}>
              {finalResultList.map((item, index) => {
                return (
                  <>
                    <ListItem
                      id={index}
                      alignItems="flex-start"
                      button
                      onClick={() => handleOnClick(index)}
                    >
                      <ListItemText
                        id={index}
                        primary={item.name}
                        secondary={"Seat: " + item.seat}
                      ></ListItemText>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          </>
        ) : (
          <>
            <Typography variant="h6">No Results :(</Typography>
            <Typography>
              check spelling or try with surname/first name.
            </Typography>
          </>
        )
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default ResultPage;
