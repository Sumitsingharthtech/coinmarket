import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useSelector } from 'react-redux';
import Header from './Header';
import Results from './Results';

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

function ShieldedCoinsView() {
  const classes = useStyles();
  const { customTokens } = useSelector((state) => state.blockchain);

  if (customTokens.byTokenId.length === 0) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito Custom Tokens"
      ogTitle="Incognito Custom Tokens"
      description="Incognito Custom Tokens: Browse all custom tokens in the Incognito Network"
    >
      <Container maxWidth="lg" className={classes.container}>
        <Header />
        <Box mt={3}>
          {customTokens.allIds && customTokens.allIds.length > 0 && <Results customTokens={customTokens} /> }
        </Box>
      </Container>
    </Page>
  );
}

export default ShieldedCoinsView;
