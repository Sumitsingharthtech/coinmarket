import React, {
  useEffect, useState
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Results from './Results';
import { getTransactions } from '../../../actions/transactionActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

function BlocksView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { transactions, transactionsCount } = useSelector((state) => state.transaction);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [shardId, setShardId] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [type, setType] = useState(null);
  const [metadataType, setMetadataType] = useState(null);

  useEffect(() => {
    dispatch(getTransactions(limit, page * limit, shardId, from, to, type, metadataType));
    const timer = setInterval(
      () => dispatch(getTransactions(limit, page * limit, shardId, from, to, type, metadataType)),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch, limit, page, shardId, from, to, type, metadataType]);

  const onPageChanged = (newPage) => {
    setPage(newPage);
  };

  const onLimitChanged = (newLimit) => {
    setLimit(newLimit);
  };

  const onShardIdChanged = (newShardId) => {
    setShardId(newShardId);
  };

  const onFromChanged = (newFrom) => {
    setFrom(newFrom);
  };

  const onToChanged = (newTo) => {
    setTo(newTo);
  };

  const onTypeChanged = (newTo) => {
    setType(newTo);
  };

  const onMetadataTypeChanged = (newTo) => {
    setMetadataType(newTo);
  };

  if (!transactions) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito Transactions"
    >
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Box mt={3}>
          <Results
            count={transactionsCount}
            page={page}
            limit={limit}
            transactions={transactions}
            shardId={shardId}
            from={from}
            to={to}
            type={type}
            metadataType={metadataType}
            onPageChanged={onPageChanged}
            onLimitChanged={onLimitChanged}
            onShardIdChanged={onShardIdChanged}
            onFromChanged={onFromChanged}
            onToChanged={onToChanged}
            onTypeChanged={onTypeChanged}
            onMetadataTypeChanged={onMetadataTypeChanged}
          />
        </Box>
      </Container>
    </Page>
  );
}

export default BlocksView;
