import _ from 'lodash';
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
import { getCustomTrades } from '../../../actions/tradesActions';
import { getCustomTradingPairs } from '../../../actions/pairsActions';

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

function CustomTradesView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { completeTrades, tradesCount } = useSelector((state) => state.customTrade);
  const { customTokens } = useSelector((state) => state.blockchain);
  const { customPairs } = useSelector((state) => state.pair);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hideSmallTrades, setHideSmallTrades] = useState(false);
  const [token, setToken] = useState(null);
  const [pair, setPair] = useState(null);

  useEffect(() => {
    dispatch(getCustomTrades(limit, page * limit, hideSmallTrades, token, pair));
    const timer = setInterval(
      () => dispatch(getCustomTrades(limit, page * limit, hideSmallTrades, token, pair)),
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, limit, page, hideSmallTrades, token, pair]);

  useEffect(() => {
    dispatch(getCustomTradingPairs());
    const timer = setInterval(
      () => {
        dispatch(getCustomTradingPairs());
      },
      60000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  const onPageChanged = (newPage) => {
    setPage(newPage);
  };

  const onLimitChanged = (newLimit) => {
    setLimit(newLimit);
  };

  const onHideSmallTradesChanged = (value) => {
    setHideSmallTrades(value);
  };

  const onTokenChanged = (value) => {
    setToken(value);
  };

  const onPairChanged = (value) => {
    setPair(value);
  };

  if (!completeTrades) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito pDEX Trades"
      ogTitle="Incognito pDEX Trades"
      description="Incognito pDEX Trades history, browse all trades on incscan.io."
    >
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Box mt={3}>
          <Results tokens={_.orderBy(customTokens.allVerified, 'symbol')} token={token} pairs={customPairs} pair={pair} count={tradesCount} page={page} limit={limit} trades={completeTrades} hideSmallTrades={hideSmallTrades} onPageChanged={onPageChanged} onLimitChanged={onLimitChanged} onHideSmallTradesChanged={onHideSmallTradesChanged} onTokenChanged={onTokenChanged} onPairChanged={onPairChanged} />
        </Box>
      </Container>
    </Page>
  );
}

export default CustomTradesView;
