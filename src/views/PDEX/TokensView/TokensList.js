import React from 'react';
import PropTypes from 'prop-types';
import Label from 'src/components/Label';
import {
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles((theme) => ({

}));

const showEvolution = (classes, percentage) => {
  if (percentage === 0) {
    return (
      <Label
        className={classes.label}
      >
        {percentage}
        %
      </Label>
    );
  } if (percentage === '+inf') {
    return (
      <Label
        className={classes.label}
        color="success"
      >
        {percentage}
        %
      </Label>
    );
  } if (percentage > 0) {
    return (
      <Label
        className={classes.label}
        color="success"
      >
        +
        {percentage}
        %
      </Label>
    );
  }
  return (
    <Label
      className={classes.label}
      color="error"
    >
      {percentage}
      %
    </Label>
  );
};


function TokensList({
  tokens
}) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Token
            </TableCell>
            <TableCell>
              Token Name
            </TableCell>
            <TableCell>
              Status
            </TableCell>
            <TableCell align="right">
              Available in pDEX
            </TableCell>
            <TableCell align="right">
              1 day change
            </TableCell>
            <TableCell align="right">
              7 days change
            </TableCell>
            <TableCell align="right">
              30 days change
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens.map((token) => (
            <TableRow
              hover
              key={token.token}
            >
              <TableCell>
                <CryptoIcon currency={token.token} />
                {' '}
                {token.token}
              </TableCell>
              <TableCell>{token.tokenName}</TableCell>
              <TableCell>active</TableCell>
              <TableCell align="right">
                {token.amount}
              </TableCell>
              <TableCell align="right">
                { showEvolution(classes, token.oneDayEvolution) }
              </TableCell>
              <TableCell align="right">
                { showEvolution(classes, token.sevenDaysEvolution) }
              </TableCell>
              <TableCell align="right">
                { showEvolution(classes, token.thirtyDaysEvolution) }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TokensList.propTypes = {
  tokens: PropTypes.array
};

export default TokensList;
