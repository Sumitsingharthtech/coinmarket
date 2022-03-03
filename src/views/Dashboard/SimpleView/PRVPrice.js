import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Typography,
  makeStyles
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.secondary.main,
    height: 48,
    width: 48
  }
}));

function PRVPrice({ className, ...rest }) {
  const classes = useStyles();
  const { market } = useSelector((state) => state.market);

  if (!market.lastPRVPrice) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline"
        >
          PRV Price
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            color="inherit"
            variant="h3"
          >
            $
            {market.lastPRVPrice}
          </Typography>
        </Box>
      </Box>
      <Avatar
        className={classes.avatar}
        color="inherit"
      >
        <AttachMoneyIcon />
      </Avatar>
    </Card>
  );
}

PRVPrice.propTypes = {
  className: PropTypes.string
};

export default PRVPrice;
