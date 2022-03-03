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
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Total Amount
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              $
              {overview.totalAmount && new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(overview.totalAmount)}
            </Typography>
            { overview.totalAmountEvolution >= 0
            && (
            <Label
              className={classes.label}
              color="success"
            >
              +
              {overview.totalAmountEvolution && overview.totalAmountEvolution.toFixed(2)}
              %
            </Label>
            )}
            { overview.totalAmountEvolution < 0
            && (
            <Label
              className={classes.label}
              color="error"
            >
              {overview.totalAmountEvolution && overview.totalAmountEvolution.toFixed(2)}
              %
            </Label>
            )}
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Current Amount
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              $
              {overview.currentAmount && new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(overview.currentAmount)}
            </Typography>
            { overview.currentAmountEvolution >= 0
              && (
              <Label
                className={classes.label}
                color="success"
              >
                +
                {overview.currentAmountEvolution && overview.currentAmountEvolution.toFixed(2)}
                %
              </Label>
              )}
            { overview.currentAmountEvolution < 0
            && (
            <Label
              className={classes.label}
              color="error"
            >
              {overview.currentAmountEvolution && overview.currentAmountEvolution.toFixed(2)}
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
