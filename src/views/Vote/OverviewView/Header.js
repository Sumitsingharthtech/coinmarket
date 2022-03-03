import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({
  className, nextVoteMonth, nextVoteYear, nextVoteRemainingDays, nextVoteRemainingHours, nextVoteRemainingMinutes, ...rest
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          Incscan votes for
          {' '}
          {nextVoteMonth}
          {' '}
          {nextVoteYear}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Remaining time to vote: {nextVoteRemainingDays} days {nextVoteRemainingHours} hours and {nextVoteRemainingMinutes} minutes
        </Typography>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  nextVoteMonth: PropTypes.string,
  nextVoteYear: PropTypes.string,
  nextVoteRemainingDays: PropTypes.number,
  nextVoteRemainingHours: PropTypes.number,
  nextVoteRemainingMinutes: PropTypes.number
};

export default Header;
