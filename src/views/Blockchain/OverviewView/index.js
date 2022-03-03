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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from './Header';
import Chart from './VolumeChart/Chart';
import Overview from './Overview';
import { getBlockchainOverview } from '../../../actions/blockchainActions';

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

function BlockchainOverviewView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { blockchain, overview } = useSelector((state) => state.blockchain);
  const [currentTab, setCurrentTab] = useState('transactions');
  const tabs = [
    { value: 'transactions', label: 'Transactions per day' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  useEffect(() => {
    dispatch(getBlockchainOverview());
    const timer = setInterval(
      () => {
        dispatch(getBlockchainOverview());
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!blockchain) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito Blockchain Overview"
      ogTitle="Incognito Blockchain Overview"
      description="Incognito Blockchain Overview: blocks, transactions, all is available on incscan.io."
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
            <Overview overview={blockchain} />
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
              {currentTab === 'transactions' && overview && overview.count && <Chart volumes={overview.count} /> }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default BlockchainOverviewView;
