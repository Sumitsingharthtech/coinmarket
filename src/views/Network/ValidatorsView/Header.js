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
  },
  pairButton: {
    textTransform: 'none'
  }
}));

function Header({
  className, token, tokens, onTokenSelected, ...rest
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
          Incognito Validators Charts
        </Typography>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
