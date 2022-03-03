import React from 'react';
import {
  useSelector
} from 'react-redux';
import moment from 'moment';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  },
  time: {
    paddingTop: 8
  }
}));

function LastBeaconTime({ className, ...rest }) {
  const classes = useStyles();
  const { blockchain } = useSelector((state) => state.blockchain);

  if (!blockchain.beaconLastHeight) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          Beacon Time (UTC)
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          className={classes.time}
        >
          <Typography
            variant="h5"
            color="textPrimary"
          >
            {moment(blockchain.beaconTime).format('YYYY/MM/DD hh:mm A')}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

LastBeaconTime.propTypes = {
  className: PropTypes.string
};

export default LastBeaconTime;
