import React, { useEffect } from 'react';
import {
  Container, Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { getBeaconBlock, getShardBlocksByBeaconHeight } from '../../../actions/blockActions';
import BeaconBlock from './BeaconBlock';
import ShardBlocksLinked from './ShardBlocksLinked';

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

function BeaconBlockView({ match: { params } }) {
  const blockHash = params.hash;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { completeBeaconBlock, shardBlocksByBeaconHeight } = useSelector((state) => state.block);

  useEffect(() => {
    dispatch(getBeaconBlock(blockHash));
    const timer = setInterval(
      () => dispatch(getBeaconBlock(blockHash)),
      10000
    );
    return () => clearTimeout(timer);
  }, [dispatch, blockHash]);

  useEffect(() => {
    if (completeBeaconBlock.byId[blockHash]) {
      dispatch(getShardBlocksByBeaconHeight(completeBeaconBlock.byId[blockHash].height));
      const timer = setInterval(
        () => dispatch(getShardBlocksByBeaconHeight(completeBeaconBlock.byId[blockHash].height)),
        10000
      );
      return () => clearTimeout(timer);
    }
  }, [dispatch, blockHash, completeBeaconBlock.byId]);

  if (!completeBeaconBlock.byId[blockHash]) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={`Incognito Beacon Block ${blockHash}`}
      ogTitle={`Incognito Beacon Block ${blockHash}`}
      description={`Incognito Beacon Block ${blockHash}. Height, timestamp, related shard blocks are detailed on incscan.io`}
    >
      <Container maxWidth="lg" className={classes.container}>
        <Header hash={blockHash} />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <BeaconBlock block={completeBeaconBlock.byId[blockHash]} />
          </Grid>
          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <ShardBlocksLinked blocks={shardBlocksByBeaconHeight.byId[completeBeaconBlock.byId[blockHash].height]} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default BeaconBlockView;
