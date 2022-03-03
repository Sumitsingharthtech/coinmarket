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

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

function VolumeChart({
  className, currency, volumes, ...rest
}) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title={currency}
      />
      <Divider />
      <Box pb={1} pl={1} pr={1}>
        { volumes && <Chart volumes={volumes} /> }
      </Box>
    </Card>
  );
}

VolumeChart.propTypes = {
  className: PropTypes.string,
  currency: PropTypes.string,
  volumes: PropTypes.array
};

export default VolumeChart;
