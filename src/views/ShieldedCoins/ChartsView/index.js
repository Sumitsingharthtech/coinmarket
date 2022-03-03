import React, { useEffect, useState } from 'react';
import {
  Box,
  Container, Divider,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VolumeChart from './VolumeChart';
import ShieldedCoinsHistory from './ShieldedCoinsHistory';
import {
  getLastShieldedCoinsByToken,
  getShieldedCoinEvolution,
  getShieldedCoinOverview,
  getShieldedCoins, getShieldedCoinUsdEvolution
} from '../../../actions/shieldedCoinsActions';
import Header from './Header';
import About from './About';
import { DEFAULTS } from '../../../constants';

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

const from = () => {
  const result = moment().utc().startOf('minute').subtract(1, 'year').unix();
  if (result < 1572566400) {
    return 1572566400;
  }
  return result;
};
const to = () => moment().utc().startOf('minute').unix();

function ChartsView({ match: { params } }) {
  const classes = useStyles();
  const token = params.token ? params.token : DEFAULTS.CURRENCY;
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const {
    shieldedCoin, shieldedCoinByToken, shieldedCoinEvolution, shieldedCoinUsdEvolution, shieldedCoinByTokenCount, shieldedCoinOverview
  } = useSelector((state) => state.shieldedCoin);
  const currentVolumes = shieldedCoinEvolution.byId[token];
  const currentUsdVolumes = shieldedCoinUsdEvolution.byId[token];
  const currentOverview = shieldedCoinOverview.byId[token];
  const [currentTab, setCurrentTab] = useState('about');

  const tabs = [
    { value: 'about', label: 'About' },
    { value: 'evolution', label: 'Evolution' },
    { value: 'evolution-in-usd', label: 'Evolution ($)' },
    { value: 'volume-in-usd', label: 'Volume ($)' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const onPageChanged = (newPage) => {
    setPage(newPage);
  };

  const onLimitChanged = (newLimit) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    dispatch(getLastShieldedCoinsByToken(token, limit, page * limit));
    const timer = setInterval(
      () => dispatch(getLastShieldedCoinsByToken(token, limit, page * limit)),
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, token, limit, page]);

  useEffect(() => {
    dispatch(getShieldedCoins());
    const timer = setInterval(
      () => dispatch(getShieldedCoins()),
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getShieldedCoinEvolution(token, from(), to()));
    const timer = setInterval(
      () => {
        dispatch(getShieldedCoinEvolution(token, from(), to()));
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getShieldedCoinUsdEvolution(token, from(), to()));
    const timer = setInterval(
      () => {
        dispatch(getShieldedCoinUsdEvolution(token, from(), to()));
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getShieldedCoinOverview(token));
    const timer = setInterval(
      () => {
        dispatch(getShieldedCoinOverview(token));
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, token]);

  const onTokenSelected = (newToken) => {
    if (newToken && newToken !== token) {
      setPage(0);
      setLimit(10);
      history.push(`/shielded-coins/evolution/${newToken}`);
    }
  };

  return (
    <Page
      className={classes.root}
      title={`Incognito ${token} Shielded Coin`}
      ogTitle={`Incognito ${token} Shielded Coin`}
      description={`Incognito ${token} Shielded Coin: Browse all burn and shield events and total liquidity of ${token}`}
    >
      <Container maxWidth="lg" className={classes.container}>
        <Header token={token} tokens={shieldedCoin} onTokenSelected={onTokenSelected} />
        <Box mt={1}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xl={12}
              lg={12}
              xs={12}
            >
              <Box>
                <Tabs
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  value={currentTab}
                  variant="scrollable"
                  textColor="secondary"
                  className={classes.tabs}
                >
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.value}
                      label={tab.label}
                      value={tab.value}
                    />
                  ))}
                </Tabs>
              </Box>
              <Divider />
              <Box mt={2} mb={0}>
                {currentTab === 'about' && currentOverview && <About tokenSummary={currentOverview} />}
                {currentTab === 'evolution' && currentVolumes && <VolumeChart token={token} evolution={currentVolumes} />}
                {currentTab === 'evolution-in-usd' && currentUsdVolumes && <VolumeChart token={token} evolution={currentUsdVolumes.currentAmount} />}
                {currentTab === 'volume-in-usd' && currentUsdVolumes && <VolumeChart token={token} evolution={currentUsdVolumes.perDayAmount} />}
              </Box>
            </Grid>
            <Grid
              item
              xl={12}
              lg={12}
              xs={12}
            >
              <ShieldedCoinsHistory token={token} history={shieldedCoinByToken.byId[token]} count={shieldedCoinByTokenCount} page={page} limit={limit} onPageChanged={onPageChanged} onLimitChanged={onLimitChanged} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default ChartsView;
