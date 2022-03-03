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

function Header({ className, token, ...rest }) {
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
          Custom Token
          {' '}
          {token.name}
          {/* <VoteButton type="coin" address={VOTE.COIN_ADDRESS} value={token.symbol} count={1} /> */}
        </Typography>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  token: PropTypes.object
};

export default Header;
