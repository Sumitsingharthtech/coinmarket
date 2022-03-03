import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Header from './Header';
import VolumeChart from './VolumeChart';
import StakingNodesHistory from './StakingNodesHistory';
import { getLastStakingNodesHistory, getStakingNodesEvolution } from '../../../actions/networkActions';

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

const from = () => moment('2019-10-01T00:00:00Z').utc().unix();
const to = () => moment().utc().startOf('minute').unix();

function StakingNodesView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const limit = 13;
  const [page, setPage] = useState(0);
  const { stakingNodeEvolution, lastStakingNodeHistory, lastStakingNodeHistoryCount } = useSelector((state) => state.network);

  const onPageChanged = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getLastStakingNodesHistory(limit, limit * page));
    const timer = setInterval(
      () => {
        dispatch(getLastStakingNodesHistory(limit, limit * page));
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(getStakingNodesEvolution(from(), to()));
    const timer = setInterval(
      () => dispatch(getStakingNodesEvolution(from(), to())),
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <Page
      className={classes.root}
      title="Incognito Validators Evolution"
      ogTitle="Incognito Validators Evolution"
      description="All info about network validators are available on incscan.io"
    >
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Box mt={1}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xl={8}
              lg={8}
              sm={12}
              xs={12}
            >
              { stakingNodeEvolution && <VolumeChart evolution={stakingNodeEvolution} from={from()} to={to()} /> }
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              sm={12}
              xs={12}
            >
              <StakingNodesHistory limit={limit} history={lastStakingNodeHistory} page={page} onPageChanged={onPageChanged} count={lastStakingNodeHistoryCount} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default StakingNodesView;
