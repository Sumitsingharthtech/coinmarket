import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createChart } from 'lightweight-charts';
import moment from 'moment';
import { fade, useTheme } from '@material-ui/core';

const fixedValidatorsCount = 22 * 8;

function Chart({
  volumes,
  from,
  to
}) {
  const theme = useTheme();
  const chartDiv = React.useRef(null);
  const chart = React.useRef(null);
  const volumesSeries = React.useRef(null);
  const volumesSeries1 = React.useRef(null);
  const volumesSeries2 = React.useRef(null);
  const options = {
    localization: {
      timeFormatter(businessDayOrTimestamp) {
        return moment(businessDayOrTimestamp * 1000)
          .format('MMM Do hh a');
      },
      priceFormatter(price) {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price);
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

  useEffect(() => {
    if (!chart.current) {
      chart.current = createChart(chartDiv.current, {
        ...options,
        width: chartDiv.current.clientWidth,
        height: 400
      });
      volumesSeries.current = chart.current.addLineSeries({
        color: '#b2bcc7',
        priceLineVisible: false,
        lineWidth: 1.5
      });
      volumesSeries.current.applyOptions({
        priceFormat: {
          precision: 0,
          minMove: 1
        }
      });
      volumesSeries1.current = chart.current.addLineSeries({
        color: fade(theme.palette.warning.main, 0.9),
        priceLineVisible: false,
        lineWidth: 1.5
      });
      volumesSeries1.current.applyOptions({
        priceFormat: {
          precision: 0,
          minMove: 1
        }
      });
      volumesSeries2.current = chart.current.addLineSeries({
        color: theme.palette.primary.main,
        priceLineVisible: false,
        lineWidth: 1.5
      });
      volumesSeries2.current.applyOptions({
        priceFormat: {
          precision: 0,
          minMove: 1
        }
      });
      if (volumes) {
        volumesSeries.current.setData(volumes.map((item) => ({
          value: item.value + fixedValidatorsCount,
          time: item.time
        })));
        volumesSeries1.current.setData(volumes.map((item) => ({
          value: item.value1,
          time: item.time
        })));
        volumesSeries2.current.setData(volumes.map((item) => ({
          value: fixedValidatorsCount,
          time: item.time
        })));
        chart.current.timeScale().fitContent();
      }
    } else {
      volumesSeries.current.setData(volumes.map((item) => ({
        value: item.value + fixedValidatorsCount,
        time: item.time
      })));
      volumesSeries1.current.setData(volumes.map((item) => ({
        value: item.value1,
        time: item.time
      })));
      volumesSeries2.current.setData(volumes.map((item) => ({
        value: fixedValidatorsCount,
        time: item.time
      })));
      chart.current.timeScale().fitContent();
    }
  });

  return (
    <div ref={chartDiv} style={{ position: 'relative' }} />
  );
}

Chart.propTypes = {
  volumes: PropTypes.array,
  from: PropTypes.number,
  to: PropTypes.number
};

export default Chart;
