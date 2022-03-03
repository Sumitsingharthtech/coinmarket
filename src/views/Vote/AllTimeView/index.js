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
import Overview from '../OverviewView/Overview';
import Header from './Header';
import Results from '../OverviewView/Results';
import {
  getAllTimeCoinsRankVote,
  getAllTimeVotes,
  getOverviewAllTimeVotes,
  getAllTimePairsRankVote
} from '../../../actions/voteActions';
import CoinResults from '../OverviewView/CoinResults';
import PairResults from '../OverviewView/PairResults';

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

function VoteAllTimeView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    latest, overview, coinsRank, pairsRank
  } = useSelector((state) => state.votes);
  const [currentTab1, setCurrentTab1] = useState('coins');
  const tabs1 = [
    { value: 'coins', label: 'Coins ranking' },
    { value: 'pairs', label: 'Pairs ranking' }
  ];
  const [currentTab2, setCurrentTab2] = useState('latest');
  const tabs2 = [
    { value: 'latest', label: 'Latest votes' }
  ];
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const handleTabsChange1 = (event, value) => {
    setCurrentTab1(value);
  };

  const handleTabsChange2 = (event, value) => {
    setCurrentTab2(value);
  };

  useEffect(() => {
    dispatch(getAllTimeVotes(limit, page * limit));
    const timer = setInterval(
      () => {
        dispatch(getAllTimeVotes(limit, page * limit));
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, limit, page]);

  useEffect(() => {
    dispatch(getOverviewAllTimeVotes());
    dispatch(getAllTimeCoinsRankVote());
    dispatch(getAllTimePairsRankVote());
    const timer = setInterval(
      () => {
        dispatch(getOverviewAllTimeVotes());
        dispatch(getAllTimeCoinsRankVote());
        dispatch(getAllTimePairsRankVote());
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  const onPageChanged = (newPage) => {
    setPage(newPage);
  };

  const onLimitChanged = (newLimit) => {
    setLimit(newLimit);
  };

  if (!latest.value || !overview.value) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incscan votes"
      ogTitle="Incscan votes"
      description="Incscan votes"
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
            <Overview overview={overview.value} />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Box>
              <Tabs
                onChange={handleTabsChange1}
                scrollButtons="auto"
                value={currentTab1}
                variant="scrollable"
                textColor="secondary"
                className={classes.tabs}
              >
                {tabs1.map((tab) => (
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
              { currentTab1 === 'coins' && coinsRank && <CoinResults data={coinsRank} /> }
              { currentTab1 === 'pairs' && pairsRank && <PairResults data={pairsRank} /> }
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
              { currentTab2 === 'latest' && latest.value && <Results data={latest.value.result} count={parseInt(latest.value.count)} page={page} limit={limit} onPageChanged={onPageChanged} onLimitChanged={onLimitChanged} /> }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default VoteAllTimeView;
