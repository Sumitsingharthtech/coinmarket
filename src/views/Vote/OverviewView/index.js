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
import Overview from './Overview';
import Header from './Header';
import Results from './Results';
import {
  getCoinsRankVote,
  getLatestVotes,
  getOverviewVotes,
  getPairsRankVote
} from '../../../actions/voteActions';
import CoinResults from './CoinResults';
import PairResults from './PairResults';

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

const nextVote = () => moment.utc().add(1, 'months').startOf('months');

function VoteOverviewView() {
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
  const nextVoteYear = nextVote().format('YYYY');
  const nextVoteMonth = nextVote().format('MM');
  const nextVoteFullMonth = nextVote().format('MMMM');
  const nextVoteRemainingDays = moment.duration(nextVote().diff(moment.utc())).get('days');
  const nextVoteRemainingHours = moment.duration(nextVote().diff(moment.utc())).get('hours');
  const nextVoteRemainingMinutes = moment.duration(nextVote().diff(moment.utc())).get('minutes');

  const handleTabsChange1 = (event, value) => {
    setCurrentTab1(value);
  };

  const handleTabsChange2 = (event, value) => {
    setCurrentTab2(value);
  };

  useEffect(() => {
    dispatch(getLatestVotes(nextVoteYear, nextVoteMonth, limit, page * limit));
    const timer = setInterval(
      () => {
        dispatch(getLatestVotes(nextVoteYear, nextVoteMonth, limit, page * limit));
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, limit, page, nextVoteMonth, nextVoteYear]);

  useEffect(() => {
    dispatch(getOverviewVotes(nextVoteYear, nextVoteMonth));
    dispatch(getCoinsRankVote(nextVoteYear, nextVoteMonth));
    dispatch(getPairsRankVote(nextVoteYear, nextVoteMonth));
    const timer = setInterval(
      () => {
        dispatch(getOverviewVotes(nextVoteYear, nextVoteMonth));
        dispatch(getCoinsRankVote(nextVoteYear, nextVoteMonth));
        dispatch(getPairsRankVote(nextVoteYear, nextVoteMonth));
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, nextVoteYear, nextVoteMonth]);

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
        <Header nextVoteYear={nextVoteYear} nextVoteMonth={nextVoteFullMonth} nextVoteRemainingDays={nextVoteRemainingDays} nextVoteRemainingHours={nextVoteRemainingHours} nextVoteRemainingMinutes={nextVoteRemainingMinutes}/>
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

export default VoteOverviewView;
