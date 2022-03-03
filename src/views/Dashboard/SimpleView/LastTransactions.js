import React, {
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Button,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { getLastTransactions } from 'src/actions/transactionActions';
import TransactionsList from 'src/views/Blockchain/Transaction/TransactionsList';

const useStyles = makeStyles((theme) => ({
  root: {},
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  }
}));

function LastBlocks({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { lastTransactions } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getLastTransactions());
    const timer = setInterval(
      () => dispatch(getLastTransactions()),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Latest Transactions"
      />
      <Divider />
      <Box>
        <TransactionsList transactions={lastTransactions} />
      </Box>
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          component={RouterLink}
          size="small"
          to="/blockchain/transactions"
        >
          See all
          <NavigateNextIcon className={classes.navigateNextIcon} />
        </Button>
      </Box>
    </Card>
  );
}

LastBlocks.propTypes = {
  className: PropTypes.string
};

export default LastBlocks;
