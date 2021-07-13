import React from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Typography,
  Box,
  Button,
} from "@material-ui/core";

import { useStyles } from "../styles/material_ui_styles";
import { Spacer } from "../utils/helpers";
import { useHistory } from "react-router-dom";

const SeatResult = () => {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  const data = location.state.data;
  console.log(data);

  const handleButton = () => {
    history.push("/");
  };

  return (
    <Box className={classes.box}>
      <h2 className={classes.title}>{data.name}</h2>
      <h2 className={classes.subTitle}>Seat: {data.seat}</h2>
      <Spacer height={22} />

      <TableContainer className={classes.tableCont}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tbTitle} align="center">
                SUBJECT
              </TableCell>
              <TableCell className={classes.tbTitle} align="center">
                MARKS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.subjects.map((row) => (
              <TableRow>
                <TableCell align="center">{row.subject}</TableCell>
                <TableCell align="center">{row.marks}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell className={classes.tbTitle} align="center">
                TOTAL
              </TableCell>
              <TableCell className={classes.tbTitle} align="center">
                {data.totalMarks}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={classes.tbTitle} align="center">
                FINAL RESULT
              </TableCell>
              <TableCell className={classes.tbTitle} align="center">
                {data.finalResult} -{" "}
                {((data.totalMarks / 600) * 100).toFixed(1)}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Spacer height={22} />
      <Button variant="contained" color="primary" onClick={handleButton}>
        BACK
      </Button>
    </Box>
  );
};

export default SeatResult;
