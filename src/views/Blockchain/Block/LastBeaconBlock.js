
import React from 'react';
import {
  useSelector
} from 'react-redux';
import moment from 'moment';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Typography,
  makeStyles, Hidden
} from '@material-ui/core';
import AttachControlCameraIcon from '@material-ui/icons/ControlCamera';
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

function LastBeaconBlock({ className, withTime, ...rest }) {
  const classes = useStyles();
  const { blockchain } = useSelector((state) => state.blockchain);

  if (!blockchain.beaconLastHeight) {
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
          Beacon Height
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
            {blockchain.beaconLastHeight}
          </Typography>
          <Hidden lgDown>
            { withTime
            && (
            <Label
              className={classes.label}
              color="primary"
            >
              {moment(blockchain.beaconTime).fromNow()}
            </Label>
            )}
          </Hidden>
        </Box>
      </Box>
      <Avatar className={classes.avatar}>
        <AttachControlCameraIcon />
      </Avatar>
    </Card>
  );
}

LastBeaconBlock.propTypes = {
  className: PropTypes.string,
  withTime: PropTypes.bool
};

LastBeaconBlock.defaultProps = {
  withTime: true
};

export default LastBeaconBlock;
