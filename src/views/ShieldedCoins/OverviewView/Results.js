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

function Results({ className, tokens, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const onRowClick = (event, token) => {
    history.push(`/shielded-coins/evolution/${token}`);
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
          count={tokens.length}
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
                    Token
                  </TableCell>
                  <TableCell align="right">
                    Total Amount
                  </TableCell>
                  <TableCell align="right">
                    Current Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_.orderBy(tokens, ['totalAmount'], ['desc']).slice(page * limit, page * limit + limit).map((token) => (
                  <TableRow
                    hover
                    key={token.token}
                    className={classes.clickable}
                    onClick={(event) => onRowClick(event, token.token)}
                  >
                    <TableCell>
                      <CryptoIcon currency={token.token} />
                      {' '}
                      {token.token}
                    </TableCell>
                    <TableCell align="right">
                      $
                      {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(token.totalAmount)}
                    </TableCell>
                    <TableCell align="right">
                      $
                      {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(Math.abs(token.currentAmount))}
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
  tokens: PropTypes.array
};

export default Results;
