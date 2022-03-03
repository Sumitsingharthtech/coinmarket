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
import ShieldedCoinsHistoryList from '../../ShieldedCoins/HistoryView/ShieldedCoinsHistoryList';
import { getLastShieldedCoinsHistory } from '../../../actions/shieldedCoinsActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  }
}));

function LastShieldedCoins({ className, fullVersion, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { lastShieldedCoinsHistory } = useSelector((state) => state.shieldedCoin);

  useEffect(() => {
    dispatch(getLastShieldedCoinsHistory());
    const timer = setInterval(
      () => dispatch(getLastShieldedCoinsHistory()),
      15000
    );
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (lastShieldedCoinsHistory.length === 0) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Latest Shielded Coins"
      />
      <Divider />
      <Box>
        <ShieldedCoinsHistoryList fullVersion={false} historyItems={lastShieldedCoinsHistory} />
      </Box>
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          component={RouterLink}
          size="small"
          to="/shielded-coins/history"
        >
          See all
          <NavigateNextIcon className={classes.navigateNextIcon} />
        </Button>
      </Box>
    </Card>
  );
}

LastShieldedCoins.propTypes = {
  className: PropTypes.string,
  fullVersion: PropTypes.bool
};

LastShieldedCoins.defaultProps = {
  fullVersion: true
};

export default LastShieldedCoins;
