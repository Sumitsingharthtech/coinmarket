import React, {
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Results from './Results';
import { getPDEXTokens } from '../../../actions/pDEXTokensActions';

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

function TokensView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tokens } = useSelector((state) => state.pDEXtoken);

  useEffect(() => {
    dispatch(getPDEXTokens());
    const timer = setInterval(
      () => dispatch(getPDEXTokens()),
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (tokens.length === 0) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito pDEX Tokens"
      ogTitle="Incognito pDEX Tokens"
      description="Incognito pDEX Tokens, evolution of all tokens available in the pDEX."
    >
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Box mt={3}>
          <Results tokens={tokens} />
        </Box>
      </Container>
    </Page>
  );
}

export default TokensView;
