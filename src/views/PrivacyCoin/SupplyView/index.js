import React, { useEffect } from 'react';
import _ from 'lodash';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Header from './Header';
import VolumeChart from './VolumeChart';
import { getPrivacyCoinTotalStaked, getPrivacyCoinTotalSupply, getPrivacyCoinTotalLockedInPDEX } from '../../../actions/privacyCoinSupplyActions';

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

const intervals = [
  {
    text: 'Six hours',
    value: '6H',
    granularity: 21600
  },
  {
    text: 'One day',
    value: '1D',
    granularity: 86400
  }
];

const findInterval = (value) => {
  const result = _.find(intervals, (i) => i.value === value);
  if (!result) {
    return intervals[1];
  }
  return result;
};

const from = () => moment().utc().startOf('minute').subtract(1, 'year').unix();
const to = () => moment().utc().startOf('minute').unix();

function SupplyView({ match: { params } }) {
  const classes = useStyles();
  const interval = params.interval ? findInterval(params.interval) : findInterval('1D');
  const history = useHistory();
  const dispatch = useDispatch();
  const { totalSupply, totalStaked, totalLockedInPDex } = useSelector((state) => state.privacyCoinSupply);
  let currentSupply = totalSupply.byId[interval.granularity];
  let currentStaked = totalStaked.byId[interval.granularity];
  const currentLockedInPDex = totalLockedInPDex.byId[interval.granularity];

  useEffect(() => {
    dispatch(getPrivacyCoinTotalSupply(interval.granularity, from(), to()));
    dispatch(getPrivacyCoinTotalStaked(interval.granularity, from(), to()));
    dispatch(getPrivacyCoinTotalLockedInPDEX(interval.granularity, from(), to()));
    const timer = setInterval(
      () => {
        dispatch(getPrivacyCoinTotalSupply(interval.granularity, from(), to()));
        dispatch(getPrivacyCoinTotalStaked(interval.granularity, from(), to()));
        dispatch(getPrivacyCoinTotalLockedInPDEX(interval.granularity, from(), to()));
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, interval.granularity]);


  const onIntervalSelected = (newInterval) => {
    if (newInterval && newInterval.value !== interval.value) {
      currentSupply = undefined;
      currentStaked = undefined;
      history.push(`/privacy-coin/supply/${newInterval.value}`);
    }
  };

  return (
    <Page
      className={classes.root}
      title="Incognito Privacy Coin Supply"
      ogTitle="Incognito Privacy Coin Supply"
      description="Incognito Privacy Coin Supply: browse the evolution of PRV coin supply."
    >
      <Container maxWidth="lg" className={classes.container}>
        <Header intervals={intervals} interval={interval} onIntervalSelected={onIntervalSelected} />
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
              <VolumeChart volumes={currentSupply} volumes1={currentStaked} volumes2={currentLockedInPDex} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default SupplyView;
