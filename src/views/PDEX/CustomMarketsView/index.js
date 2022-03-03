import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Box,
  Container, Divider,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from '../MarketsView/Header';
import CandleChart from './CandleChart';
import {
  getCustomCrossPoolCandles,
  getCustomCrossPoolVolumes,
  getCustomCandles,
  getCustomLiquidity,
  getCustomVolumes
} from '../../../actions/candlesActions';
import Trades from './Trades';
import { getCustomTradesByPair } from '../../../actions/tradesActions';
import VolumeChart from '../MarketsView/VolumeChart';
import { getCustomTradingPairs } from '../../../actions/pairsActions';
import { DEFAULTS } from '../../../constants';

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

const intervals = [
  {
    text: 'One hour',
    value: '1H',
    granularity: 3600
  },
  {
    text: 'Six hours',
    value: '6H',
    granularity: 21600
  },
  {
    text: 'One day',
    value: '1D',
    granularity: 86400
  },
  {
    text: 'One week',
    value: '1W',
    granularity: 604800
  }
];

const findInterval = (value) => {
  const result = _.find(intervals, (i) => i.value === value);
  if (!result) {
    return intervals[1];
  }
  return result;
};

const getReversedQueryParam = (location) => {
  if (!location.search) {
    return false;
  }
  const params = new URLSearchParams(location.search);
  return params.get('reversed') ? params.get('reversed') === 'true' : false;
};

const inversePair = (pair) => (`${quote(pair)}-${base(pair)}`);

const base = (pair) => pair.split('-')[0];

const quote = (pair) => pair.split('-')[1];

const from = () => moment().utc().startOf('minute').subtract(1, 'year').unix();
const to = () => moment().utc().startOf('minute').unix();

