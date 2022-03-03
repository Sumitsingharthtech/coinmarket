import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import Chart from './Chart';

const useStyles = makeStyles((theme) => ({
  root: {},
  chart: {
    height: 400
  },
  totalCount: {
    backgroundColor: 'rgba(178, 188, 199, 0.9)',
    color: '#282C34',
    padding: '3px'
  },
  totalFixedCount: {
    backgroundColor: theme.palette.primary.main,
    color: theme.lightColor,
    padding: '3px'
  },
  totalInProgress: {
    backgroundColor: theme.palette.text.primary,
    color: theme.lightColor,
    padding: '3px'
  },
  totalLockedInPDex: {
    backgroundColor: '#9370DB',
    color: '#282C34',
    padding: '3px'
  },
  totalLocked: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '3px'
  },
  legend: {
    textAlign: 'center',
    paddingTop: '12px',
    paddingBottom: '10px',
    fontFamily: 'Roboto',
    fontSize: '12px'
  }
}));

function VolumeChart({
  className, volumes, volumes1, volumes2, ...rest
}) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="PRV Supply"
      />
      <Divider />
      <Box pb={1} pl={1} pr={1}>
        { volumes && volumes1 && volumes2 && <Chart volumes={volumes} volumes1={volumes1} volumes2={volumes2} /> }
        <div className={classes.legend}>
          <span className={classes.totalCount}>circulating supply</span>
&nbsp;&nbsp;&nbsp;
          <span className={classes.totalFixedCount}>premined</span>
&nbsp;&nbsp;&nbsp;
          <span className={classes.totalInProgress}>total staked</span>
&nbsp;&nbsp;&nbsp;
          <span className={classes.totalLockedInPDex}>total locked in pDEX</span>
&nbsp;&nbsp;&nbsp;
          <span className={classes.totalLocked}>total locked</span>
        </div>
      </Box>
    </Card>
  );
}

VolumeChart.propTypes = {
  className: PropTypes.string,
  volumes: PropTypes.array,
  volumes1: PropTypes.array,
  volumes2: PropTypes.array
};

export default VolumeChart;
