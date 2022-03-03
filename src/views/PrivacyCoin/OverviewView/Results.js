import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader, Divider,
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles(() => ({
  root: {},
  clickable: {
    cursor: 'pointer'
  }
}));

function Results({ className, pairs, ...rest }) {
  const classes = useStyles();
  const history = useHistory();

  const onRowClick = (event, pair) => {
    history.push(`/pdex/markets/${pair}`);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="Top pDEX pairs by liquidity" />
        <Divider />
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Pair
                  </TableCell>
                  <TableCell align="right">
                    Liquidity
                  </TableCell>
                  <TableCell align="right">
                    Volume
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pairs.map((pair) => (
                  <TableRow
                    hover
                    key={pair.pair}
                    className={classes.clickable}
                    onClick={(event) => onRowClick(event, pair.pair)}
                  >
                    <TableCell>
                      <CryptoIcon currency={pair.pair.split('-')[0]} />
                      {pair.pair}
                      {' '}
                      <CryptoIcon currency={pair.pair.split('-')[1]} />
                    </TableCell>
                    <TableCell align="right">
                      $
                      {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(pair.liquidity)}
                    </TableCell>
                    <TableCell align="right">
                      $
                      {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(pair.volume)}
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
  pairs: PropTypes.array
};

export default Results;
