import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createChart } from 'lightweight-charts';
import moment from 'moment';
import { useTheme } from '@material-ui/core';

function Chart2({
  prices
}) {
  const theme = useTheme();
  const chartDiv = React.useRef(null);
  const chart = React.useRef(null);
  const volumesSeries = React.useRef(null);
  const options = {
    localization: {
      timeFormatter(businessDayOrTimestamp) {
        return moment(businessDayOrTimestamp * 1000).format('MMM Do');
      },
      priceFormatter(price) {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(price);
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
      chart.current = createChart(chartDiv.current, { ...options, width: chartDiv.current.clientWidth, height: 300 });
      volumesSeries.current = chart.current.addLineSeries({ color: theme.palette.primary.main, priceLineVisible: false, lineWidth: 1.5 });
      volumesSeries.current.applyOptions({
        priceFormat: {
          precision: 4,
          minMove: 0.0001
        }
      });
      volumesSeries.current.setData(prices);
    } else {
      volumesSeries.current.setData(prices);
    }
  });

  return (
    <div ref={chartDiv} style={{ position: 'relative' }} />
  );
}

Chart2.propTypes = {
  prices: PropTypes.array
};

export default Chart2;
