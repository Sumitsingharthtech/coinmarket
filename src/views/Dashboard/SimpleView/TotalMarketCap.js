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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  progress: {
    margin: theme.spacing(0, 1),
    flexGrow: 1
  }
}));

function TotalMarketCap({ className, ...rest }) {
  const classes = useStyles();
  const { market } = useSelector((state) => state.market);

  if (!market.totalMarketCap) {
    return null;
  }

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
        Market Cap
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
          {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(market.totalMarketCap)}
        </Typography>
      </Box>
    </Card>
  );
}

TotalMarketCap.propTypes = {
  className: PropTypes.string
};

export default TotalMarketCap;
