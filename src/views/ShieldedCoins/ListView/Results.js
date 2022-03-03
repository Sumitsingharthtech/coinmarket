import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles(() => ({
  root: {},
  clickable: {
    cursor: 'pointer'
  }
}));

function Results({ className, shieldedCoins, ...rest }) {
  const classes = useStyles();
  const history = useHistory();

  const onClick = (event, token) => {
    history.push(`/shielded-coins/evolution/${token}`);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <Box>
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
                    Amount available in the network
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shieldedCoins.map((shieldedCoin, index) => (
                  <TableRow
                    hover
                    key={index}
                    className={classes.clickable}
                    onClick={(event) => onClick(event, shieldedCoin.token)}
                  >
                    <TableCell>
                      <CryptoIcon currency={shieldedCoin.token} />
                      {' '}
                      {shieldedCoin.token}
                    </TableCell>
                    <TableCell>{shieldedCoin.tokenName}</TableCell>
                    <TableCell>
                      <CryptoIcon currency={shieldedCoin.token} />
                      {' '}
                      {`${new Intl.NumberFormat('en-US', { maximumFractionDigits: 9 }).format(shieldedCoin.amount)} ${shieldedCoin.token}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  shieldedCoins: PropTypes.array
};

export default Results;
