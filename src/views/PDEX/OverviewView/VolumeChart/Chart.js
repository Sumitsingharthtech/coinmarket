import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createChart } from 'lightweight-charts';
import moment from 'moment';
import { useTheme } from '@material-ui/core';

function Chart({
  volumes,
  volumes1,
  watermark
}) {
  const theme = useTheme();
  const chartDiv = React.useRef(null);
  const chart = React.useRef(null);
  const volumesSeries = React.useRef(null);
  const volumesSeries1 = React.useRef(null);
  const options = {
    localization: {
      timeFormatter(businessDayOrTimestamp) {
        return moment(businessDayOrTimestamp * 1000).format('MMM Do');
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
    },
    watermark: {
      color: theme.palette.text.secondary,
      visible: true,
      text: watermark,
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif;',
      fontSize: 16,
      horzAlign: 'left',
      vertAlign: 'top',
    }
  };

  useEffect(() => {
    if (!chart.current) {
      chart.current = createChart(chartDiv.current, { ...options, width: chartDiv.current.clientWidth, height: 300 });
      volumesSeries.current = chart.current.addLineSeries({ color: theme.palette.primary.main, priceLineVisible: false, lineWidth: 1.5 });
      volumesSeries.current.applyOptions({
        priceFormat: {
          precision: 0,
          minMove: 1
        }
      });
      volumesSeries.current.setData(volumes);
      if (volumes1) {
        volumesSeries1.current = chart.current.addLineSeries({ color: theme.chart.lightGraphColor, priceLineVisible: false, lineWidth: 1.5 });
        volumesSeries1.current.applyOptions({
          priceFormat: {
            precision: 0,
            minMove: 1
          }
        });
        volumesSeries1.current.setData(volumes1);
      }
    } else {
      volumesSeries.current.setData(volumes);
      if (volumes1) {
        volumesSeries1.current.setData(volumes1);
      }
    }
  });

  return (
    <div ref={chartDiv} style={{ position: 'relative' }} />
  );
}

Chart.propTypes = {
  volumes: PropTypes.array,
  volumes1: PropTypes.array,
  watermark: PropTypes.string
};

export default Chart;
