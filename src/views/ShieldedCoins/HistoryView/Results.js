import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card, Divider,
  makeStyles
} from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import ShieldedCoinsHistoryList from './ShieldedCoinsHistoryList';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Results({
  className, page, limit, lastShielded, count, onPageChanged, onLimitChanged, ...rest
}) {
  const classes = useStyles();

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
          <ShieldedCoinsHistoryList fullVersion historyItems={lastShielded} />
        </Box>
      </Card>
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  lastShielded: PropTypes.array,
  onPageChanged: PropTypes.func,
  onLimitChanged: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number
};

export default Results;
