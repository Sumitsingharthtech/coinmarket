import React from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  makeStyles, Typography
} from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Pies({
  className, topPairsByLiquidity, topPairsByVolume, totalVolume, totalLiquidity, ...rest
}) {
  const classes = useStyles();
  const perLiquidityData = {
    labels: _.map(topPairsByLiquidity, (i) => i.pair),
    datasets: [{
      data: _.map(topPairsByLiquidity, (i) => (i.liquidity / totalLiquidity * 100).toFixed(2)),
      backgroundColor: [
        '#003f5c',
        '#2f4b7c',
        '#665191',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#ff7c43',
        '#ffa600',
        '#ffd27f',
        '#ffe8bf'
      ],
      hoverBackgroundColor: [
        '#003f5c',
        '#2f4b7c',
        '#665191',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#ff7c43',
        '#ffa600',
        '#ffd27f',
        '#ffe8bf'
      ],
      borderWidth: 1,
      borderColor: '#adb0bb'
    }]
  };
  const perVolumeData = {
    labels: _.map(topPairsByVolume, (i) => i.pair),
    datasets: [{
      data: _.map(topPairsByVolume, (i) => (i.volume / totalVolume * 100).toFixed(2)),
      backgroundColor: [
        '#003f5c',
        '#2f4b7c',
        '#665191',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#ff7c43',
        '#ffa600',
        '#ffd27f',
        '#ffe8bf'
      ],
      hoverBackgroundColor: [
        '#003f5c',
        '#2f4b7c',
        '#665191',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#ff7c43',
        '#ffa600',
        '#ffd27f',
        '#ffe8bf'
      ],
      borderWidth: 1,
      borderColor: '#adb0bb'
    }]
  };

  const legendOpts = {
    display: true,
    position: 'bottom',
    fullWidth: true,
    reverse: false,
    labels: {
      fontColor: '#adb0bb',
      fontSize: 11,
      boxWidth: 15,
      padding: 5
    }
  };

  const chartOptions = {
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          let label = data.labels[tooltipItem.index] || '';
          if (label) {
            label += ': ';
          }
          label += `${data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]}%`;
          return label;
        }
      }
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <Box m={2}>
          <Grid container>
            <Grid item lg={6} sm={12} xs={12}>
              <Typography
                align="center"
                component="h2"
                gutterBottom
                variant="overline"
                color="textSecondary"
              >
                By Liquidity
              </Typography>
              <Pie data={perLiquidityData} legend={legendOpts} options={chartOptions} />
            </Grid>
            <Grid item lg={6} sm={12} xs={12}>
              <Typography
                align="center"
                component="h2"
                gutterBottom
                variant="overline"
                color="textSecondary"
              >
                By Volume
              </Typography>
              <Pie data={perVolumeData} legend={legendOpts} options={chartOptions} />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

Pies.propTypes = {
  className: PropTypes.string,
  topPairsByLiquidity: PropTypes.array,
  totalLiquidity: PropTypes.number,
  topPairsByVolume: PropTypes.array,
  totalVolume: PropTypes.number
};

export default Pies;
