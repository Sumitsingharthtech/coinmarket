import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import CryptoIcon from '../../../components/CryptoIcon';

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

const base = (pair) => pair.split('-')[0];

const quote = (pair) => pair.split('-')[1];

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
          sm={4}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Total votes
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {overview.votesCount}
            </Typography>
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          sm={4}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Most voted coin
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              <CryptoIcon currency={overview.topCoin.info} customVerifiedByName />
              {' '}
              {overview.topCoin.info}
            </Typography>
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          sm={4}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Most voted pairs
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              <CryptoIcon currency={base(overview.topPair.info)} customVerifiedByName />
              {' '}
              {overview.topPair.info}
              {' '}
              <CryptoIcon currency={quote(overview.topPair.info)} customVerifiedByName />
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
