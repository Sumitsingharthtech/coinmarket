import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card, Divider,
  makeStyles
} from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import ShieldedCoinsHistoryList from '../HistoryView/ShieldedCoinsHistoryList';

const useStyles = makeStyles(() => ({
  root: {}
}));

function ShieldedCoinsHistory({
  className, page, limit, count, onPageChanged, onLimitChanged, history, token, ...rest
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
          { history && <ShieldedCoinsHistoryList withTokenName={false} fullVersion historyItems={history} /> }
        </Box>
      </Card>
    </div>
  );
}

ShieldedCoinsHistory.propTypes = {
  className: PropTypes.string,
  history: PropTypes.array,
  token: PropTypes.string,
  onPageChanged: PropTypes.func,
  onLimitChanged: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number
};

export default ShieldedCoinsHistory;
