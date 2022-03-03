import React, { lazy, Suspense } from 'react';
import Page from 'src/components/Page';
import { VERSION } from 'src/constants';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { MDXProvider } from '@mdx-js/react';
import components from '../mdx';

const Content = lazy(() => import('!babel-loader!mdx-loader!./Content.mdx'));

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
  },
  version: {
    color: theme.palette.text.primary,
    fontFamily: 'Roboto'
  }
}));

function AboutView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="About incscan.io"
      ogTitle="About incscan.io"
      description="incscan.io is a site managed by some Incognito community members."
    >
      <Suspense fallback={null}>
        <Container maxWidth="lg" className={classes.container}>
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
              <MDXProvider components={components}>
                <Content />
                <p className={classes.version}>{VERSION.CURRENT}</p>
              </MDXProvider>
            </Grid>
          </Grid>
        </Container>
      </Suspense>
    </Page>
  );
}

export default AboutView;
