import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Grid,
  Typography,
  Tooltip,
  makeStyles, withStyles
} from '@material-ui/core';
import Label from 'src/components/Label';
import { HelpCircle } from 'react-feather';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    maxWidth: 260,
    fontSize: theme.typography.pxToRem(13),
    border: `1px solid ${theme.palette.border}`,
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  }
}));

function Overview({
  className,
  overview,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid
          className={classes.item}
          item
          md={4}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Total Liquidity
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              $
              {overview.liquidity && new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(overview.liquidity)}
            </Typography>
            {overview.liquidityEvolution >= 0
            && (
              <Label
                className={classes.label}
                color="success"
              >
                +
                {overview.liquidityEvolution && overview.liquidityEvolution.toFixed(2)}
                %
              </Label>
            )}
            {overview.liquidityEvolution < 0
            && (
              <Label
                className={classes.label}
                color="error"
              >
                {overview.liquidityEvolution && overview.liquidityEvolution.toFixed(2)}
                %
              </Label>
            )}
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={4}
          xs={12}
        >
          <HtmlTooltip
            title={
              <React.Fragment>
                <b>Aggregate Volume</b>
                {' represents the real trading volume of the pDEX. This volume will only represent volume of PRV market pairs. These trades include both underlying trades of cross-pair trades, as well as solo PRV trades.'}
              </React.Fragment>
            }
            enterTouchDelay={0}
          >
            <Typography
              component="h2"
              gutterBottom
              variant="overline"
              color="textSecondary"
            >
              Aggregate Volume <HelpCircle size={14} />
            </Typography>
          </HtmlTooltip>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              $
              {overview.allTimeVolume && new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(overview.allTimeVolume)}
            </Typography>
            {overview.allTimeVolumeEvolution >= 0
            && (
              <Label
                className={classes.label}
                color="success"
              >
                +
                {overview.allTimeVolumeEvolution && overview.allTimeVolumeEvolution.toFixed(2)}
                %
              </Label>
            )}
            {overview.allTimeVolumeEvolution < 0
            && (
              <Label
                className={classes.label}
                color="error"
              >
                {overview.allTimeVolumeEvolution && overview.allTimeVolumeEvolution.toFixed(2)}
                %
              </Label>
            )}
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={4}
          xs={12}
        >
          <HtmlTooltip
            title={
              <React.Fragment>
                <b>Synthesized Volume</b>
                {' represents trading volume of cross-trade pairs. An executed cross-trade pair links two PRV pairs. For example, the cross-pair market pUSDT-pBTC will execute two trades, one each in PRV-pUSDT and PRV-pBTC. The two underlying trades are not represented in this volume graph. Instead the value of the trade is used to represent trade volume in cross-pair markets.'}
              </React.Fragment>
            }
            enterTouchDelay={0}
          >
            <Typography
              component="h2"
              gutterBottom
              variant="overline"
              color="textSecondary"
            >
              Synthesized Volume <HelpCircle size={14} />
            </Typography>
          </HtmlTooltip>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              $
              {overview.allTimeSimpleVolume && new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(overview.allTimeSimpleVolume)}
            </Typography>
            {overview.allTimeSimpleVolumeEvolution >= 0
            && (
              <Label
                className={classes.label}
                color="success"
              >
                +
                {overview.allTimeSimpleVolumeEvolution && overview.allTimeSimpleVolumeEvolution.toFixed(2)}
                %
              </Label>
            )}
            {overview.allTimeSimpleVolumeEvolution < 0
            && (
              <Label
                className={classes.label}
                color="error"
              >
                {overview.allTimeSimpleVolumeEvolution && overview.allTimeSimpleVolumeEvolution.toFixed(2)}
                %
              </Label>
            )}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}

Overview.propTypes = {
  className: PropTypes.string,
  overview: PropTypes.object
};

export default Overview;
