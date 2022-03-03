import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  makeStyles
} from '@material-ui/core';
import Chart from './Chart';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

function VolumeChart({
  className, token, evolution, ...rest
}) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box pb={1} pl={1} pr={1}>
        { evolution && <Chart volumes={evolution} /> }
      </Box>
    </Card>
  );
}

VolumeChart.propTypes = {
  className: PropTypes.string,
  token: PropTypes.string,
  evolution: PropTypes.array
};

export default VolumeChart;
