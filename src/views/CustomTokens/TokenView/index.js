import React, { useEffect } from 'react';
import _ from 'lodash';
import {
  Container, Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Token from './Token';
import { getCustomToken } from '../../../actions/blockchainActions';
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

const filterPairs = (pairs, token) => {
  if (!token.symbol) return [];
  return _.filter(pairs, (pair) => pair.startsWith(token.symbol) || pair.endsWith(token.symbol));
};

function TokenView({ match: { params } }) {
  const { tokenId } = params;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { completeCustomTokens } = useSelector((state) => state.blockchain);
  const { customPairs } = useSelector((state) => state.pair);
  const token = completeCustomTokens.byTokenId[tokenId];

  useEffect(() => {
    dispatch(getCustomToken(tokenId));
    dispatch(getCustomTradingPairs());
    const timer = setInterval(
      () => {
        dispatch(getCustomToken(tokenId));
        dispatch(getCustomTradingPairs());
      },
      60000
    );
    return () => clearTimeout(timer);
  }, [dispatch, tokenId]);

  if (!token) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={`Incognito Custom Token ${token.name}`}
      ogTitle={`Incognito Custom Token ${token.name}`}
      description={`Incognito detailed custom token info for ${token.name}, on incscan.io.`}
    >
      <Container maxWidth="lg" className={classes.container}>
        <Header token={token} />
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
            <Token token={token} pairs={filterPairs(customPairs, token)} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default TokenView;
