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
import { getPairSummary } from '../../../../actions/pDEXOverviewActions';
import CryptoIcon from '../../../../components/CryptoIcon';

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

const priceList = (summary) => _.map(summary.lastPrices, (price) => price.close.toFixed(4));

const labelsList = (summary) => _.map(summary.lastPrices, (price) => moment(price.time * 1000).format('ddd'));

function PairOfTheMonth({
  className, pair, custom, customTokenId1, customTokenId2, ...rest
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const base = pair.split('-')[0];
  const quote = pair.split('-')[1];
  const { pairSummary } = useSelector((state) => state.pDEXOverview);

  useEffect(() => {
    dispatch(getPairSummary(pair, custom, customTokenId1, customTokenId2));
    const timer = setInterval(
      () => dispatch(getPairSummary(pair, custom, customTokenId1, customTokenId2)),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch, custom, pair, customTokenId1, customTokenId2]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        classes={{ action: classes.current }}
        subheader={(
          <span>
            { custom && <CryptoIcon currency={customTokenId1} /> }
            { !custom && <CryptoIcon currency={base} /> }
            {' '}
            {`${pair}`}
            {' '}
            { custom && <CryptoIcon currency={customTokenId2} /> }
            { !custom && <CryptoIcon currency={quote} /> }
          </span>
        )}
        subheaderTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
        title="Pair of the month"
        titleTypographyProps={{ color: 'textPrimary' }}
      />
      { pairSummary && (
      <Chart
        className={classes.chart}
        data={priceList(pairSummary)}
        labels={labelsList(pairSummary)}
        base={base}
        quote={quote}
      />
      ) }
      { pairSummary && (
      <List>
        <ListItem
          classes={{ divider: classes.itemDivider }}
          divider
          key={1}
        >
          <ListItemText
            primary={`Total ${base} in pool`}
            primaryTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
          />
          <Typography color="inherit" variant='body2'>
            { custom && <CryptoIcon currency={customTokenId1} /> }
            { !custom && <CryptoIcon currency={base} /> }
            {' '}
            {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(pairSummary.baseLiquidity)}
          </Typography>
        </ListItem>
        <ListItem
          classes={{ divider: classes.itemDivider }}
          divider
          key={2}
        >
          <ListItemText
            primary={`Total ${quote} in pool`}
            primaryTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
          />
          <Typography color="inherit" variant='body2'>
            { custom && <CryptoIcon currency={customTokenId2} /> }
            { !custom && <CryptoIcon currency={quote} /> }
            {' '}
            {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(pairSummary.quoteLiquidity)}
          </Typography>
        </ListItem>
        <ListItem
          classes={{ divider: classes.itemDivider }}
          divider
          key={3}
        >
          <ListItemText
            primary="Total trades"
            primaryTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
          />
          <Typography color="inherit" variant='body2'>
            {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(pairSummary.tradesCount)}
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
          to={custom ? `/pdex/markets-custom-token/${pair}` : `/pdex/markets/${pair}`}
        >
          See more
          <NavigateNextIcon className={classes.navigateNextIcon} />
        </Button>
      </Box>
    </Card>
  );
}

PairOfTheMonth.propTypes = {
  className: PropTypes.string,
  pair: PropTypes.string,
  custom: PropTypes.bool,
  customTokenId1: PropTypes.string,
  customTokenId2: PropTypes.string
};

export default PairOfTheMonth;
