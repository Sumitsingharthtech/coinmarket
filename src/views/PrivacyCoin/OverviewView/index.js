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
import Chart2 from './VolumeChart/Chart2';
import Overview from './Overview';
import { getPrivacyCoinMarketCap, getPrivacyCoinOverview, getPrivacyCoinUsdEvolution } from '../../../actions/privacyCoinOverviewActions';

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
  if (result < 1574294400) {
    return 1574294400;
  }
  return result;
};
const to = () => moment().utc().startOf('minute').unix();

function PrivacyCoinOverviewView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { marketCap, priceEvolution, overview } = useSelector((state) => state.privacyCoinOverview);
  const [currentTab, setCurrentTab] = useState('market-cap');
  const tabs = [
    { value: 'market-cap', label: 'Market Cap ($)' },
    { value: 'price-evolution', label: 'Price Evolution ($)' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  useEffect(() => {
    dispatch(getPrivacyCoinMarketCap(from(), to()));
    dispatch(getPrivacyCoinUsdEvolution(from(), to()));
    dispatch(getPrivacyCoinOverview());
    const timer = setInterval(
      () => {
        dispatch(getPrivacyCoinMarketCap(from(), to()));
        dispatch(getPrivacyCoinUsdEvolution(from(), to()));
        dispatch(getPrivacyCoinOverview());
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (overview.length === 0 && marketCap.length === 0) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito Privacy Coin Overview"
      ogTitle="Incognito Privacy Coin Overview"
      description="Incognito Privacy Coin Overview: max supply, circulating supply, market cap, all is available on incscan.io."
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
            <Box mt={2} mb={4}>
              {currentTab === 'market-cap' && marketCap && <Chart volumes={marketCap} /> }
              {currentTab === 'price-evolution' && priceEvolution && <Chart2 prices={priceEvolution} /> }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default PrivacyCoinOverviewView;
