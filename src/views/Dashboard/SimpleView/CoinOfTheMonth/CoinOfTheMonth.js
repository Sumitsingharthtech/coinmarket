import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useDispatch, useSelector } from 'react-redux';
import Chart from './Chart';
import CryptoIcon from '../../../../components/CryptoIcon';
import { getCoinSummary } from '../../../../actions/shieldedCoinOverviewActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  current: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  },
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  },
  chart: {
    height: '100%',
    padding: '10px'
  }
}));

const priceList = (summary) => _.map(summary.lastUSDPrices, (price) => price.value.toFixed(4));

const labelsList = (summary) => _.map(summary.lastUSDPrices, (price) => moment(price.time * 1000).format('ddd'));

function CoinOfTheMonth({
  className, coin, coinName, ...rest
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { coinSummary } = useSelector((state) => state.shieldedCoinOverview);

  useEffect(() => {
    dispatch(getCoinSummary(coin));
    const timer = setInterval(
      () => dispatch(getCoinSummary(coin)),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch, coin]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        classes={{ action: classes.current }}
        subheader={(
          <span>
            <CryptoIcon currency={coin} />
            {' '}
            {`${coinName}`}
            {' '}
            -
            {' '}
            {`${coin}`}
          </span>
        )}
        subheaderTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
        title="Coin of the month"
        titleTypographyProps={{ color: 'textPrimary' }}
      />
      { coinSummary && (
      <Chart
        className={classes.chart}
        data={priceList(coinSummary)}
        labels={labelsList(coinSummary)}
        coin={coin}
      />
      ) }
      { coinSummary && (
      <List>
        <ListItem
          classes={{ divider: classes.itemDivider }}
          divider
          key={1}
        >
          <ListItemText
            primary="Last price"
            primaryTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
          />
          <Typography color="inherit" variant='body2'>
            $
            {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(coinSummary.lastUSDPrice)}
          </Typography>
        </ListItem>
        <ListItem
          classes={{ divider: classes.itemDivider }}
          divider
          key={2}
        >
          <ListItemText
            primary="Coins in network"
            primaryTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
          />
          <Typography color="inherit" variant='body2'>
            <CryptoIcon currency={coin} />
            {' '}
            {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(coinSummary.totalInNetwork)}
          </Typography>
        </ListItem>
        <ListItem
          classes={{ divider: classes.itemDivider }}
          divider
          key={3}
        >
          <ListItemText
            primary="Coins in pDEX"
            primaryTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
          />
          <Typography color="inherit" variant='body2'>
            <CryptoIcon currency={coin} />
            {' '}
            {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(coinSummary.totalInPDex)}
          </Typography>
        </ListItem>
      </List>
      ) }
      <Box
        p={2}
        display="flex"
        justifyContent="center"
      >
        <Box flexGrow={1} />
        <Button
          component={RouterLink}
          size="small"
          to={`/shielded-coins/evolution/${coin}`}
        >
          See more
          <NavigateNextIcon className={classes.navigateNextIcon} />
        </Button>
      </Box>
    </Card>
  );
}

CoinOfTheMonth.propTypes = {
  className: PropTypes.string,
  coin: PropTypes.string,
  coinName: PropTypes.string
};

export default CoinOfTheMonth;
