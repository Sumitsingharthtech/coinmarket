import React, {
  useEffect, useState
} from 'react';
import {
  Container, Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Results from './Results';
import { getShardBlocks } from '../../../actions/blockActions';
import Shard from '../BeaconBlocksView/Shard';
import TotalBlocks from './TotalBlocks';
import TotalTransactions from './TotalTransactions';
import LatestBlocksCount from './LatestBlocksCount';
import { getShardBlocksStats } from '../../../actions/globalStatsActions';

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

function BlocksView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { shardBlock, shardBlocksCount } = useSelector((state) => state.block);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(getShardBlocks(limit, page * limit));
    const timer = setInterval(
      () => dispatch(getShardBlocks(limit, page * limit)),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch, limit, page]);

  useEffect(() => {
    dispatch(getShardBlocksStats());
    const timer = setInterval(
      () => dispatch(getShardBlocksStats()),
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

  if (!shardBlock) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito Shard Blocks"
      ogTitle="Incognito Shard Blocks"
      description="Browse all beacon blocks of the Incognito chain on incscan.io."
    >
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <LatestBlocksCount />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalTransactions />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <Shard />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalBlocks />
          </Grid>
          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <Results count={shardBlocksCount} page={page} limit={limit} blocks={shardBlock} onPageChanged={onPageChanged} onLimitChanged={onLimitChanged} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default BlocksView;
