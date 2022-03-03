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
import { getBeaconBlocks } from '../../../actions/blockActions';
import LastBeaconBlock from '../Block/LastBeaconBlock';

import Epoch from './Epoch';
import Shard from './Shard';
import LastBeaconTime from '../Block/LastBeaconTime';

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
  const { beaconBlock, beaconBlocksCount } = useSelector((state) => state.block);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(getBeaconBlocks(limit, page * limit));
    const timer = setInterval(
      () => dispatch(getBeaconBlocks(limit, page * limit)),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch, limit, page]);

  const onPageChanged = (newPage) => {
    setPage(newPage);
  };

  const onLimitChanged = (newLimit) => {
    setLimit(newLimit);
  };

  if (!beaconBlock) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito Beacon Chain"
      ogTitle="Incognito Beacon Chain"
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
            <LastBeaconBlock withTime={false} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <LastBeaconTime />
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
            <Epoch />
          </Grid>
          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <Results count={beaconBlocksCount} page={page} limit={limit} blocks={beaconBlock} onPageChanged={onPageChanged} onLimitChanged={onLimitChanged} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default BlocksView;
