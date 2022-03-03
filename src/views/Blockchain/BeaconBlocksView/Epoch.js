import React from 'react';
import {
  useSelector
} from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Typography,
  makeStyles, Hidden
} from '@material-ui/core';
import AttachAccessTimeIcon from '@material-ui/icons/AccessTime';
import Label from 'src/components/Label';

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

function Epoch({ className, ...rest }) {
  const classes = useStyles();
  const { blockchain } = useSelector((state) => state.blockchain);

  if (!blockchain.epoch) {
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
          Epoch
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
            {blockchain.epoch}
          </Typography>
          <Hidden lgDown>
            <Label
              className={classes.label}
              color="primary"
            >
              {blockchain.remainingBlockEpoch}
              /
              {blockchain.epochBlock}
            </Label>
          </Hidden>
        </Box>
      </Box>
      <Avatar className={classes.avatar}>
        <AttachAccessTimeIcon />
      </Avatar>
    </Card>
  );
}

Epoch.propTypes = {
  className: PropTypes.string
};

export default Epoch;
