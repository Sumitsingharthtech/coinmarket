import React from 'react';
import {
  useSelector
} from 'react-redux';
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
  }
}));

function LatestTransactionsCount({ className, ...rest }) {
  const classes = useStyles();
  const { stats } = useSelector((state) => state.stat);

  if (!stats.lastHourBlockCount) {
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
          Last 1h blocks count
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
            {stats.lastHourBlockCount}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

LatestTransactionsCount.propTypes = {
  className: PropTypes.string
};

export default LatestTransactionsCount;
