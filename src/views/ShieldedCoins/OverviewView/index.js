import React, {
  useEffect, useState
} from 'react';
import {
  Box,
  Container, Divider, Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from './Header';
import Chart from './VolumeChart/Chart';
import Overview from './Overview';
import Results from './Results';
import {
  getShieldedCoinAggregatedUsdAmounts,
  getShieldedCoinOverview
} from '../../../actions/shieldedCoinOverviewActions';

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
  if (result < 1572480000) {
    return 1572480000;
  }
  return result;
};
const to = () => moment().utc().startOf('minute').unix();

function PDexOverviewView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { aggregatedUsdAmounts, overview } = useSelector((state) => state.shieldedCoinOverview);
  const [currentTab, setCurrentTab] = useState('total-amount');
  const [currentTab2, setCurrentTab2] = useState('coins');

  const tabs = [
    { value: 'total-amount', label: 'Total amount ($)' },
    { value: 'current-amount', label: 'Current amount ($)' },
    { value: 'volume', label: 'Volume ($)' }
  ];
  const tabs2 = [
    { value: 'coins', label: 'Coins' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handleTabsChange2 = (event, value) => {
    setCurrentTab2(value);
  };

  useEffect(() => {
    dispatch(getShieldedCoinAggregatedUsdAmounts(from(), to()));
    dispatch(getShieldedCoinOverview());
    const timer = setInterval(
      () => {
        dispatch(getShieldedCoinAggregatedUsdAmounts(from(), to()));
        dispatch(getShieldedCoinOverview());
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (aggregatedUsdAmounts.length === 0) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito Shielded Coins Overview"
      ogTitle="Incognito Shielded Coins Overview"
      description="Incognito Shielded Coins Overview: view evolution of shielded coins"
    >
      <Container maxWidth="lg" className={classes.container}>
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Overview overview={overview} />
          </Grid>
          <Grid
            item
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
              {currentTab === 'total-amount' && aggregatedUsdAmounts && <Chart volumes={aggregatedUsdAmounts.totalAmount} /> }
              {currentTab === 'current-amount' && aggregatedUsdAmounts && <Chart volumes={aggregatedUsdAmounts.currentAmount} /> }
              {currentTab === 'volume' && aggregatedUsdAmounts && <Chart volumes={aggregatedUsdAmounts.perDayAmount} /> }
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Box>
              <Tabs
                onChange={handleTabsChange2}
                scrollButtons="auto"
                value={currentTab2}
                variant="scrollable"
                textColor="secondary"
                className={classes.tabs}
              >
                {tabs2.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </Tabs>
            </Box>
            <Divider />
            <Box mt={2} mb={4}>
              { currentTab2 === 'coins' && overview.perToken && <Results tokens={overview.perToken} /> }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default PDexOverviewView;
