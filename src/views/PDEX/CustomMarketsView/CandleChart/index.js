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
import Button from '@material-ui/core/Button';
import Chart from './Chart';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

function CandleChart({
  className,
  isCrossPool,
  pair,
  interval,
  candles,
  volumes,
  volumesWithoutCrossPool,
  onChartReversed,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title={`${pair} ${interval.value} Chart`}
        action={<Button size="small" onClick={onChartReversed}>Reverse chart</Button>}
      />
      <Divider />
      <Box pb={1} pl={1} pr={1}>
        {candles && volumes && <Chart candles={candles} volumes={volumes} volumesWithoutCrossPool={volumesWithoutCrossPool} />}
      </Box>
    </Card>
  );
}

CandleChart.propTypes = {
  className: PropTypes.string,
  isCrossPool: PropTypes.bool,
  pair: PropTypes.string,
  interval: PropTypes.object,
  candles: PropTypes.array,
  volumes: PropTypes.array,
  volumesWithoutCrossPool: PropTypes.array,
  onChartReversed: PropTypes.func
};

export default CandleChart;
