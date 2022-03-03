import React, {
  useEffect
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
import { getMempoolTransactions } from '../../../actions/transactionActions';

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
  const { mempool } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getMempoolTransactions());
    const timer = setInterval(
      () => dispatch(getMempoolTransactions()),
      5000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!mempool) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito Mempool"
      ogTitle="Incognito Mempool"
      description="Browse Incognito Mempool on incscan.io"
    >
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Box mt={3}>
          <Results transactions={mempool} />
        </Box>
      </Container>
    </Page>
  );
}

export default BlocksView;
