import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createChart } from 'lightweight-charts';
import moment from 'moment';
import { useTheme } from '@material-ui/core';

function Chart({
  candles,
  volumes,
  volumesWithoutCrossPool
}) {
  const theme = useTheme();
  const chartDiv = React.useRef(null);
  const chart = React.useRef(null);
  const candlestickSeries = React.useRef(null);
  const volumeSeries = React.useRef(null);
  const volumeSeries1 = React.useRef(null);
  const options = {
    localization: {
      timeFormatter(businessDayOrTimestamp) {
        return moment(businessDayOrTimestamp * 1000).format('MMM Do hh a');
      },
      priceFormatter(price) {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(price);
      }
    },
    layout: {
      backgroundColor: theme.chart.backgroundColor,
      textColor: theme.chart.textColor,
      fontSize: 12,
      fontFamily: 'Roboto',
    },
    handleScroll: {
      vertTouchDrag: false
    },
    grid: {
      vertLines: {
        color: theme.chart.lineColor,
        style: 2,
        visible: true,
      },
      horzLines: {
        color: theme.chart.lineColor,
        style: 2,
        visible: true,
      }
    }
  };
  const candlestickSeriesOptions = {
    upColor: '#4caf50',
    priceLineVisible: false,
    downColor: '#f44336',
    priceFormat: {
      precision: 6,
      minMove: 0.000001
    }
  };

  const volumeSeriesOptions = {
    color: theme.chart.volumeColor,
    priceLineVisible: false,
    lineWidth: 2,
    priceFormat: {
      type: 'volume',
    },
    overlay: true,
    scaleMargins: {
      top: 0.7,
      bottom: 0,
    },
  };

  const volumeSeriesOptions1 = {
    color: theme.chart.volumeColorLight,
    priceLineVisible: false,
    lineWidth: 2,
    priceFormat: {
      type: 'volume',
    },
    overlay: true,
    scaleMargins: {
      top: 0.7,
      bottom: 0,
    },
  };

  useEffect(() => {
    if (!chart.current) {
      chart.current = createChart(chartDiv.current, { ...options, width: chartDiv.current.clientWidth, height: 400 });
      candlestickSeries.current = chart.current.addCandlestickSeries(candlestickSeriesOptions);
      candlestickSeries.current.setData(candles);
      if (volumesWithoutCrossPool) {
        volumeSeries1.current = chart.current.addHistogramSeries(volumeSeriesOptions1);
        volumeSeries1.current.setData(volumesWithoutCrossPool);
      }
      volumeSeries.current = chart.current.addHistogramSeries(volumeSeriesOptions);
      volumeSeries.current.setData(volumes);
    } else {
      candlestickSeries.current.setData(candles);
      volumeSeries.current.setData(volumes);
      if (volumeSeries1.current && volumesWithoutCrossPool) {
        volumeSeries1.current.setData(volumesWithoutCrossPool);
      }
    }
  });

  return (
    <div ref={chartDiv} style={{ position: 'relative' }} />
  );
}

Chart.propTypes = {
  candles: PropTypes.array,
  volumes: PropTypes.array,
  volumesWithoutCrossPool: PropTypes.array,
};

export default Chart;
