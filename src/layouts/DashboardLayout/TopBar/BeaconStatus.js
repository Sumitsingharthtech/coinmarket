import React from 'react';
import {
  useSelector
} from 'react-redux';
import PropTypes from 'prop-types';
import {
  makeStyles
} from '@material-ui/core';
import AttachControlCameraIcon from '@material-ui/icons/ControlCamera';
import AttachAccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles((theme) => ({
  status: {
    color: theme.topBarColor,
    fontFamily: 'Roboto',
    fontSize: 15,
    marginRight: 10
  },
  epochText: {
    fontSize: 13
  },
  line: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  epochLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2
  }
}));

function LastBeaconTime({ className, ...rest }) {
  const classes = useStyles();
  const { blockchain } = useSelector((state) => state.blockchain);

  if (!blockchain.beaconLastHeight) {
    return null;
  }

  return (
    <div className={classes.status}>
      <div className={classes.line}>
        <AttachControlCameraIcon fontSize="inherit" />
        <span>
          {blockchain.beaconLastHeight}
        </span>
      </div>
      <div className={classes.epochLine}>
        <AttachAccessTimeIcon fontSize="inherit" />
        <span className={classes.epochText}>
          {blockchain.remainingBlockEpoch}
          /
          {blockchain.epochBlock}
        </span>
      </div>
    </div>
  );
}

LastBeaconTime.propTypes = {
  className: PropTypes.string
};

export default LastBeaconTime;
