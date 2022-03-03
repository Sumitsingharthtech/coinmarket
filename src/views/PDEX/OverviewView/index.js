import React, {
  useEffect, useState
} from 'react';
import {
  Box,
  Container, Divider, Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from './Header';
import {
  getPDEXAggregatedUsdLiquidity,
  getPDEXAggregatedUsdVolumes,
  getPDEXAggregatedUsdSimpleVolumes,
  getPDEXOverview
} from '../../../actions/pDEXOverviewActions';
import Chart from './VolumeChart/Chart';
import Overview from './Overview';
import Results from './Results';
import Pies from './Pies';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  boxBg: {
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  },
  totalAggregate: {
    backgroundColor: theme.palette.primary.main,
    color: theme.lightColor,
    padding: '3px'
  },
  totalSynthesized: {
    backgroundColor: theme.chart.lightGraphColor,
    color: theme.darkColor,
    padding: '3px'
  },
  legend: {
    textAlign: 'center',
    paddingTop: '12px',
    paddingBottom: '10px',
    fontFamily: 'Roboto',
    fontSize: '13px'
  }
}));

const from = () => {
  const result = moment().utc().startOf('minute').subtract(1, 'year')
    .unix();
  if (result < 1574294400) {
    return 1574294400;
  }
  return result;
};
const to = () => moment().utc().startOf('minute').unix();

function PDexOverviewView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    aggregatedUsdVolumes, aggregatedUsdSimpleVolumes, aggregatedUsdLiquidity, overview
  } = useSelector((state) => state.pDEXOverview);
  const [currentTab2, setCurrentTab2] = useState('pairs');
  const tabs2 = [
    { value: 'pairs', label: 'Pairs' },
    { value: 'top', label: 'Top Pairs' }
  ];

  const handleTabsChange2 = (event, value) => {
    setCurrentTab2(value);
  };

  useEffect(() => {
    dispatch(getPDEXAggregatedUsdLiquidity(from(), to()));
    dispatch(getPDEXAggregatedUsdVolumes(from(), to()));
    dispatch(getPDEXAggregatedUsdSimpleVolumes(from(), to()));
    dispatch(getPDEXOverview());
    const timer = setInterval(
      () => {
        dispatch(getPDEXAggregatedUsdLiquidity(from(), to()));
        dispatch(getPDEXAggregatedUsdVolumes(from(), to()));
        dispatch(getPDEXAggregatedUsdSimpleVolumes(from(), to()));
        dispatch(getPDEXOverview());
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (aggregatedUsdVolumes.length === 0 && aggregatedUsdSimpleVolumes.length === 0 && aggregatedUsdLiquidity.length === 0) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Incognito pDEX Overview"
      ogTitle="Incognito pDEX Overview"
      description="Incognito pDEX Overview with total liquidity and volumes in dollar, and top pairs by liquidity."
    >
      <Container maxWidth="lg" className={classes.container}>
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Overview overview={overview} />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Box mt={2} mb={0}>
              {aggregatedUsdVolumes && aggregatedUsdLiquidity
              && (
              <Grid container spacing={2}>
                <Grid
                  item
                  lg={6}
                  xl={6}
                  xs={12}
                >
                  <Box className={classes.boxBg}>
                    <Chart volumes={aggregatedUsdLiquidity} watermark="Liquidity ($)" />
                    <div className={classes.legend}>
                      <span className={classes.totalAggregate}>liquidity</span>
                    </div>
                  </Box>
                </Grid>
                <Grid
                  item
                  lg={6}
                  xl={6}
                  xs={12}
                >
                  <Box className={classes.boxBg}>
                    <Chart volumes={aggregatedUsdVolumes} volumes1={aggregatedUsdSimpleVolumes} watermark="Volume ($)" />
                    <div className={classes.legend}>
                      <span className={classes.totalAggregate}>aggregate</span>
                      &nbsp;&nbsp;&nbsp;
                      <span className={classes.totalSynthesized}>synthesized</span>
                    </div>
                  </Box>
                </Grid>
              </Grid>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Box>
              <Tabs
                onChange={handleTabsChange2}
                scrollButtons="auto"
                value={currentTab2}
                variant="scrollable"
                textColor="secondary"
                className={classes.tabs}
              >
                {tabs2.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </Tabs>
            </Box>
            <Divider />
            <Box mt={2} mb={4}>
              { currentTab2 === 'pairs' && overview.perPair && <Results pairs={overview.perPair} /> }
              { currentTab2 === 'top' && overview.topPairsByLiquidity && overview.topPairsByVolume && <Pies topPairsByLiquidity={overview.topPairsByLiquidity} topPairsByVolume={overview.topPairsByVolume} totalLiquidity={overview.totalLiquidity} totalVolume={overview.totalVolume} /> }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default PDexOverviewView;
