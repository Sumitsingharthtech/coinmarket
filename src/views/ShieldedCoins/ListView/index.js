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
import { getShieldedCoins } from '../../../actions/shieldedCoinsActions';

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

function ShieldedCoinsView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { shieldedCoin } = useSelector((state) => state.shieldedCoin);

  useEffect(() => {
    dispatch(getShieldedCoins());
    const timer = setInterval(
      () => dispatch(getShieldedCoins()),
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (shieldedCoin.length === 0) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito Shielded Coins"
      ogTitle="Incognito Shielded Coins"
      description="Incognito Shielded Coins: Browse all tokens shielded in the Incognito Network"
    >
      <Container maxWidth="lg" className={classes.container}>
        <Header />
        <Box mt={3}>
          <Results shieldedCoins={shieldedCoin} />
        </Box>
      </Container>
    </Page>
  );
}

export default ShieldedCoinsView;
