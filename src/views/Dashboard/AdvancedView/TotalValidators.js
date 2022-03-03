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

function TotalValidators({ className, ...rest }) {
  const classes = useStyles();
  const { totalStakingNodes } = useSelector((state) => state.network);

  if (!totalStakingNodes) {
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
        Active Validators in the network
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
          {totalStakingNodes}
        </Typography>
      </Box>
    </Card>
  );
}

TotalValidators.propTypes = {
  className: PropTypes.string
};

export default TotalValidators;
