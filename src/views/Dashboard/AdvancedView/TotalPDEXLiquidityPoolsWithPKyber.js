import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Typography,
  makeStyles,
  Tooltip
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

function TotalPDEXLiquidityPoolsWithPKyber({ className, ...rest }) {
  const classes = useStyles();
  const { totalLiquidityWithPKyber } = useSelector((state) => state.pDEXOverview);

  if (!totalLiquidityWithPKyber) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Tooltip title="pDEX + pKyber + pUniswap" placement="bottom-start">
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          Total Liquidity Pools
        </Typography>
      </Tooltip>
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
          {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(totalLiquidityWithPKyber)}
        </Typography>
      </Box>
    </Card>
  );
}

TotalPDEXLiquidityPoolsWithPKyber.propTypes = {
  className: PropTypes.string
};

export default TotalPDEXLiquidityPoolsWithPKyber;
