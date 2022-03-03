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
import { getCurrentCommittees } from '../../../actions/networkActions';

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

function CurrentCommitteesView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentCommittees } = useSelector((state) => state.network);

  useEffect(() => {
    dispatch(getCurrentCommittees());
    const timer = setInterval(
      () => {
        dispatch(getCurrentCommittees());
      },
      60000
    );
    return () => clearTimeout(timer);
  }, [dispatch, page]);

  return (
    <Page
      className={classes.root}
      title="Incognito Current Committees"
      ogTitle="Incognito Current Committees"
      description="All info about committees are available on incscan.io"
    >
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Box mt={1}>
          <Grid
            container
            spacing={3}
          />
        </Box>
      </Container>
    </Page>
  );
}

export default CurrentCommitteesView;
