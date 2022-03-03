import React, {
  useEffect
} from 'react';
import {
  useDispatch
} from 'react-redux';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import LastTransactions from '../SimpleView/LastTransactions';
import LatestTransactionsCount from '../SimpleView/LatestTransactionsCount';
import PRVPrice from '../SimpleView/PRVPrice';
import TotalMarketCap from '../SimpleView/TotalMarketCap';
import LastBeaconBlock from '../../Blockchain/Block/LastBeaconBlock';
import { getMarket } from '../../../actions/marketActions';
import LastTrades from '../SimpleView/LastTrades';
import { getTransactionsStats } from '../../../actions/globalStatsActions';
import { getTotalShielded } from '../../../actions/shieldedCoinsActions';
import { getTotalStakingNodes } from '../../../actions/networkActions';
import {
  getPDEXTotalLiquidity,
  getPDEXTotalVolume,
  getPDEXTotal24hVolume,
  getPDEXTotalLiquidityWithPKyber
} from '../../../actions/pDEXOverviewActions';
import LastShieldedCoins from '../SimpleView/LastShieldedCoins';
import TotalShielded from './TotalShielded';
import TotalTransactions from './TotalTransactions';
import TotalValidators from './TotalValidators';
import TotalTradingVolume from './TotalTradingVolume';
import TotalPDEXLiquidityPools from './TotalPDEXLiquidityPools';
import Total24hTradingVolume from './Total24hTradingVolume';
import TotalPDEXLiquidityPoolsWithPKyber from './TotalPDEXLiquidityPoolsWithPKyber';
import PairOfTheMonth from '../SimpleView/PairOfTheMonth/PairOfTheMonth';
import { COIN_OF_THE_MONTH, PAIR_OF_THE_MONTH } from '../../../constants';
import CoinOfTheMonth from '../SimpleView/CoinOfTheMonth/CoinOfTheMonth';

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

function DashboardView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { CURRENT: pairOfTheMonth, CUSTOM: pairOfTheMonthIsCustom, CUSTOM_TOKEN_ID_1: pairOfTheMonthCustomTokenId1, CUSTOM_TOKEN_ID_2: pairOfTheMonthCustomTokenId2 } = PAIR_OF_THE_MONTH;
  const { CURRENT: coinOfTheMonth, NAME: coinOfTheMonthName } = COIN_OF_THE_MONTH;

  useEffect(() => {
    dispatch(getTransactionsStats());
    const timer = setInterval(
      () => dispatch(getTransactionsStats()),
      30000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMarket());
    const timer = setInterval(
      () => dispatch(getMarket()),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotalShielded());
    const timer = setInterval(
      () => dispatch(getTotalShielded()),
      60000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotalStakingNodes());
    const timer = setInterval(
      () => dispatch(getTotalStakingNodes()),
      60000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPDEXTotalVolume());
    const timer = setInterval(
      () => dispatch(getPDEXTotalVolume()),
      60000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPDEXTotal24hVolume());
    const timer = setInterval(
      () => dispatch(getPDEXTotal24hVolume()),
      60000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPDEXTotalLiquidity());
    dispatch(getPDEXTotalLiquidityWithPKyber());
    const timer = setInterval(
      () => dispatch(getPDEXTotalLiquidityWithPKyber()),
      60000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <Page
      className={classes.root}
      title="Incognito Network Explorer"
      ogTitle="Incognito Network Explorer"
      description="Explore the whole Incognito Network on incscan.io. Blocks, Transactions, DEX trades, volumes or liquidity, Shielded coins, Network validators and much more."
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
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
            <LastBeaconBlock />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <LatestTransactionsCount />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalMarketCap />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <PRVPrice />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalShielded />
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
            <TotalPDEXLiquidityPoolsWithPKyber />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalTradingVolume />
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xs={12}
          >
            <TotalValidators />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalPDEXLiquidityPools />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <Total24hTradingVolume />
          </Grid>
          { coinOfTheMonth !== '' && (
          <Grid
            item
            lg={3}
            xs={12}
          >
            <CoinOfTheMonth coin={coinOfTheMonth} coinName={coinOfTheMonthName} />
          </Grid>
          ) }
          { pairOfTheMonth !== ''
          && (
          <Grid
            item
            lg={9}
            xs={12}
          >
            <PairOfTheMonth pair={pairOfTheMonth} custom={pairOfTheMonthIsCustom} customTokenId1={pairOfTheMonthCustomTokenId1} customTokenId2={pairOfTheMonthCustomTokenId2} />
          </Grid>
          ) }
          <Grid
            item
            lg={12}
            xl={6}
            md={12}
            xs={12}
          >
            <LastShieldedCoins />
          </Grid>
          <Grid
            item
            lg={12}
            xl={6}
            xs={12}
          >
            <LastTrades fullVersion={false} />
          </Grid>
          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <LastTransactions />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardView;
