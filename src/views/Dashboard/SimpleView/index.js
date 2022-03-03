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
import Banner from '../../../assets/css/banner.jpg';
import Page from 'src/components/Page';
import Header from './Header';
import LastTransactions from './LastTransactions';
import PRVPrice from './PRVPrice';
import TotalMarketCap from './TotalMarketCap';
import LastBeaconBlock from '../../Blockchain/Block/LastBeaconBlock';
import { getMarket } from '../../../actions/marketActions';
import LastTrades from './LastTrades';
import { getTransactionsStats } from '../../../actions/globalStatsActions';
import LastShieldedCoins from './LastShieldedCoins';
import PairOfTheMonth from './PairOfTheMonth/PairOfTheMonth';
import CoinOfTheMonth from './CoinOfTheMonth/CoinOfTheMonth';
import { COIN_OF_THE_MONTH, PAIR_OF_THE_MONTH } from '../../../constants';
import LatestTransactionsCount from './LatestTransactionsCount';


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
         <img src={Banner} alt="incscan" style={{height:"90px", width:"728px", marginLeft:"7rem"}} />
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
