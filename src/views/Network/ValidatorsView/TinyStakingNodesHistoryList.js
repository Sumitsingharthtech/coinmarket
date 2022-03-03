import React from 'react';
import PropTypes from 'prop-types';
import Label from 'src/components/Label';
import {
  makeStyles, Table, TableBody, TableCell, TableRow
} from '@material-ui/core';
import moment from 'moment';
import TableContainer from '@material-ui/core/TableContainer';

const useStyles = makeStyles((theme) => ({

}));

function TinyStakingNodesHistoryList({ history }) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {history.map((item, index) => (
            <TableRow
              hover
              key={index}
            >
              <TableCell size="small">
                {moment(item.time).format('YYYY/MM/DD hh:mm A')}
              </TableCell>
              <TableCell size="small">
                {item.amount === 1
            && (
            <Label
              className={classes.label}
              color="success"
            >
              New Validator
            </Label>
            )}
                {item.stopAmount === 1
            && (
            <Label
              className={classes.label}
              color="warning"
            >
              Unstaking requested
            </Label>
            )}
                {item.amount === -1
            && (
            <Label
              className={classes.label}
              color="error"
            >
              Unstaked
            </Label>
            )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TinyStakingNodesHistoryList.propTypes = {
  history: PropTypes.array
};

export default TinyStakingNodesHistoryList;
