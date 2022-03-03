import React, { useEffect } from 'react';
import {
  Container, Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { getShardBlock } from '../../../actions/blockActions';
import ShardBlock from './ShardBlock';
import { getTransactionsByShardAndHeight } from '../../../actions/transactionActions';
import ShardTransactions from './ShardTransactions';

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

function ShardBlockView({ match: { params } }) {
  const blockHash = params.hash;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { completeShardBlock } = useSelector((state) => state.block);
  const { transactionsByShardHeight } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getShardBlock(blockHash));
    const timer = setInterval(
      () => dispatch(getShardBlock(blockHash)),
      10000
    );
    return () => clearTimeout(timer);
  }, [dispatch, blockHash]);

  useEffect(() => {
    if (completeShardBlock.byId[blockHash]) {
      dispatch(getTransactionsByShardAndHeight(completeShardBlock.byId[blockHash].shard, completeShardBlock.byId[blockHash].height));
      const timer = setInterval(
        () => dispatch(getTransactionsByShardAndHeight(completeShardBlock.byId[blockHash].shard, completeShardBlock.byId[blockHash].height)),
        10000
      );
      return () => clearTimeout(timer);
    }
  }, [dispatch, blockHash, completeShardBlock.byId]);

  if (!completeShardBlock.byId[blockHash]) {
    return null;
  }
  return (
    <Page
      className={classes.root}
      title={`Incognito Shard Block ${blockHash}`}
      ogTitle={`Incognito Shard Block ${blockHash}`}
      description={`Incognito Shard Block ${blockHash}. Height, timestamp and related transactions are detailed on incscan.io`}
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
            <ShardBlock block={completeShardBlock.byId[blockHash]} />
          </Grid>
          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <ShardTransactions transactions={transactionsByShardHeight.byId[`${completeShardBlock.byId[blockHash].shard}-${completeShardBlock.byId[blockHash].height}`]} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default ShardBlockView;
