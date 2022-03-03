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
import { getShieldedCoinsHistory } from '../../../actions/shieldedCoinsActions';

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

function ShieldedCoinsHistoryView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { shieldedCoinsHistory, historyCount } = useSelector((state) => state.shieldedCoin);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(getShieldedCoinsHistory(limit, page * limit));
    const timer = setInterval(
      () => dispatch(getShieldedCoinsHistory(limit, page * limit)),
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, limit, page]);

  const onPageChanged = (newPage) => {
    setPage(newPage);
  };

  const onLimitChanged = (newLimit) => {
    setLimit(newLimit);
  };

  if (shieldedCoinsHistory.length === 0) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito Shielded Coins History"
      ogTitle="Incognito Shielded Coins History"
      description="Incognito Shielded Coins History: browse all shield and burn events from the creation of Incognito Network"
    >
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Box mt={3}>
          <Results count={historyCount} page={page} limit={limit} lastShielded={shieldedCoinsHistory} onPageChanged={onPageChanged} onLimitChanged={onLimitChanged} />
        </Box>
      </Container>
    </Page>
  );
}

export default ShieldedCoinsHistoryView;
