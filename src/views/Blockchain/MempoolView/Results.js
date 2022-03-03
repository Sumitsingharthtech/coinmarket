import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card, CardHeader, Divider,
  makeStyles
} from '@material-ui/core';
import TransactionsList from '../Transaction/TransactionsList';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Results({ className, transactions, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title={`${transactions.allIds.length} transactions`}
        />
        <Divider />
        <Box>
          <TransactionsList mined={false} transactions={transactions} />
        </Box>
      </Card>
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  transactions: PropTypes.object
};

export default Results;
