import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createChart } from 'lightweight-charts';
import moment from 'moment';
import { useTheme } from '@material-ui/core';

const totalPremined = 5000000;

const add = (volumes1, volumes2) => {
  const result = {};
  for (let i = 0; i < volumes1.length; i++) {
    result[volumes1[i].time] = volumes1[i].value;
  }
  for (let i = 0; i < volumes2.length; i++) {
    result[volumes2[i].time] = (result[volumes2[i].time] ? result[volumes2[i].time] : 0) + volumes2[i].value;
  }
  return Object.keys(result).map((value) => ({ time: parseInt(value), value: result[value] }));
};

function Chart({
  volumes,
  volumes1,
  volumes2
}) {
  const theme = useTheme();
  const chartDiv = React.useRef(null);
  const chart = React.useRef(null);
  const volumesSeries = React.useRef(null);
  const volumesSeries1 = React.useRef(null);
  const volumesSeries2 = React.useRef(null);
  const volumesSeries3 = React.useRef(null);
  const volumesSeries4 = React.useRef(null);
  const options = {
    localization: {
      timeFormatter(businessDayOrTimestamp) {
        return moment(businessDayOrTimestamp * 1000).format('MMM Do hh a');
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
      chart.current = createChart(chartDiv.current, { ...options, width: chartDiv.current.clientWidth, height: 400 });
      volumesSeries.current = chart.current.addLineSeries({ color: '#b2bcc7', priceLineVisible: false, lineWidth: 1.5 });
      volumesSeries.current.applyOptions({
        priceFormat: {
          precision: 0,
          minMove: 1
        }
      });
      volumesSeries1.current = chart.current.addLineSeries({ color: theme.palette.text.primary, priceLineVisible: false, lineWidth: 1.5 });
      volumesSeries1.current.applyOptions({
        priceFormat: {
          precision: 0,
          minMove: 1
        }
      });
      volumesSeries2.current = chart.current.addLineSeries({ color: theme.palette.primary.main, priceLineVisible: false, lineWidth: 1.5 });
      volumesSeries2.current.applyOptions({
        priceFormat: {
          precision: 0,
          minMove: 1
        }
      });
      volumesSeries3.current = chart.current.addLineSeries({ color: '#9370DB', priceLineVisible: false, lineWidth: 1.5 });
      volumesSeries3.current.applyOptions({
        priceFormat: {
          precision: 0,
          minMove: 1
        }
      });
      volumesSeries4.current = chart.current.addLineSeries({ color: '#f44336', priceLineVisible: false, lineWidth: 1.5 });
      volumesSeries4.current.applyOptions({
        priceFormat: {
          precision: 0,
          minMove: 1
        }
      });
      volumesSeries.current.setData(volumes);
      volumesSeries1.current.setData(volumes1);
      volumesSeries2.current.setData(volumes.map((value) => ({ time: value.time, value: totalPremined })));
      volumesSeries3.current.setData(volumes2);
      volumesSeries4.current.setData(add(volumes1, volumes2));
    } else {
      volumesSeries.current.setData(volumes);
      volumesSeries1.current.setData(volumes1);
      volumesSeries2.current.setData(volumes.map((value) => ({ time: value.time, value: totalPremined })));
      volumesSeries3.current.setData(volumes2);
      volumesSeries4.current.setData(add(volumes1, volumes2));
    }
  });

  return (
    <div ref={chartDiv} style={{ position: 'relative' }} />
  );
}

Chart.propTypes = {
  volumes: PropTypes.array,
  volumes1: PropTypes.array,
  volumes2: PropTypes.array,
  volumes3: PropTypes.array
};

export default Chart;