function CustomMarketsView({ location, match: { params } }) {
  const classes = useStyles();
  const pair = params.pair ? params.pair : DEFAULTS.CUSTOM_PAIR;
  const isCrossPool = !pair.startsWith('PRV');
  const interval = params.interval ? findInterval(params.interval) : findInterval('6H');
  const [reversedChart, setReversedChart] = useState(getReversedQueryParam(location));
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hideSmallTrades, setHideSmallTrades] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { customPairs } = useSelector((state) => state.pair);
  const { candles, liquidity, volumes } = useSelector((state) => state.customCandle);
  const { tradesByPair, tradesByPairCount } = useSelector((state) => state.customTrade);
  let currentCandles = candles.byId[`${pair}-${interval.granularity}`];
  const currentVolumes = volumes.byId[`${pair}-${interval.granularity}`];
  const currentLiquidity1 = liquidity.byId[`${pair}-${base(pair)}-${interval.granularity}`];
  const currentLiquidity2 = liquidity.byId[`${pair}-${quote(pair)}-${interval.granularity}`];
  const [currentTab, setCurrentTab] = useState('chart');

  const tabs = [
    { value: 'chart', label: 'Chart' }
  ];
  if (!isCrossPool) {
    tabs.push({ value: 'liquidity', label: 'Liquidity' });
  }

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const onPageChanged = (newPage) => {
    setPage(newPage);
  };

  const onLimitChanged = (newLimit) => {
    setLimit(newLimit);
  };

  const onHideSmallTradesChanged = (value) => {
    setHideSmallTrades(value);
  };

  useEffect(() => {
    dispatch(getCustomTradesByPair(pair, limit, page * limit, hideSmallTrades));
    const timer = setInterval(
      () => dispatch(getCustomTradesByPair(pair, limit, page * limit, hideSmallTrades)),
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, pair, page, limit, hideSmallTrades]);

  useEffect(() => {
    if (!isCrossPool) {
      dispatch(getCustomCandles(pair, interval.granularity, from(), to(), reversedChart));
      dispatch(getCustomVolumes(pair, interval.granularity, from(), to(), reversedChart));
      const timer = setInterval(
        () => {
          dispatch(getCustomCandles(pair, interval.granularity, from(), to(), reversedChart));
          dispatch(getCustomVolumes(pair, interval.granularity, from(), to(), reversedChart));
        },
        30000
      );
      return () => clearTimeout(timer);
    }
    dispatch(getCustomCrossPoolCandles(pair, interval.granularity, from(), to(), reversedChart));
    dispatch(getCustomCrossPoolVolumes(pair, interval.granularity, from(), to(), reversedChart));
    const timer = setInterval(
      () => {
        dispatch(getCustomCrossPoolCandles(pair, interval.granularity, from(), to(), reversedChart));
        dispatch(getCustomCrossPoolVolumes(pair, interval.granularity, from(), to(), reversedChart));
      },
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch, pair, interval.granularity, reversedChart, isCrossPool]);

  useEffect(() => {
    if (!isCrossPool) {
      dispatch(getCustomLiquidity(pair, base(pair), interval.granularity, from(), to()));
      dispatch(getCustomLiquidity(pair, quote(pair), interval.granularity, from(), to()));
      const timer = setInterval(
        () => {
          dispatch(getCustomLiquidity(pair, base(pair), interval.granularity, from(), to()));
          dispatch(getCustomLiquidity(pair, quote(pair), interval.granularity, from(), to()));
        },
        30000
      );
      return () => clearTimeout(timer);
    }
  }, [dispatch, pair, interval.granularity, isCrossPool]);

  useEffect(() => {
    dispatch(getCustomTradingPairs());
    const timer = setInterval(
      () => {
        dispatch(getCustomTradingPairs());
      },
      60000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  const onIntervalSelected = (newInterval) => {
    if (newInterval && newInterval.value !== interval.value) {
      currentCandles = undefined;
      history.push(`/pdex/markets-custom-token/${pair}/${newInterval.value}${reversedChart ? '?reversed=true' : ''}`);
    }
  };

  const onPairSelected = (newPair) => {
    if (newPair && newPair !== pair) {
      currentCandles = undefined;
      setPage(0);
      setLimit(10);
      history.push(`/pdex/markets-custom-token/${newPair}/${interval.value}${reversedChart ? '?reversed=true' : ''}`);
    }
  };

  const onChartReversed = () => {
    currentCandles = undefined;
    setReversedChart(!reversedChart);
    history.push(`/pdex/markets-custom-token/${pair}/${interval.value}${!reversedChart ? '?reversed=true' : ''}`);
  };

  return (
    <Page
      className={classes.root}
      title={`Incognito ${pair} pDEX Market`}
      ogTitle={`Incognito ${pair} pDEX Market`}
      description={`Incognito ${pair} pDEX Market. Detailed price charts, trades list, liquidity charts, all is available on incscan.io.`}
    >
      <Container maxWidth={false} className={classes.container}>
        <Header isCrossPool={isCrossPool} pair={pair} pairs={customPairs} onPairSelected={onPairSelected} intervals={intervals} interval={interval} onIntervalSelected={onIntervalSelected} />
        <Box mt={1}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xl={12}
              lg={12}
              xs={12}
            >
              <Box>
                <Tabs
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  value={currentTab}
                  variant="scrollable"
                  textColor="secondary"
                  className={classes.tabs}
                >
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.value}
                      label={tab.label}
                      value={tab.value}
                    />
                  ))}
                </Tabs>
              </Box>
              <Divider />
              <Box mt={2} mb={0}>
                {currentTab === 'chart' && <CandleChart isCrossPool={isCrossPool} pair={reversedChart ? inversePair(pair) : pair} interval={interval} candles={currentCandles} volumes={currentVolumes} onChartReversed={onChartReversed} />}
                {currentTab === 'liquidity' && (
                  <Grid container spacing={1}>
                    <Grid
                      item
                      lg={6}
                      xl={6}
                      xs={12}
                    >
                      <VolumeChart currency={base(pair)} volumes={currentLiquidity1} />
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      xl={6}
                      xs={12}
                    >
                      <VolumeChart currency={quote(pair)} volumes={currentLiquidity2} />
                    </Grid>
                  </Grid>
                ) }
              </Box>
            </Grid>
            <Grid
              item
              xl={12}
              lg={12}
              xs={12}
            >
              <Trades pair={pair} trades={tradesByPair.byId[pair]} count={tradesByPairCount} page={page} limit={limit} hideSmallTrades={hideSmallTrades} onPageChanged={onPageChanged} onLimitChanged={onLimitChanged} onHideSmallTradesChanged={onHideSmallTradesChanged} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default CustomMarketsView;
