import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import { useStyles } from "../styles/material_ui_styles";
import { useHistory } from "react-router-dom";
var jsonQuery = require("json-query");

const ResultPage = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const name = location.state.name.toUpperCase();
  const centre = location.state.centre;

  const [finalResultList, setfinalResultList] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    queryData();
  }, []);

  async function queryData() {
    var result = await getData();
    setIsLoaded(true);
    setfinalResultList(result);
    console.log(finalResultList);
  }

  async function getData() {
    var json = await fetch("/results.json");
    var res = await json.json();
    var resultsFromCentre = jsonQuery(`[*centre=${centre}]`, { data: res });

    var resultsList = resultsFromCentre.value;
    var resultFromNames = resultsList.filter((s) => {
      return (
        s.name.split(" ")[0].includes(name) ||
        s.name.split(" ")[2].includes(name)
      );
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
      <h2>
        {finalResultList.length} results for {name}
      </h2>

      {isLoaded ? (
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
                {/* <Divider variant="inset" component="li" /> */}
              </>
            );
          })}
        </List>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </Box>
  );
};

export default ResultPage;
