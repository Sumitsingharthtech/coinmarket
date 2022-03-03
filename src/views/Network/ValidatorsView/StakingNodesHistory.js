import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card, Divider,
  makeStyles
} from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import TinyStakingNodesHistoryList from './TinyStakingNodesHistoryList';

const useStyles = makeStyles(() => ({
  root: {}
}));

function StakingNodesHistory({
  className, page, count, onPageChanged, limit, history, ...rest
}) {
  const classes = useStyles();

  const handlePageChange = (event, newPage) => {
    onPageChanged(newPage);
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
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[limit]}
        />
        <Divider />
        <Box>
          { history && <TinyStakingNodesHistoryList history={history} /> }
        </Box>
      </Card>
    </div>
  );
}

StakingNodesHistory.propTypes = {
  className: PropTypes.string,
  history: PropTypes.array,
  onPageChanged: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number
};

export default StakingNodesHistory;
