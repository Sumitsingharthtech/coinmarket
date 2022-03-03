import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider, fade,
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
    backgroundColor: fade(theme.palette.warning.main, 0.9),
    color: 'white',
    padding: '3px'
  },
  legend: {
    textAlign: 'center',
    paddingTop: '12px',
    paddingBottom: '10px',
    fontFamily: 'Roboto',
    fontSize: '13px'
  }
}));

function VolumeChart({
  className, evolution, from, to, ...rest
}) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Validators Evolution"
      />
      <Divider />
      <Box pb={1} pl={1} pr={1}>
        { evolution && <Chart volumes={evolution} from={from} to={to} /> }
        <div className={classes.legend}>
          <span className={classes.totalCount}>active validators</span>
&nbsp;&nbsp;&nbsp;
          <span className={classes.totalFixedCount}>fixed validators</span>
&nbsp;&nbsp;&nbsp;
          <span className={classes.totalInProgress}>unstaking in progress</span>
        </div>
      </Box>
    </Card>
  );
}

VolumeChart.propTypes = {
  className: PropTypes.string,
  evolution: PropTypes.array,
  from: PropTypes.number,
  to: PropTypes.number
};

export default VolumeChart;
