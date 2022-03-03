import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Divider,
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
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
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const onRowClick = (event, pair) => {
    history.push(`/pdex/markets/${pair}`);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <TablePagination
          component="div"
          count={pairs.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage="Rows:"
        />
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
                {_.orderBy(pairs, ['liquidity'], ['desc']).slice(page * limit, page * limit + limit).map((pair) => (
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
