import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Typography,
  makeStyles
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  progress: {
    margin: theme.spacing(0, 1),
    flexGrow: 1
  }
}));

function Total24hTradingVolume({ className, ...rest }) {
  const classes = useStyles();
  const { total24hVolume } = useSelector((state) => state.pDEXOverview);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Typography
        component="h3"
        gutterBottom
        variant="overline"
        color="textSecondary"
      >
        Trading Volume since
        {' '}
        {moment().utc().startOf('day').local()
          .format('ha')}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography
          variant="h3"
          color="textPrimary"
        >
          $
          {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(total24hVolume)}
        </Typography>
      </Box>
    </Card>
  );
}

Total24hTradingVolume.propTypes = {
  className: PropTypes.string
};

export default Total24hTradingVolume;
