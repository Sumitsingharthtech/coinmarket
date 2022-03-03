import React, { useEffect } from 'react';
import {
  Container, Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { getCompleteTransaction, getCompleteMempoolTransaction } from '../../../actions/transactionActions';
import Transaction from './Transaction';

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

function TransactionView({ match: { params } }) {
  const transactionHash = params.hash;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { completeTransactions, completeMempoolTransactions } = useSelector((state) => state.transaction);
  const { tokens, customTokens } = useSelector((state) => state.blockchain);

  useEffect(() => {
    dispatch(getCompleteTransaction(transactionHash));
    const timer = setInterval(
      () => dispatch(getCompleteTransaction(transactionHash)),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch, transactionHash]);

  useEffect(() => {
    dispatch(getCompleteMempoolTransaction(transactionHash));
    const timer = setInterval(
      () => dispatch(getCompleteMempoolTransaction(transactionHash)),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch, transactionHash]);

  if (!completeTransactions.byId[transactionHash] && !completeMempoolTransactions.byId[transactionHash]) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={`Incognito Transaction ${transactionHash}`}
      ogTitle={`Incognito Transaction ${transactionHash}`}
      description={`Incognito detailed transaction info for ${transactionHash}, on incscan.io.`}
    >
      <Container maxWidth="lg" className={classes.container}>
        <Header hash={transactionHash} />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <Transaction tokens={tokens} customTokens={customTokens} mempool={!(completeTransactions.byId[transactionHash])} transaction={completeTransactions.byId[transactionHash] || completeMempoolTransactions.byId[transactionHash]} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default TransactionView;
