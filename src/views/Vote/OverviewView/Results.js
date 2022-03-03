import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Divider, Hidden,
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import moment from 'moment';
import CryptoIcon from '../../../components/CryptoIcon';
import ellipsis from '../../../utils/ellipsis';

const useStyles = makeStyles(() => ({
  root: {},
  clickable: {
    cursor: 'pointer'
  }
}));

const base = (pair) => pair.split('-')[0];

const quote = (pair) => pair.split('-')[1];

function Results({
  className, data, page, limit, count, onPageChanged, onLimitChanged, ...rest
}) {
  const classes = useStyles();
  const history = useHistory();

  const onRowClick = (event, hash) => {
    history.push(`/tx/${hash}`);
  };

  const handlePageChange = (event, newPage) => {
    onPageChanged(newPage);
  };

  const handleLimitChange = (event) => {
    onLimitChanged(event.target.value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <TablePagination
          component="div"
          count={count}
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
                    Date
                  </TableCell>
                  <TableCell>
                    Hash
                  </TableCell>
                  <TableCell>
                    Vote
                  </TableCell>
                  <TableCell>
                    Count
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((vote) => (
                  <TableRow
                    hover
                    key={vote.id}
                    className={classes.clickable}
                    onClick={(event) => onRowClick(event, vote.hash)}
                  >
                    <TableCell>{moment(vote.timestamp).format('YYYY/MM/DD hh:mm A')}</TableCell>
                    <TableCell>
                      <Hidden smDown>
                        {vote.hash}
                      </Hidden>
                      <Hidden mdUp>
                        {ellipsis(vote.hash, 2)}
                      </Hidden>
                    </TableCell>
                    <TableCell>
                      {vote.type === 'coin' && (
                      <div>
                        <CryptoIcon currency={vote.info} customVerifiedByName />
                        {' '}
                        {vote.info}
                      </div>
                      )}
                      {vote.type === 'pair' && (
                      <div>
                        <CryptoIcon currency={base(vote.info)} customVerifiedByName />
                        {' '}
                        {vote.info}
                        {' '}
                        <CryptoIcon currency={quote(vote.info)} customVerifiedByName />
                      </div>
                      )}
                    </TableCell>
                    <TableCell>{vote.amount}</TableCell>
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
  data: PropTypes.array,
  onPageChanged: PropTypes.func,
  onLimitChanged: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number
};

export default Results;
