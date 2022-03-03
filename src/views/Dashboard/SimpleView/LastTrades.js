import React, {
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Button,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { getLastTrades } from '../../../actions/tradesActions';
import TradesList from '../../PDEX/Trade/TradesList';

const useStyles = makeStyles((theme) => ({
  root: {},
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  }
}));

function LastTrades({ className, fullVersion, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { lastTrades } = useSelector((state) => state.trade);

  useEffect(() => {
    dispatch(getLastTrades());
    const timer = setInterval(
      () => dispatch(getLastTrades()),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (lastTrades.length === 0) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title={fullVersion ? 'Latest Trades' : 'Latest pDEX Trades'}
      />
      <Divider />
      <Box>
        <TradesList fullVersion={fullVersion} trades={lastTrades} />
      </Box>
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          component={RouterLink}
          size="small"
          to="/pdex/trades"
        >
          See all
          <NavigateNextIcon className={classes.navigateNextIcon} />
        </Button>
      </Box>
    </Card>
  );
}

LastTrades.propTypes = {
  className: PropTypes.string,
  fullVersion: PropTypes.bool
};

LastTrades.defaultProps = {
  fullVersion: true
};

export default LastTrades;
