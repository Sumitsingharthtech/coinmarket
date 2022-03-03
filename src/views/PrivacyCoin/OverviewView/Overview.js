import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import Label from 'src/components/Label';

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

function Overview({ className, overview, ...rest }) {
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
          md={3}
          sm={12}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Max Supply
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(100000000)}
            </Typography>
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={12}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Circulating Supply
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {overview.totalSupply && new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(overview.totalSupply)}
            </Typography>
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={12}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Market Cap
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              $
              {overview.marketCap && new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(overview.marketCap)}
            </Typography>
            { overview.marketCapEvolution >= 0
              && (
              <Label
                className={classes.label}
                color="success"
              >
                +
                {overview.marketCapEvolution.toFixed(2)}
                %
              </Label>
              )}
            { overview.marketCapEvolution < 0
            && (
            <Label
              className={classes.label}
              color="error"
            >
              {overview.marketCapEvolution.toFixed(2)}
              %
            </Label>
            )}
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={12}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Current Price
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              $
              {overview.lastPRVPrice && new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(overview.lastPRVPrice)}
            </Typography>
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
